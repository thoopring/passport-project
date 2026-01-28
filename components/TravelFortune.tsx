'use client';

import { useState } from 'react';

const FORTUNES = [
  { text: "Unexpected romance awaits in a tropical city.", luckyColor: "Sunset Orange", dest: "Bali, Indonesia" },
  { text: "A lost item will lead you to a new friendship.", luckyColor: "Deep Blue", dest: "Lisbon, Portugal" },
  { text: "Your patience will be tested, but the view will be worth it.", luckyColor: "Forest Green", dest: "Machu Picchu, Peru" },
  { text: "Great fortune comes from trying a strange street food today.", luckyColor: "Spicy Red", dest: "Bangkok, Thailand" },
  { text: "Avoid making strict plans. Serendipity is your guide.", luckyColor: "Cloud White", dest: "Tokyo, Japan" },
];

export default function TravelFortune() {
  const [fortune, setFortune] = useState<typeof FORTUNES[0] | null>(null);
  const [loading, setLoading] = useState(false);

  const drawFortune = () => {
    setLoading(true);
    setTimeout(() => {
      const random = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
      setFortune(random);
      setLoading(false);
    }, 1000); // 1초 동안 두근두근 연출
  };

  return (
    <div className="w-full max-w-md mx-auto my-12 p-6 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-xl text-white text-center transform hover:scale-105 transition-all duration-300">
      <h3 className="text-2xl font-bold mb-4 font-serif">✨ Daily Travel Oracle</h3>
      <p className="mb-6 opacity-90">Where is the universe guiding you today?</p>

      {!fortune && !loading && (
        <button 
          onClick={drawFortune}
          className="bg-white text-purple-600 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-yellow-300 hover:text-purple-800 transition-colors animate-bounce"
        >
          🔮 Reveal My Destiny
        </button>
      )}

      {loading && (
        <div className="flex justify-center items-center h-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-white"></div>
        </div>
      )}

      {fortune && !loading && (
        <div className="animate-fade-in-up bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
          <p className="text-xl font-medium mb-3">"{fortune.text}"</p>
          <div className="flex justify-center gap-4 text-sm mt-4">
            <span className="bg-white/20 px-3 py-1 rounded-full">🎨 {fortune.luckyColor}</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">✈️ {fortune.dest}</span>
          </div>
          <button 
            onClick={() => setFortune(null)}
            className="mt-6 text-sm underline opacity-70 hover:opacity-100"
          >
            Draw again
          </button>
        </div>
      )}
    </div>
  );
}