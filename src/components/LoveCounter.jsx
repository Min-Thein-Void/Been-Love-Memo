import { useEffect, useState } from 'react';

function calculateLoveDuration(startDate) {
  const now = new Date();
  const start = new Date(startDate);
  const diff = now - start;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours   = Math.floor(minutes / 60);
  const days    = Math.floor(hours / 24);

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
    <div className="text-center p-4">
      <h2 className="text-2xl font-bold mb-2">💖 Been in Love For 💖</h2>
      <div className="text-lg">
        {duration.years} years, {duration.months} months, {duration.days} days<br/>
        {duration.hours} hours, {duration.minutes} minutes, {duration.seconds} seconds
      </div>
    </div>
  );
}
