import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function StoryPage({ onNext }) {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-amber-50 to-rose-100 flex flex-col items-center justify-center text-center p-6 relative overflow-hidden">
      {/* Dekorasi balon */}
      <div className="absolute top-10 left-8 animate-bounce-slow text-5xl">
        🎈
      </div>
      <div className="absolute top-16 right-8 animate-bounce-slow text-4xl">
        🎈
      </div>
      <div className="absolute bottom-10 right-1/4 animate-bounce-slow text-3xl">
        ⭐
      </div>

      {/* Cerita */}
      <motion.h1
        className="font-['Fredoka_One'] text-4xl md:text-5xl text-amber-600 drop-shadow mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        🌷 Kisah Ulang Tahun Chayra 🌷
      </motion.h1>

      {showText && (
        <motion.div
          className="font-['Baloo_2'] text-lg md:text-xl text-rose-500 max-w-2xl leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <p className="mb-4">
            Pada suatu pagi yang cerah, Chayra bangun dengan senyum lebar di
            wajahnya. Hari ini adalah hari yang sangat istimewa... 💖
          </p>
          <p className="mb-4">
            Balon-balon berwarna pastel menghiasi ruang tamu, aroma kue vanilla
            memenuhi udara, dan semua orang berbisik penuh semangat: “Selamat
            ulang tahun, Chayra!” 🎂
          </p>
          <p className="mb-4">
            Chayra menari kecil di antara pita dan hadiah, tertawa sambil
            memeluk boneka kesayangannya. Hari ini bukan hanya tentang kue dan
            lilin, tapi tentang cinta dan kebahagiaan yang tumbuh di hatinya. 🎀
          </p>
        </motion.div>
      )}

      {/* Tombol Lanjut */}
      <motion.button
        onClick={onNext}
        className="mt-10 bg-amber-400 hover:bg-amber-500 text-white font-bold py-3 px-8 rounded-full shadow-md transition-all"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        🎉 Lihat Pestanya
      </motion.button>

      {/* Style animasi lambat */}
      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
