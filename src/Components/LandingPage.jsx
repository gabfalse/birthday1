export default function LandingPage({ onNext }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 to-pink-100 flex flex-col items-center justify-center text-center p-6">
      {/* Header */}
      <h1 className="font-['Fredoka_One'] text-5xl md:text-6xl text-amber-500 mb-4 drop-shadow-md">
        🎉 Selamat Ulang Tahun, Chayra! 🎂
      </h1>

      <p className="font-['Baloo_2'] text-lg md:text-xl text-rose-500 max-w-xl">
        Hari ini penuh tawa, cinta, dan balon warna-warni! Mari rayakan
        kebahagiaan kecilmu bersama teman-teman 💕
      </p>

      {/* Hero Image */}
      <div className="mt-10 flex justify-center">
        <img
          src="/public/chayra-landings.png"
          alt="Birthday Celebration"
          className="w-40 h-40 md:w-56 md:h-56 object-cover rounded-full drop-shadow-lg border-4 border-pink-200 animate-bounce"
        />
      </div>

      {/* Button */}
      <div className="mt-10 space-x-4">
        <button
          onClick={onNext}
          className="bg-amber-400 hover:bg-amber-500 text-white font-bold py-3 px-6 rounded-full shadow-md transition-all"
        >
          🎁 Buka Kejutan
        </button>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-sm text-stone-500">
        Dibuat dengan cinta oleh{" "}
        <span className="text-rose-400 font-semibold">Keluarga Chayra</span> 💖
      </footer>
    </div>
  );
}
