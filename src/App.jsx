import React from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import TurfList from "./pages/TurfList";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const location = useLocation();

  return (
    <div className="bg-black min-h-screen text-white">
      {location.pathname !== "/login" && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/turfs" element={<TurfList />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
