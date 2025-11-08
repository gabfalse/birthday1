import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import supabase from "../supabaseClient";

export default function AdminPage() {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGuests();

    // realtime update (jika ada tamu baru konfirmasi)
    const channel = supabase
      .channel("rsvp-changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "rsvp" },
        (payload) => {
          setGuests((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchGuests = async () => {
    const { data, error } = await supabase
      .from("rsvp")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setGuests(data);
    setLoading(false);
  };

  const totalHadir = guests.filter((g) => g.status === "hadir").length;
  const totalTidak = guests.filter((g) => g.status === "tidak_hadir").length;

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-amber-50">
        <p className="text-lg text-gray-600 animate-pulse">
          Memuat data tamu...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-amber-50 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/70 backdrop-blur-md p-6 rounded-3xl shadow-xl max-w-3xl mx-auto"
      >
        <h1 className="text-4xl font-['Fredoka_One'] text-center text-amber-600 mb-6">
          🎉 Daftar Tamu Chayra
        </h1>

        <div className="flex justify-center gap-6 mb-6 text-lg font-semibold text-gray-700">
          <p className="bg-green-100 text-green-600 px-4 py-2 rounded-full">
            Hadir: {totalHadir}
          </p>
          <p className="bg-rose-100 text-rose-600 px-4 py-2 rounded-full">
            Tidak Hadir: {totalTidak}
          </p>
        </div>

        {guests.length === 0 ? (
          <p className="text-center text-gray-500">Belum ada konfirmasi.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-amber-100 text-amber-700">
                <th className="p-3 border">Nama</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Waktu</th>
              </tr>
            </thead>
            <tbody>
              {guests.map((g) => (
                <tr
                  key={g.id}
                  className="border-b hover:bg-amber-50 transition"
                >
                  <td className="p-3 border">{g.name}</td>
                  <td className="p-3 border text-center">
                    {g.status === "hadir" ? (
                      <span className="text-green-600 font-semibold">
                        🎉 Hadir
                      </span>
                    ) : (
                      <span className="text-rose-600 font-semibold">
                        😢 Tidak
                      </span>
                    )}
                  </td>
                  <td className="p-3 border text-gray-500 text-sm">
                    {new Date(g.created_at).toLocaleString("id-ID")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </motion.div>
    </div>
  );
}
