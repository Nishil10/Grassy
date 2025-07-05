import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GoogleAuth } from './AuthButton';

export default function Navbar() {
  const location = useLocation();

  return (
<nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md shadow-md px-4 py-5 flex justify-between items-center">
<h1 className="text-2xl font-extrabold text-green-400 drop-shadow-md">🌱 Grassy</h1>

      <div className="flex gap-10 text-white font-medium text-lg">
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

        <GoogleAuth />
      </div>
    </nav>
  );
}
