import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  return (
<nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md shadow-md px-4 py-3 flex justify-between items-center">
      <Link to="/" className="text-2xl font-extrabold text-green-400 drop-shadow-md">🌱 Grassy</Link>

      <div className="flex gap-10 text-white font-small text-lg items-center">
        <Link
          to="/"
          className={`hover:text-green-400 transition ${
            location.pathname === '/' ? 'text-green-400' : ''
          }`}
        >
          Home
        </Link>
        <Link
          to="/turfs"
          className={`hover:text-green-400 transition ${
            location.pathname === '/turfs' ? 'text-green-400' : ''
          }`}
        >
          Turfs
        </Link>
        <Link
          to="/about"
          className={`hover:text-green-400 transition ${
            location.pathname === '/about' ? 'text-green-400' : ''
          }`}
        >
          About
       </Link>
       <Link
          to="/login"
          className={`hover:text-green-400 transition ${
            location.pathname === '/login' ? 'text-green-400' : ''
          }`}
        >
          Sign In
       </Link>
      </div>
    </nav>
  );
}
