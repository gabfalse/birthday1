import { useState } from "react";
import { motion } from "framer-motion";
import supabase from "../supabaseClient";

export default function EventPage() {
  const [name, setName] = useState("");
  const [selectedDay, setSelectedDay] = useState(""); // <--- NEW
  const [confirmed, setConfirmed] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (status) => {
    if (!name.trim()) {
      setMessage("📝 Nama harus diisi dulu ya!");
      return;
    }
    if (!selectedDay) {
      setMessage("📅 Pilih hari dulu ya!");
      return;
    }

    setLoading(true);
    setMessage("");

    // Pilih tabel berdasarkan hari
    const tableName = selectedDay === "sabtu" ? "rsvp" : "rsvp2";

    const { error } = await supabase.from(tableName).insert([
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
      {/* ANIMASI BALON */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none text-6xl opacity-20"
        animate={{ y: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
      >
        🎈🎉🎈🎉
      </motion.div>

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
          Yuk ikut rayakan ulang tahun ke-5 Chayra! 💕
        </p>

        {/* INFO TEMPAT */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
          <p className="text-gray-700 font-semibold">
            📍 Tempat: Rumah Chayra
            <br />
            📅 Sabtu 15 Nov 2025 — 10.00 WIB
            <br />
            📅 Minggu 16 Nov 2025 — 09.00 WIB
          </p>
        </div>

        {/* MAP */}
        <div className="rounded-2xl overflow-hidden mb-6 shadow-md">
          <iframe
            title="Lokasi Rumah Chayra"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3967.230567293583!2d106.7697428!3d-6.857736!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e683ad4bfc2e179%3A0xb0cf3c41c35ccf2b!2s4W69%2BFF4%20Cipetir%2C%20Kabupaten%20Sukabumi!"
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

        {/* RSVP */}

        {confirmed === null ? (
          <>
            {/* Pilih Hari */}
            <div className="mb-4 text-left">
              <p className="font-semibold text-gray-700 mb-1">Pilih Hari:</p>

              <label className="flex items-center gap-2 mb-1 cursor-pointer">
                <input
                  type="radio"
                  name="day"
                  value="sabtu"
                  onChange={() => setSelectedDay("sabtu")}
                />
                <span>Sabtu — 10.00 WIB</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="day"
                  value="minggu"
                  onChange={() => setSelectedDay("minggu")}
                />
                <span>Minggu — 09.00 WIB</span>
              </label>
            </div>

            {/* Nama */}
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

            {/* Tombol */}
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
            💖 Terima kasih, {name}! Sampai jumpa di hari {selectedDay} 🎈
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl text-rose-500 font-semibold mt-4"
          >
            😢 Terima kasih sudah mengabari, {name}!
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
