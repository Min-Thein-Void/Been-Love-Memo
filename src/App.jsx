import { useState, useEffect } from 'react';
import LoveCounter from './components/LoveCounter';
import Confetti from 'react-confetti';
import { useSearchParams } from 'react-router-dom';

function App() {
  const [loverName1, setLoverName1] = useState('');
  const [loverName2, setLoverName2] = useState('');
  const [tempName1, setTempName1] = useState('');
  const [tempName2, setTempName2] = useState('');
  const [startDate, setStartDate] = useState('2023-01-01');
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [playMusic, setPlayMusic] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [searchParams] = useSearchParams();

  // Load from localStorage or query params
  useEffect(() => {
    const name1 = searchParams.get("name1") || localStorage.getItem("loverName1");
    const name2 = searchParams.get("name2") || localStorage.getItem("loverName2");
    const date = searchParams.get("start") || localStorage.getItem("startDate");
    const storedImg1 = localStorage.getItem("loveImage1");
    const storedImg2 = localStorage.getItem("loveImage2");

    if (name1) setLoverName1(name1);
    if (name2) setLoverName2(name2);
    if (date) setStartDate(date);
    if (storedImg1) setImage1(storedImg1);
    if (storedImg2) setImage2(storedImg2);
  }, [searchParams]);

  useEffect(() => localStorage.setItem("loverName1", loverName1), [loverName1]);
  useEffect(() => localStorage.setItem("loverName2", loverName2), [loverName2]);
  useEffect(() => localStorage.setItem("startDate", startDate), [startDate]);

  useEffect(() => {
    let audio;
    if (playMusic) {
      audio = new Audio('/love.mp3');
      audio.loop = true;
      audio.play();
    }
    return () => { if (audio) audio.pause(); };
  }, [playMusic]);

  const handleImage1Change = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage1(reader.result);
        localStorage.setItem("loveImage1", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImage2Change = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage2(reader.result);
        localStorage.setItem("loveImage2", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const copyShareLink = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("name1", loverName1);
    url.searchParams.set("name2", loverName2);
    url.searchParams.set("start", startDate);
    navigator.clipboard.writeText(url.toString());
    alert("🔗 Link copied to clipboard!");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoverName1(tempName1);
    setLoverName2(tempName2);
    setEditMode(false);
    setTempName1('');
    setTempName2('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-pink-200 p-4">
      <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={showConfetti ? 200 : 0} />

      <h1 className="text-4xl font-bold text-pink-700 mb-6 text-center">💞 Been Love Memory 💞</h1>

      {/* 📸 Lover Images */}
      <div className="flex flex-row items-center justify-center gap-4 mb-4">
        {/* Lover 1 */}
        <div className="flex flex-col items-center">
          {image1 ? (
            <img src={image1} alt="Lover 1" className="w-28 h-28 rounded-full object-cover border-4 border-pink-300 shadow-lg mb-2" />
          ) : (
            <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center mb-2">
              <span className="text-gray-500 text-sm">Your Photo</span>
            </div>
          )}
          <label className="cursor-pointer bg-pink-500 hover:bg-pink-600 text-white px-2 py-1 rounded text-xs">
            Upload Yours
            <input type="file" accept="image/*" onChange={handleImage1Change} className="hidden" />
          </label>
        </div>

        {/* ❤️ Heart */}
        <div className="text-3xl hover:scale-125 active:animate-ping transition duration-300 select-none">
          ❤️
        </div>

        {/* Lover 2 */}
        <div className="flex flex-col items-center">
          {image2 ? (
            <img src={image2} alt="Lover 2" className="w-28 h-28 rounded-full object-cover border-4 border-red-300 shadow-lg mb-2" />
          ) : (
            <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center mb-2">
              <span className="text-gray-500 text-sm">Partner Photo</span>
            </div>
          )}
          <label className="cursor-pointer bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs">
            Upload Partner
            <input type="file" accept="image/*" onChange={handleImage2Change} className="hidden" />
          </label>
        </div>
      </div>

      {/* 📝 Form */}
      {editMode ? (
        <form
          onSubmit={handleFormSubmit}
          className="mb-4 flex flex-col sm:flex-row items-center gap-2 sm:gap-4"
        >
          <input
            type="text"
            placeholder="Your Name"
            value={tempName1}
            onChange={(e) => setTempName1(e.target.value)}
            className="p-2 rounded border w-64"
          />
          <input
            type="text"
            placeholder="Lover's Name"
            value={tempName2}
            onChange={(e) => setTempName2(e.target.value)}
            className="p-2 rounded border w-64"
          />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-2 rounded border"
          />
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded shadow">
            ✅ Save
          </button>
        </form>
      ) : (
        <button
          onClick={() => setEditMode(true)}
          className="mb-4"
        >
          ✏️ Edit
        </button>
      )}

      {/* 🥰 Names Display */}
      {loverName1 && loverName2 && (
        <div className="text-xl font-semibold mb-2 text-pink-800">
          {loverName1} ❤️ {loverName2}
        </div>
      )}

      {/* 🕰 Timer */}
      <LoveCounter startDate={startDate} />

      {/* 🔘 Buttons */}
      <div className="flex gap-3 mt-4 flex-wrap justify-center">
        <button
          onClick={() => setPlayMusic(!playMusic)}
          className="bg-yellow-400 px-4 py-2 rounded shadow"
        >
          {playMusic ? "🔇 Stop Music" : "🎵 Play Music"}
        </button>

        <button
          onClick={copyShareLink}
          className="bg-pink-500 text-white px-4 py-2 rounded shadow"
        >
          📤 Share This Love
        </button>

        <button
          onClick={() => setShowConfetti(!showConfetti)}
          className="bg-indigo-400 text-white px-4 py-2 rounded shadow"
        >
          {showConfetti ? "✨ Hide Confetti" : "🎉 Show Confetti"}
        </button>
      </div>
    </div>
  );
}

export default App;
