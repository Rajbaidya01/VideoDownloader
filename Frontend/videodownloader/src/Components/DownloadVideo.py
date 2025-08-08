import sys
import os
import yt_dlp

DOWNLOAD_PATH = r"D:\Download_Videos"  # Change to your actual download path

# Create the download directory if it doesn't exist
if not os.path.exists(DOWNLOAD_PATH):
    os.makedirs(DOWNLOAD_PATH)

# Validate arguments
if len(sys.argv) < 5:
    print("Usage: python download_video.py <url> <format> <quality> <platform>")
    sys.exit(1)

url = sys.argv[1]
format = sys.argv[2].lower()
quality = sys.argv[3].lower()
platform = sys.argv[4].lower()

def download_video(url, platform, format, quality):
    try:
        ydl_opts = {
            'outtmpl': os.path.join(DOWNLOAD_PATH, '%(title)s.%(ext)s'),
            'user_agent': 'Mozilla/5.0',
            'quiet': False,
        }

        # Set format options based on user selection
        if format == 'audio':
            ydl_opts.update({
                'format': 'bestaudio',
                'postprocessors': [{
                    'key': 'FFmpegExtractAudio',
                    'preferredcodec': 'mp3',
                    'preferredquality': '192',
                }]
            })
        else:
            # For video format, use quality mapping
            quality_map = {
                '144p': '18/160',
                '360p': '18/134/133',
                '720p': '22/136/135',
                '1080p': '137/22/248',
                'best': 'bestvideo+bestaudio/best'
            }

            ydl_opts.update({
                'format': quality_map.get(quality, 'bestvideo+bestaudio/best'),
                'merge_output_format': 'mp4'
            })

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])

        print(f"{platform.capitalize()} {format} downloaded successfully.")

    except Exception as e:
        print(f"{platform.capitalize()} {format} download failed:", e)

# Call the function
download_video(url, platform, format, quality)
