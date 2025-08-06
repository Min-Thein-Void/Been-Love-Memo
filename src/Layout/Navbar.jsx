import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="w-full bg-white/20 backdrop-blur-lg border-b border-white/30 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between rounded-b-3xl">
        {/* Left: Logo/Title */}
        <div className="flex items-center gap-2">
          <span className="text-2xl sm:text-3xl text-pink-500 drop-shadow-lg animate-bounce">💖</span>
          <span className="hidden sm:inline text-xl font-bold text-pink-700 tracking-wide">
            Been Love
          </span>
        </div>

        {/* Right: Nav Menu */}
        <div className="flex gap-3 sm:gap-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-4 py-1.5 rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 ${
                isActive
                  ? 'bg-pink-600 text-white shadow-lg'
                  : 'text-pink-700 hover:bg-pink-100/60 hover:text-pink-600'
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/love_detail"
            className={({ isActive }) =>
              `px-4 py-1.5 rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 ${
                isActive
                  ? 'bg-pink-600 text-white shadow-lg'
                  : 'text-pink-700 hover:bg-pink-100/60 hover:text-pink-600'
              }`
            }
          >
            Love Detail
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
