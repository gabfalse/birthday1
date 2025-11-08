import { useState } from "react";
import { motion } from "framer-motion";
import supabase from "../supabaseClient"; // pastikan path ini sesuai dengan file-mu

export default function EventPage() {
  const [name, setName] = useState("");
  const [confirmed, setConfirmed] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (status) => {
    if (!name.trim()) {
      setMessage("📝 Nama harus diisi dulu ya!");
      return;
    }

    setLoading(true);
    setMessage("");

    const { error } = await supabase.from("rsvp").insert([
      {
        name: name.trim(),
        status: status ? "hadir" : "tidak_hadir",
      },
    ]);

    if (error) {
      console.error("Gagal kirim data:", error);
      setMessage("❌ Terjadi kesalahan, coba lagi nanti.");
    } else {
      setConfirmed(status);
      setMessage("");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-rose-100 to-amber-50 text-center p-6 relative overflow-hidden">
      {/* Balon animasi */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none text-6xl opacity-20"
        animate={{ y: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
      >
        🎈🎉🎈🎉
      </motion.div>

      {/* Isi halaman */}
      <motion.div
        className="bg-white/70 backdrop-blur-md p-8 rounded-3xl shadow-xl max-w-lg relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-5xl font-['Fredoka_One'] text-amber-600 mb-4">
          🎂 Pesta Ulang Tahun Chayra 🎀
        </h1>
        <p className="text-gray-700 mb-4 leading-relaxed text-lg">
          Yuk ikut rayakan ulang tahun ke-5 Chayra yang penuh warna dan tawa!
          Kami tunggu kehadiranmu di hari yang spesial ini 💕
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
          <p className="text-gray-700 font-semibold">
            📍 Tempat: Rumah Chayra, Jl. Mawar Indah No. 5 📅 Tanggal: Minggu,
            15 Desember 2025 🕒 Waktu: 10.00 WIB - 13.00 WIB
          </p>
        </div>

        {confirmed === null ? (
          <>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tulis namamu di sini..."
              className="w-full px-4 py-2 mb-4 border border-amber-200 rounded-full focus:ring-2 focus:ring-pink-300 outline-none text-center"
            />
            {message && (
              <p className="text-sm text-rose-500 font-semibold mb-2">
                {message}
              </p>
            )}
            <div className="flex justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-pink-500 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:bg-pink-600 disabled:opacity-50"
                onClick={() => handleSubmit(true)}
                disabled={loading}
              >
                {loading ? "Mengirim..." : "🎉 Aku Hadir!"}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-full font-semibold shadow-md hover:bg-gray-400 disabled:opacity-50"
                onClick={() => handleSubmit(false)}
                disabled={loading}
              >
                {loading ? "Mengirim..." : "😢 Tidak Bisa"}
              </motion.button>
            </div>
          </>
        ) : confirmed ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl text-green-600 font-semibold mt-4"
          >
            💖 Terima kasih, {name}! Sampai jumpa di pesta 🎈
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl text-rose-500 font-semibold mt-4"
          >
            😢 Terima kasih sudah mengabari, {name}! Semoga lain kali bisa hadir
            💕
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
