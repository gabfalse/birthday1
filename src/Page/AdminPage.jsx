import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import supabase from "../supabaseClient";

export default function AdminPage() {
  const [sabtuGuests, setSabtuGuests] = useState([]);
  const [mingguGuests, setMingguGuests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGuests();

    // realtime Sabtu
    const channelSabtu = supabase
      .channel("rsvp-sabtu")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "rsvp" },
        (payload) => {
          setSabtuGuests((prev) => [payload.new, ...prev]);
        }
      )
      .subscribe();

    // realtime Minggu
    const channelMinggu = supabase
      .channel("rsvp-minggu")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "rsvp2" },
        (payload) => {
          setMingguGuests((prev) => [payload.new, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channelSabtu);
      supabase.removeChannel(channelMinggu);
    };
  }, []);

  const fetchGuests = async () => {
    const [sabtuRes, mingguRes] = await Promise.all([
      supabase
        .from("rsvp")
        .select("*")
        .order("created_at", { ascending: false }),
      supabase
        .from("rsvp2")
        .select("*")
        .order("created_at", { ascending: false }),
    ]);

    if (!sabtuRes.error) setSabtuGuests(sabtuRes.data);
    if (!mingguRes.error) setMingguGuests(mingguRes.data);

    setLoading(false);
  };

  const totalHadirSabtu = sabtuGuests.filter(
    (g) => g.status === "hadir"
  ).length;
  const totalTidakSabtu = sabtuGuests.filter(
    (g) => g.status === "tidak_hadir"
  ).length;

  const totalHadirMinggu = mingguGuests.filter(
    (g) => g.status === "hadir"
  ).length;
  const totalTidakMinggu = mingguGuests.filter(
    (g) => g.status === "tidak_hadir"
  ).length;

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
        className="bg-white/70 backdrop-blur-md p-6 rounded-3xl shadow-xl max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-['Fredoka_One'] text-center text-amber-600 mb-8">
          🎉 Daftar Tamu Chayra
        </h1>

        {/* SECTION SABTU */}
        <h2 className="text-2xl font-bold text-amber-700 mb-3">
          📅 Sabtu — 10.00 WIB
        </h2>

        <div className="flex justify-start gap-6 mb-4 text-lg font-semibold text-gray-700">
          <p className="bg-green-100 text-green-600 px-4 py-2 rounded-full">
            Hadir: {totalHadirSabtu}
          </p>
          <p className="bg-rose-100 text-rose-600 px-4 py-2 rounded-full">
            Tidak: {totalTidakSabtu}
          </p>
        </div>

        {sabtuGuests.length === 0 ? (
          <p className="text-gray-500 mb-8">Belum ada konfirmasi.</p>
        ) : (
          <Table guests={sabtuGuests} />
        )}

        <hr className="my-8 border-amber-300" />

        {/* SECTION MINGGU */}
        <h2 className="text-2xl font-bold text-amber-700 mb-3">
          📅 Minggu — 09.00 WIB
        </h2>

        <div className="flex justify-start gap-6 mb-4 text-lg font-semibold text-gray-700">
          <p className="bg-green-100 text-green-600 px-4 py-2 rounded-full">
            Hadir: {totalHadirMinggu}
          </p>
          <p className="bg-rose-100 text-rose-600 px-4 py-2 rounded-full">
            Tidak: {totalTidakMinggu}
          </p>
        </div>

        {mingguGuests.length === 0 ? (
          <p className="text-gray-500">Belum ada konfirmasi.</p>
        ) : (
          <Table guests={mingguGuests} />
        )}
      </motion.div>
    </div>
  );
}

function Table({ guests }) {
  return (
    <table className="w-full border-collapse mb-8">
      <thead>
        <tr className="bg-amber-100 text-amber-700">
          <th className="p-3 border">Nama</th>
          <th className="p-3 border">Status</th>
          <th className="p-3 border">Waktu</th>
        </tr>
      </thead>
      <tbody>
        {guests.map((g) => (
          <tr key={g.id} className="border-b hover:bg-amber-50 transition">
            <td className="p-3 border">{g.name}</td>
            <td className="p-3 border text-center">
              {g.status === "hadir" ? (
                <span className="text-green-600 font-semibold">🎉 Hadir</span>
              ) : (
                <span className="text-rose-600 font-semibold">😢 Tidak</span>
              )}
            </td>
            <td className="p-3 border text-gray-500 text-sm">
              {new Date(g.created_at).toLocaleString("id-ID")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
