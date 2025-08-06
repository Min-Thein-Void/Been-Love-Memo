import { useEffect, useState } from 'react';

function calculateLoveDuration(startDate) {
  const now = new Date();
  const start = new Date(startDate);
  const diff = now - start;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  return {
    years: Math.floor(days / 365),
    months: Math.floor((days % 365) / 30),
    days: days % 30,
    hours: hours % 24,
    minutes: minutes % 60,
    seconds: seconds % 60,
  };
}

export default function LoveCounter({ startDate }) {
  const [duration, setDuration] = useState(calculateLoveDuration(startDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setDuration(calculateLoveDuration(startDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <div className="flex flex-col items-center justify-center px-4 py-12">
      {/* Title */}
      <div className="relative flex flex-col items-center justify-center text-center px-6 mb-10">

        {/* Glass effect hero box */}
        <div className="z-10 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-10 max-w-xl shadow-lg animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold text-pink-600 mb-4">In Love Since</h2>
          <p className="text-base sm:text-lg text-white/80">
            Let the love story continue with every passing second. Start counting the moments.
          </p>
        </div>
      </div>


      {/* Timer Display */}
      <div className="flex flex-wrap justify-center gap-2 animate-flow-horizontal -mb-25">
        {[
          { label: 'y', value: duration.years },
          { label: 'm', value: duration.months },
          { label: 'd', value: duration.days },
          { label: 'h', value: duration.hours },
          { label: 'm', value: duration.minutes },
          { label: 's', value: duration.seconds },
        ].map((item, i) => (
          <span
            key={i}
            className="px-4 py-2 rounded-xl bg-white/30 backdrop-blur-md text-pink-700 font-semibold shadow-inner shadow-pink-100 border border-white/40"
          >
            {item.value}
            <span className="font-normal ml-1">{item.label}</span>
          </span>
        ))}
      </div>


      {/* Bottom Wave */}
      <div className="w-full mt-0 h-12 overflow-hidden pointer-events-none">
        <svg className="w-full h-full animate-wave-left-right" viewBox="0 0 400 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 32C50 64 150 0 200 32C250 64 350 0 400 32V64H0V32Z"
            fill="url(#waveGradient)"
            opacity="0.7"
          />
          <defs>
          </defs>
        </svg>
      </div>
    </div>
  );
}
