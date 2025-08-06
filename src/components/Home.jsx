import React from 'react';
import couple from '../assets/couple.webp';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-rose-200 to-pink-900 py-10 px-4 flex items-center justify-center">
      <div className="w-full max-w-7xl bg-white/10 backdrop-blur-lg border border-white/30 rounded-3xl shadow-2xl p-8 sm:p-16">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-pink-600 drop-shadow-lg mb-4 animate-fade-in">
            💓 Love Memo 💓
          </h1>
          <p className="text-lg sm:text-xl text-pink-800 font-medium leading-relaxed max-w-3xl mx-auto">
            Celebrate your love journey with a beautiful memory tracker.
            Upload your favorite photos, set your love date, and watch every second grow your story.
          </p>
        </div>

        {/* Image Auto Slider (Placeholder) */}
        <div className="w-full mb-10">
          <div className="w-full overflow-hidden rounded-2xl border border-white/30 shadow-md">
            <div className="flex animate-slide">
              <div className="min-w-full h-64 sm:h-80 bg-pink-100 overflow-hidden">
                <img
                  src={couple}
                  alt="couple"
                  className="w-full h-full object-cover"
                />
              </div>

            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="bg-white/20 backdrop-blur-lg p-6 rounded-2xl text-center shadow-md hover:scale-105 transition">
            <div className="text-5xl mb-2 animate-bounce">💘</div>
            <h3 className="text-xl font-semibold text-pink-700">Track Your Love</h3>
            <p className="text-pink-900 mt-2">
              See how long you’ve been together, down to the second!
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-lg p-6 rounded-2xl text-center shadow-md hover:scale-105 transition">
            <div className="text-5xl mb-2 animate-pulse">📸</div>
            <h3 className="text-xl font-semibold text-pink-700">Share Memories</h3>
            <p className="text-pink-900 mt-2">
              Upload photos and share your love link with friends.
            </p>
          </div>
        </div>

        {/* Call To Action */}
        <div className="mt-12 text-center text-pink-700 text-base sm:text-lg">
          Ready to begin? Click <span className="font-bold underline"><Link to="/love_detail">Love Detail</Link></span> in the menu and start your story today!
        </div>
      </div>
    </div>
  );
}

export default Home;
