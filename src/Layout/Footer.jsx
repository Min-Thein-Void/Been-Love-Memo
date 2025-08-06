import React from 'react';

function Footer() {
  return (
    <footer className="w-full bg-white/10 backdrop-blur-lg border-t border-white/20 shadow-inner py-6 flex items-center justify-center rounded-t-2xl relative z-10">
      <span className="text-pink-700 text-sm sm:text-base font-semibold tracking-wide text-center drop-shadow-sm">
        © {new Date().getFullYear()} Been Love Memory. Developed with 💖 by Min Thein.
      </span>
    </footer>
  );
}

export default Footer;
