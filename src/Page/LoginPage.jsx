import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const allowedEmail = "chayra15112020";

    if (email.trim().toLowerCase() === allowedEmail) {
      setError("");
      navigate("/halamandaftarhadir"); // ✅ arahkan ke halaman admin
    } else {
      setError("Code tidak dikenali.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-amber-100 to-pink-100 text-center p-6">
      <motion.div
        className="bg-white/70 backdrop-blur-md p-8 rounded-3xl shadow-xl max-w-md w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl font-['Fredoka_One'] text-amber-600 mb-4">
          🎂 Login Admin
        </h1>
        <p className="text-gray-600 mb-4">
          Masukkan code untuk melihat daftar tamu
        </p>

        <input
          type="email"
          placeholder="Tulis disini"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-pink-200 rounded-full text-center focus:ring-2 focus:ring-pink-300 outline-none mb-4"
        />

        {error && <p className="text-rose-500 text-sm mb-3">{error}</p>}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogin}
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-6 rounded-full shadow-md"
        >
          Masuk
        </motion.button>
      </motion.div>
    </div>
  );
}
