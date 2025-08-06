import { useState, useEffect, useRef } from 'react';
import LoveCounter from './components/LoveCounter';
import Confetti from 'react-confetti';
import { useSearchParams } from 'react-router-dom';

// Add your music list here
const MUSIC_LIST = [
  { name: "Love Song", file: "/love.mp3" },
  { name: "Romantic Piano", file: "/romantic-piano.mp3" },
  { name: "Sweet Memories", file: "/sweet-memories.mp3" },
];

// Reusable LoverImageCard component
function LoverImageCard({ image, onChange, label, accentColor, placeholder, emoji }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative flex items-center justify-center"
        style={{
          width: 180,
          height: 180,
        }}
      >
        {/* Circular image */}
        <div
          className="absolute overflow-hidden rounded-full bg-white/70 flex items-center justify-center shadow-xl"
          style={{
            width: 200,
            height: 200,
            top: 30,
            left: 30,
            zIndex: 2,
            border: `4px solid ${accentColor}33`,
            backdropFilter: 'blur(2px)',
          }}
        >
          {image ? (
            <img
              src={image}
              alt={label}
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-lg font-semibold" style={{ color: accentColor }}>
              {placeholder}
            </span>
          )}
        </div>
      </div>
      <label
        className="cursor-pointer mt-3 px-4 py-1.5 rounded-full text-sm font-semibold shadow transition"
        style={{
          background: accentColor,
          color: '#fff',
        }}
      >
        {label}
        <input type="file" accept="image/*" onChange={onChange} className="hidden" />
      </label>
    </div>
  );
}

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
  const [musicList] = useState(MUSIC_LIST);
  const [selectedMusic, setSelectedMusic] = useState(musicList[0].file);
  const [showMusicPicker, setShowMusicPicker] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const audioRef = useRef(null);

  // Animation state
  const [animationType, setAnimationType] = useState('confetti'); // 'confetti', 'hearts', 'bubbles'

  // Moveable animation switcher state
  const [switcherPos, setSwitcherPos] = useState(() => {
    if (window.innerWidth < 640) {
      return { x: window.innerWidth / 2 - 120, y: window.innerHeight - 120 };
    }
    return { x: window.innerWidth - 220, y: 32 };
  });
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showSwitcher, setShowSwitcher] = useState(true);
  const switcherRef = useRef(null);

  // Keep switcher in viewport on resize
  useEffect(() => {
    const handleResize = () => {
      setSwitcherPos(pos => {
        let x = pos.x;
        let y = pos.y;
        const minX = 0, minY = 0;
        const maxX = window.innerWidth - 200;
        const maxY = window.innerHeight - 100;
        if (x < minX) x = minX;
        if (y < minY) y = minY;
        if (x > maxX) x = maxX;
        if (y > maxY) y = maxY;
        return { x, y };
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Drag handlers
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (dragging) {
        let x = e.touches ? e.touches[0].clientX - dragOffset.x : e.clientX - dragOffset.x;
        let y = e.touches ? e.touches[0].clientY - dragOffset.y : e.clientY - dragOffset.y;
        const minX = 0, minY = 0;
        const maxX = window.innerWidth - 200;
        const maxY = window.innerHeight - 100;
        if (x < minX) x = minX;
        if (y < minY) y = minY;
        if (x > maxX) x = maxX;
        if (y > maxY) y = maxY;
        setSwitcherPos({ x, y });
      }
    };
    const handleMouseUp = () => setDragging(false);

    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleMouseMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [dragging, dragOffset]);

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

  // Update music when selectedMusic changes
  useEffect(() => {
    if (playMusic && selectedMusic) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const audio = new Audio(selectedMusic);
      audio.loop = true;
      audio.play();
      audioRef.current = audio;
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
    // eslint-disable-next-line
  }, [playMusic, selectedMusic]);

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
    setShowEditModal(false);
    setTempName1('');
    setTempName2('');
  };

  // --- Animation Components ---
  const HeartsAnimation = () => (
    <div className="pointer-events-none fixed inset-0 z-[100]">
      {[...Array(20)].map((_, i) => (
        <span
          key={i}
          className="absolute text-3xl select-none animate-heart-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            color: '#ec4899',
            opacity: 0.7 + Math.random() * 0.3,
            pointerEvents: 'none',
          }}
        >💖</span>
      ))}
      <style>
        {`
          @keyframes heart-float {
            0% { transform: translateY(0) scale(1);}
            50% { transform: translateY(-40px) scale(1.2);}
            100% { transform: translateY(-80px) scale(1);}
          }
          .animate-heart-float {
            animation: heart-float 3s linear infinite;
          }
        `}
      </style>
    </div>
  );

  const SnowAnimation = () => (
    <div className="pointer-events-none fixed inset-0 z-[100]">
      {[...Array(30)].map((_, i) => (
        <span
          key={i}
          className="absolute select-none animate-snow-fall"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-${Math.random() * 40}px`,
            fontSize: `${16 + Math.random() * 18}px`,
            opacity: 0.6 + Math.random() * 0.4,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3.5 + Math.random() * 2.5}s`,
            pointerEvents: 'none',
          }}
        >❄️</span>
      ))}
      <style>
        {`
          @keyframes snow-fall {
            0% { transform: translateY(0) rotate(0deg);}
            100% { transform: translateY(110vh) rotate(360deg);}
          }
          .animate-snow-fall {
            animation: snow-fall linear infinite;
          }
        `}
      </style>
    </div>
  );
  // --- End Animation Components ---

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-400 via-pink-100 to-pink-300 p-2 sm:p-4 relative overflow-hidden">
      {/* Edit Modal */}
      {showEditModal && (
        <div
          className="fixed inset-0 z-[201] flex items-center justify-center bg-black/30"
          onClick={() => setShowEditModal(false)}
        >
          <div
            className="relative bg-white/70 backdrop-blur-2xl rounded-2xl shadow-2xl p-6 w-80 max-w-full flex flex-col items-center"
            style={{
              boxShadow: "0 8px 32px 0 rgba(236,72,153,0.20)",
              background: "rgba(255,255,255,0.75)",
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-3 text-pink-400 hover:text-pink-600 text-2xl font-bold"
              onClick={() => setShowEditModal(false)}
              aria-label="Close"
            >×</button>
            <h2 className="text-xl font-bold text-pink-700 mb-4">✏️ Edit Info</h2>
            <form
              onSubmit={handleFormSubmit}
              className="flex flex-col gap-3 w-full"
            >
              <input
                type="text"
                placeholder="Your Name"
                value={tempName1}
                onChange={(e) => setTempName1(e.target.value)}
                className="p-2 rounded-lg border border-pink-200 bg-white/80 placeholder-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
              <input
                type="text"
                placeholder="Lover's Name"
                value={tempName2}
                onChange={(e) => setTempName2(e.target.value)}
                className="p-2 rounded-lg border border-pink-200 bg-white/80 placeholder-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="p-2 rounded-lg border border-pink-200 bg-white/80 w-full focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
              <button type="submit" className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg shadow transition">
                ✅ Save
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Music Picker Modal */}
      {showMusicPicker && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/30"
          onClick={() => setShowMusicPicker(false)}
        >
          <div
            className="relative bg-white/70 backdrop-blur-2xl rounded-2xl shadow-2xl p-6 w-80 max-w-full flex flex-col items-center"
            style={{
              boxShadow: "0 8px 32px 0 rgba(236,72,153,0.20)",
              background: "rgba(255,255,255,0.75)",
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-3 text-pink-400 hover:text-pink-600 text-2xl font-bold"
              onClick={() => setShowMusicPicker(false)}
              aria-label="Close"
            >×</button>
            <h2 className="text-xl font-bold text-pink-700 mb-4">🎵 Choose Your Music</h2>
            <ul className="w-full flex flex-col gap-2">
              {musicList.map((music, idx) => (
                <li key={music.file}>
                  <button
                    className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition font-semibold border ${selectedMusic === music.file
                      ? "bg-pink-500 text-white border-pink-600 shadow"
                      : "bg-white/80 text-pink-700 border-pink-200 hover:bg-pink-100"
                      }`}
                    onClick={() => {
                      setSelectedMusic(music.file);
                      setPlayMusic(true);
                      setShowMusicPicker(false);
                    }}
                  >
                    <span className="text-lg">{selectedMusic === music.file ? "🎶" : "🎵"}</span>
                    {music.name}
                    {selectedMusic === music.file && (
                      <span className="ml-auto text-xs bg-white/40 px-2 py-0.5 rounded text-pink-600">Playing</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Toggle Button for Animation Switcher */}
      {!showSwitcher && (
        <button
          className="fixed z-[102] bottom-6 right-6 bg-pink-500 text-white rounded-full shadow-lg p-3 flex items-center justify-center focus:outline-none"
          style={{ width: 52, height: 52 }}
          onClick={() => setShowSwitcher(true)}
        >
          <span className="text-2xl">🎉</span>
        </button>
      )}

      {/* Moveable Animation Switcher */}
      {showSwitcher && (
        <div
          ref={switcherRef}
          className="z-[101] flex flex-col gap-2 items-end fixed"
          style={{
            left: switcherPos.x,
            top: switcherPos.y,
            minWidth: 180,
            maxWidth: 260,
            userSelect: 'none',
            cursor: dragging ? 'grabbing' : 'grab',
            transition: dragging ? 'none' : 'left 0.2s, top 0.2s',
          }}
          onMouseDown={e => {
            if (e.target === switcherRef.current) {
              setDragging(true);
              setDragOffset({
                x: e.clientX - switcherPos.x,
                y: e.clientY - switcherPos.y,
              });
            }
          }}
          onTouchStart={e => {
            if (e.target === switcherRef.current) {
              setDragging(true);
              setDragOffset({
                x: e.touches[0].clientX - switcherPos.x,
                y: e.touches[0].clientY - switcherPos.y,
              });
            }
          }}
        >
          <div
            className="bg-white/90 backdrop-blur-lg rounded-xl shadow px-3 py-2 flex flex-col gap-2 border border-pink-200 relative"
            style={{ cursor: 'inherit', userSelect: 'none', touchAction: 'none' }}
            onMouseDown={e => {
              if (e.target === e.currentTarget) {
                setDragging(true);
                setDragOffset({
                  x: e.clientX - switcherPos.x,
                  y: e.clientY - switcherPos.y,
                });
              }
            }}
            onTouchStart={e => {
              if (e.target === e.currentTarget) {
                setDragging(true);
                setDragOffset({
                  x: e.touches[0].clientX - switcherPos.x,
                  y: e.touches[0].clientY - switcherPos.y,
                });
              }
            }}
          >
            {/* Hide Button */}
            <button
              className="absolute top-1 right-1 text-pink-400 hover:text-pink-600 text-lg font-bold px-1 py-0.5 rounded transition"
              style={{ lineHeight: 1 }}
              onClick={e => {
                e.stopPropagation();
                setShowSwitcher(false);
              }}
              aria-label="Hide Animation Switcher"
              tabIndex={0}
            >
              ×
            </button>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-pink-500 text-lg font-bold">🎉</span>
              <span className="text-pink-700 font-semibold text-base">Animation</span>
            </div>
            <label className="flex items-center gap-2 text-pink-700 font-medium select-none">
              <input
                type="checkbox"
                checked={showConfetti}
                onChange={() => setShowConfetti(!showConfetti)}
                className="accent-pink-500"
                onMouseDown={e => e.stopPropagation()}
                onTouchStart={e => e.stopPropagation()}
              />
              Show Animation
            </label>
            <div className="flex gap-2 mt-1">
              <button
                className={`px-2 py-1 rounded-lg text-sm font-semibold transition border ${animationType === 'confetti'
                  ? 'bg-pink-500 text-white border-pink-600 shadow'
                  : 'bg-white/80 text-pink-700 border-pink-200 hover:bg-pink-100'
                  }`}
                onClick={() => setAnimationType('confetti')}
                disabled={!showConfetti}
                onMouseDown={e => e.stopPropagation()}
                onTouchStart={e => e.stopPropagation()}
              >
                Confetti
              </button>
              <button
                className={`px-2 py-1 rounded-lg text-sm font-semibold transition border ${animationType === 'hearts'
                  ? 'bg-pink-500 text-white border-pink-600 shadow'
                  : 'bg-white/80 text-pink-700 border-pink-200 hover:bg-pink-100'
                  }`}
                onClick={() => setAnimationType('hearts')}
                disabled={!showConfetti}
                onMouseDown={e => e.stopPropagation()}
                onTouchStart={e => e.stopPropagation()}
              >
                Hearts
              </button>
              <button
                className={`px-2 py-1 rounded-lg text-sm font-semibold transition border ${animationType === 'bubbles'
                  ? 'bg-pink-500 text-white border-pink-600 shadow'
                  : 'bg-white/80 text-pink-700 border-pink-200 hover:bg-pink-100'
                  }`}
                onClick={() => setAnimationType('bubbles')}
                disabled={!showConfetti}
                onMouseDown={e => e.stopPropagation()}
                onTouchStart={e => e.stopPropagation()}
              >
                Snow
              </button>
            </div>
            <div className="text-xs text-pink-400 mt-1">Drag this box anywhere</div>
          </div>
        </div>
      )}

      {/* Animation Render */}
      {showConfetti && animationType === 'confetti' && (
        <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={200} />
      )}
      {showConfetti && animationType === 'hearts' && <HeartsAnimation />}
      {showConfetti && animationType === 'bubbles' && <SnowAnimation />}


      {/* Main Content */}
      <div className="w-full max-w-lg sm:max-w-2xl lg:max-w-4xl mx-auto rounded-3xl shadow-2xl bg-pink-600/30 backdrop-blur-2xl p-3 sm:p-6 md:p-10 flex flex-col mt-20 items-center transition-all duration-300">
        {/* Responsive Lover Images Row */}
        <div className="flex flex-row items-center justify-center gap-8 mb-6 mt-6">
          {/* Lover 1 */}
          <div className="relative flex flex-col items-center">
            <div
              className="relative flex items-center justify-center"
              style={{
                width: 150,
                height: 150,
              }}
            >
              {/* Liquid Glass Effect */}
              <div
                className="absolute w-[150px] h-[150px] rounded-full shadow-2xl border-2 border-pink-200/60 bg-white/30 backdrop-blur-[8px] z-10"
                style={{
                  boxShadow: "0 8px 32px 0 rgba(236,72,153,0.18), 0 1.5px 8px 0 rgba(255,255,255,0.25) inset",
                  border: "2.5px solid rgba(236,72,153,0.18)",
                  background: "linear-gradient(135deg,rgba(255,255,255,0.45) 60%,rgba(236,72,153,0.10) 100%)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}
              >
                <svg className="absolute left-0 top-0 w-full h-full pointer-events-none" viewBox="0 0 120 120">
                  <defs>
                    <radialGradient id="bubble1" cx="60" cy="60" r="60" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#fff" stopOpacity="0.7" />
                      <stop offset="80%" stopColor="#ec4899" stopOpacity="0.08" />
                      <stop offset="100%" stopColor="#fff" stopOpacity="0.01" />
                    </radialGradient>
                  </defs>
                  <circle cx="60" cy="60" r="60" fill="url(#bubble1)" />
                </svg>
              </div>
              <div className="absolute w-[120px] h-[120px] rounded-full z-20 flex items-center justify-center overflow-hidden">
                {image1 ? (
                  <img
                    src={image1}
                    alt="Lover 1"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="text-pink-400 text-base font-semibold">Your Photo</span>
                )}
              </div>
              {/* Decorative bubbles */}
              <span className="absolute -top-3 -left-3 w-6 h-6 bg-pink-200/60 rounded-full blur-[2px] opacity-70 z-30"></span>
              <span className="absolute -bottom-2 -right-2 w-4 h-4 bg-pink-300/50 rounded-full blur-[1.5px] opacity-60 z-30"></span>
              <span className="absolute top-2 right-4 w-2 h-2 bg-white/70 rounded-full blur-[1px] opacity-80 z-30"></span>
            </div>
            {image1 ? (
              <label className="cursor-pointer mt-3 py-1 px-1 rounded-xl bg-white/30 backdrop-blur-md text-pink-700 font-semibold shadow-inner shadow-pink-100 border border-white/40">
                Change Photo
                <input type="file" accept="image/*" onChange={handleImage1Change} className="hidden" />
              </label>
            ) : (
              <label className="cursor-pointer mt-3 py-1 px-1 rounded-xl bg-white/30 backdrop-blur-md text-pink-700 font-semibold shadow-inner shadow-pink-100 border border-white/40">
                Upload Yours
                <input type="file" accept="image/*" onChange={handleImage1Change} className="hidden" />
              </label>
            )}
          </div>

          {/* ❤️ Heart */}
          <div className="text-4xl hover:scale-125 active:animate-ping transition duration-300 select-none drop-shadow-lg mx-2">
            <svg
              className="absolute left-1/2 top-1/2 animate-heart-move"
              style={{
                transform: 'translate(-50%, -50%)',
                width: '60px',
                height: '60px',
                zIndex: 2,
              }}
              viewBox="0 0 60 60"
            >
              <g>
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0,0; 0,8; 0,0"
                  keyTimes="0;0.5;1"
                  dur="2s"
                  repeatCount="indefinite"
                />
                <path
                  d="M30 52s-16-10.7-16-22.7C14 18.7 22.7 14 30 22.7 37.3 14 46 18.7 46 29.3 46 41.3 30 52 30 52z"
                  fill="#fb7185"
                  stroke="#f43f5e"
                  strokeWidth="2"
                  style={{ filter: 'drop-shadow(0 2px 8px #fb718588)' }}
                />
              </g>
            </svg>
          </div>

          {/* Lover 2 */}
          <div className="relative flex flex-col items-center">
            <div
              className="relative flex items-center justify-center"
              style={{
                width: 150,
                height: 150,
              }}
            >
              {/* Liquid Glass Effect */}
              <div
                className="absolute w-[150px] h-[150px] rounded-full shadow-2xl border-2 border-red-200/60 bg-white/30 backdrop-blur-[8px] z-10"
                style={{
                  boxShadow: "0 8px 32px 0 rgba(239,68,68,0.15), 0 1.5px 8px 0 rgba(255,255,255,0.22) inset",
                  border: "2.5px solid rgba(239,68,68,0.15)",
                  background: "linear-gradient(135deg,rgba(255,255,255,0.45) 60%,rgba(239,68,68,0.10) 100%)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}
              >
                <svg className="absolute left-0 top-0 w-full h-full pointer-events-none" viewBox="0 0 120 120">
                  <defs>
                    <radialGradient id="bubble2" cx="60" cy="60" r="60" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#fff" stopOpacity="0.7" />
                      <stop offset="80%" stopColor="#ef4444" stopOpacity="0.08" />
                      <stop offset="100%" stopColor="#fff" stopOpacity="0.01" />
                    </radialGradient>
                  </defs>
                  <circle cx="60" cy="60" r="60" fill="url(#bubble2)" />
                </svg>
              </div>
              <div className="absolute w-[120px] h-[120px] rounded-full z-20 flex items-center justify-center overflow-hidden">
                {image2 ? (
                  <img
                    src={image2}
                    alt="Lover 2"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="text-red-400 text-base font-semibold">Partner</span>
                )}
              </div>
              {/* Decorative bubbles */}
              <span className="absolute -top-2 -right-3 w-5 h-5 bg-red-200/60 rounded-full blur-[2px] opacity-70 z-30"></span>
              <span className="absolute -bottom-3 -left-2 w-3 h-3 bg-red-300/50 rounded-full blur-[1.5px] opacity-60 z-30"></span>
              <span className="absolute bottom-3 left-8 w-2 h-2 bg-white/70 rounded-full blur-[1px] opacity-80 z-30"></span>
            </div>
            {image2 ? (
              <label className="cursor-pointer mt-3 py-1 px-1 rounded-xl bg-white/30 backdrop-blur-md text-pink-700 font-semibold shadow-inner shadow-pink-100 border border-white/40">
                Change Photo
                <input type="file" accept="image/*" onChange={handleImage2Change} className="hidden" />
              </label>
            ) : (
              <label className="cursor-pointer mt-3 py-1 px-1 rounded-xl bg-white/30 backdrop-blur-md text-pink-700 font-semibold shadow-inner shadow-pink-100 border border-white/40">
                Upload Partner
                <input type="file" accept="image/*" onChange={handleImage2Change} className="hidden" />
              </label>
            )}
          </div>
        </div>
        {/* Names Display */}
        {loverName1 && loverName2 && (
          <div className="relative flex items-center justify-center mb-8 sm:mb-14 w-full">
            <span
              className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-pink-600 px-6 sm:px-10 py-4 sm:py-5 rounded-full shadow-xl animate-float border border-white/20 backdrop-blur-lg bg-white/10"
              style={{
                boxShadow: "0 8px 32px rgba(236, 72, 153, 0.35)",
                animation: "floatName 4s ease-in-out infinite",
                letterSpacing: "0.03em",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            >
              {loverName1} <span className="mx-3 text-rose-500 text-2xl sm:text-3xl animate-pulse">💞</span>

              {loverName2}
            </span>

            <style>
              {`
        @keyframes floatName {
          0% { transform: translateY(0px);}
          50% { transform: translateY(-10px);}
          100% { transform: translateY(0px);}
        }
        .animate-float {
          animation: floatName 4s ease-in-out infinite;
        }
      `}
            </style>
          </div>
        )}


        {/* Timer */}
        <div className="w-full flex justify-center mb-6 -mt-12">
          <div className="">
            <LoveCounter startDate={startDate} />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-4 sm:mt-8 justify-center w-full">
          <button
            onClick={() => {
              setShowEditModal(true);
              setTempName1(loverName1);
              setTempName2(loverName2);
              setEditMode(true);
            }}
            className="px-5 py-2 rounded-full font-semibold border shadow-lg transition w-full sm:w-auto"
            style={{
              order: -1,
              background: "linear-gradient(135deg,rgba(255,255,255,0.55) 60%,rgba(236,72,153,0.10) 100%)",
              color: "#d9468f",
              borderColor: "#fbcfe8",
              boxShadow: "0 4px 24px 0 rgba(236,72,153,0.10), 0 1.5px 8px 0 rgba(255,255,255,0.25) inset",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          >
            ✏️
          </button>
          <button
            onClick={() => setShowMusicPicker(true)}
            className="px-5 py-2 rounded-full font-semibold border shadow-lg transition w-full sm:w-auto"
            style={{
              background: "linear-gradient(135deg,rgba(255,255,255,0.55) 60%,rgba(236,72,153,0.13) 100%)",
              color: "#be185d",
              borderColor: "#fbcfe8",
              boxShadow: "0 4px 24px 0 rgba(236,72,153,0.10), 0 1.5px 8px 0 rgba(255,255,255,0.25) inset",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          >
            {playMusic ? "🔇 Stop Music" : "🎵 Play Music"}
          </button>
          {playMusic && (
            <button
              onClick={() => setPlayMusic(false)}
              className="px-5 py-2 rounded-full font-semibold border shadow-lg transition w-full sm:w-auto"
              style={{
                background: "linear-gradient(135deg,rgba(255,255,255,0.55) 60%,rgba(236,72,153,0.16) 100%)",
                color: "#a21caf",
                borderColor: "#fbcfe8",
                boxShadow: "0 4px 24px 0 rgba(236,72,153,0.10), 0 1.5px 8px 0 rgba(255,255,255,0.25) inset",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
              }}
            >
              ⏹ Stop
            </button>
          )}
          <button
            onClick={copyShareLink}
            className="px-5 py-2 rounded-full font-semibold border shadow-lg transition w-full sm:w-auto"
            style={{
              background: "linear-gradient(135deg,rgba(255,255,255,0.55) 60%,rgba(236,72,153,0.13) 100%)",
              color: "#fff",
              borderColor: "#fbcfe8",
              boxShadow: "0 4px 24px 0 rgba(236,72,153,0.13), 0 1.5px 8px 0 rgba(255,255,255,0.25) inset",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              textShadow: "0 1px 8px #ec4899, 0 1px 1px #fff"
            }}
          >
            📤 Share This Love
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
