// const LoverImageCard = ({ image, onChange, label, accentColor, placeholder, emoji }) => {
//   return (
//     <div className="flex flex-col items-center">
//       <div
//         className="relative flex items-center justify-center rounded-2xl shadow-xl bg-white/20 backdrop-blur-lg border border-white/30 transition-transform duration-300 hover:scale-105"
//         style={{
//           width: '160px',
//           height: '150px',
//           filter: `drop-shadow(0 6px 20px ${accentColor}33)`,
//         }}
//       >
//         {/* Heart SVG Background */}
//         <svg
//           viewBox="0 0 120 110"
//           width="160"
//           height="150"
//           className="absolute"
//           style={{ zIndex: 1 }}
//         >
//           <defs>
//             <linearGradient id={`heartGradient-${label}`} x1="0" y1="0" x2="0" y2="1">
//               <stop offset="0%" stopColor="#fff7" />
//               <stop offset="100%" stopColor="#fff2" />
//             </linearGradient>
//             <filter id={`glass-${label}`} x="-20%" y="-20%" width="140%" height="140%">
//               <feGaussianBlur stdDeviation="5" result="blur" />
//               <feColorMatrix
//                 in="blur"
//                 type="matrix"
//                 values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 13 -9"
//                 result="goo"
//               />
//               <feBlend in="SourceGraphic" in2="goo" />
//             </filter>
//           </defs>
//           <path
//             d="M60 100 Q10 60 25 35 Q40 10 60 30 Q80 10 95 35 Q110 60 60 100 Z"
//             fill={`url(#heartGradient-${label})`}
//             filter={`url(#glass-${label})`}
//             stroke={accentColor}
//             strokeWidth="2"
//             opacity="0.85"
//           />
//         </svg>

//         {/* Image or Placeholder */}
//         <div
//           className="absolute overflow-hidden rounded-full border-4 border-white/50 shadow-lg"
//           style={{
//             width: '85px',
//             height: '85px',
//             top: '32px',
//             left: '34px',
//             zIndex: 2,
//             background: 'rgba(255,255,255,0.3)',
//             backdropFilter: 'blur(3px)',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}
//         >
//           {image ? (
//             <img
//               src={image}
//               alt={placeholder}
//               className="object-cover w-full h-full"
//               style={{ borderRadius: '50%' }}
//             />
//           ) : (
//             <span className="text-2xl text-gray-700">{emoji}</span>
//           )}
//         </div>
//       </div>

//       {/* Upload Label with z-index */}
//       <label
//         className="cursor-pointer bg-pink-500 hover:bg-pink-600 text-white px-3 py-1.5 rounded text-sm shadow mt-3 relative z-10"
//         style={{ backgroundColor: accentColor }}
//       >
//         {label}
//         <input type="file" accept="image/*" onChange={onChange} className="hidden" />
//       </label>
//     </div>
//   );
// };

// export default LoverImageCard;
