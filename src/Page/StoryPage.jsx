import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function StoryPage({ onNext }) {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const sections = [
    {
      title: "🎈 Usia 2 Tahun 🎈",
      age: "Langkah Pertama",
      desc: `Pada usia dua tahun, Chayra mulai belajar berjalan dan berbicara.
      Setiap langkah kecilnya disambut sorak bahagia dari keluarga.
      Ia mulai mengenal dunia dengan rasa ingin tahu yang besar. 🍧`,
      img: "/chayra2th.jpg",
    },
    {
      title: "🎂 Usia 3 Tahun 🎂",
      age: "Tumbuh Ceria",
      desc: `Di usia tiga tahun, Chayra mulai lancar berbicara dan berjalan.
Setiap hari dipenuhi celoteh lucu dan langkah kecil penuh semangat,
seolah dunia tak sabar untuk ia jelajahi. 🌷`,
      img: "/chayra3th.jpg",
    },
    {
      title: "🎁 Usia 4 Tahun 🎁",
      age: "Pintar dan Penuh Cinta",
      desc: `Memasuki usia empat tahun, Chayra sangat dekat dengan ibunya.
Ia gemar bercerita dan menari, membuat hari-hari dipenuhi tawa riang.
Namun, di balik keceriaannya, Chayra masih sering merasa malu saat bertemu orang baru. 💐`,
      img: "/chayra4th.jpg",
    },
    {
      title: "🌸 Usia 5 Tahun 🌸",
      age: "Tumbuh Besar",
      desc: `Menjelang usia lima tahun, perlahan Chayra mulai berani berjarak dari ibunya.
Rasa malunya pun berangsur hilang, digantikan keberanian kecil yang tumbuh bersama senyum percaya dirinya. 🎀`,
      img: "/chayra-landings.png",
    },
  ];

  return (
    <div className="min-h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-gradient-to-b from-pink-100 via-amber-50 to-rose-100 no-scrollbar relative">
      {sections.map((section, i) => (
        <section
          key={i}
          className="snap-start min-h-screen flex flex-col items-center justify-center text-center px-6 py-24 relative space-y-10"
        >
          {/* Dekorasi lucu */}
          <div className="absolute top-10 left-8 animate-bounce-slow text-5xl">
            🎈
          </div>
          <div className="absolute top-16 right-8 animate-bounce-slow text-4xl">
            🎈
          </div>
          <div className="absolute bottom-10 right-1/4 animate-bounce-slow text-3xl">
            ⭐
          </div>

          {/* Judul */}
          <motion.h1
            className="font-['Fredoka_One'] text-4xl md:text-5xl text-amber-600 drop-shadow mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {section.title}
          </motion.h1>

          {/* Gambar */}
          <motion.img
            src={section.img}
            alt={section.age}
            className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-3xl shadow-lg border-4 border-amber-200"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          />

          {/* Teks */}
          {showText && (
            <motion.div
              className="font-['Baloo_2'] text-lg md:text-xl text-rose-500 max-w-2xl leading-relaxed mt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
              viewport={{ once: true }}
            >
              <p className="mb-3 font-semibold text-amber-600">{section.age}</p>
              <p>{section.desc}</p>
            </motion.div>
          )}

          {/* Tombol hanya di akhir */}
          {i === sections.length - 1 && (
            <motion.button
              onClick={onNext}
              className="mt-16 bg-amber-400 hover:bg-amber-500 text-white font-bold py-3 px-8 rounded-full shadow-md transition-all"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              viewport={{ once: true }}
            >
              🎉 Lihat Pestanya
            </motion.button>
          )}
        </section>
      ))}

      {/* Style animasi lambat */}
      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite ease-in-out;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
