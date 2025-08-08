import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import LearnMore from "./Components/LearnMore";
import Nav from "./Components/Nav";
import Footer from "./Components/Footer";
import Loginout from "./Components/Loginout";
import SignUp from "./Components/SignUp";
import History from "./Components/History";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/LearnMore" element={<LearnMore />} />
        <Route path="/Loginout" element={<Loginout />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Loginout />} />
        <Route path="/history" element={<History />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
