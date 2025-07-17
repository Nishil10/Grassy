import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-black/80 text-gray-400 py-4 px-4 text-center">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} <span className="text-green-400 font-semibold">Grassy</span>. All rights reserved.
      </p>
      <p className="text-xs mt-1">Built by Nishil</p>
    </footer>
  );
}
