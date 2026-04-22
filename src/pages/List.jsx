import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";

const monthOptions = [
  { label: "June", value: "june", collectionName: "Jun26 DB" },
];

const sectionOptions = [
  { label: "All Sections", value: "all" },
  { label: "OPEN", value: "OPEN" },
  { label: "U1500", value: "U1500" },
  { label: "U1000", value: "U1000" },
];

function getPlayerName(player) {
  return player.playerName || player.name || "Unknown Player";
}

function getPlayerSection(player) {
  return player.sectionName || player.section_name || "";
}

function getPlayerRating(player) {
  return (
    player.rating ??
    player.uscfRating ??
    player.playerRating ??
    player.regularRating ??
    "N/A"
  );
}

function List() {
  const [selectedMonth, setSelectedMonth] = useState(monthOptions[0].value);
  const [selectedSection, setSelectedSection] = useState("all");
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPlayers = async () => {
      setLoading(true);
      setError("");

      try {
        const activeMonth =
          monthOptions.find((month) => month.value === selectedMonth) ||
          monthOptions[0];
        const snapshot = await getDocs(
          collection(firestore, activeMonth.collectionName)
        );
        const fetchedPlayers = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPlayers(fetchedPlayers);
      } catch (fetchError) {
        console.error("Error loading player list:", fetchError);
        setError("Unable to load the player list right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [selectedMonth]);

  const filteredPlayers = useMemo(() => {
    return players
      .filter((player) => {
        if (selectedSection === "all") {
          return true;
        }

        return getPlayerSection(player) === selectedSection;
      })
      .sort((playerA, playerB) =>
        getPlayerName(playerA).localeCompare(getPlayerName(playerB))
      );
  }, [players, selectedSection]);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-white p-6 shadow-xl sm:p-8"
        >
          <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-4xl font-semibold text-green-700">Player List</h1>
              <p className="mt-2 text-gray-600">
                View tournament players and filter by month or section.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                Tournament Month
                <select
                  value={selectedMonth}
                  onChange={(event) => setSelectedMonth(event.target.value)}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-base outline-none transition focus:border-green-700"
                >
                  {monthOptions.map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                Section
                <select
                  value={selectedSection}
                  onChange={(event) => setSelectedSection(event.target.value)}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-base outline-none transition focus:border-green-700"
                >
                  {sectionOptions.map((section) => (
                    <option key={section.value} value={section.value}>
                      {section.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          {error ? (
            <div className="rounded-xl bg-red-50 px-4 py-3 text-red-700">
              {error}
            </div>
          ) : null}

          <div className="overflow-hidden rounded-2xl border border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-green-700 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide">
                      Player
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide">
                      Rating
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {loading ? (
                    <tr>
                      <td
                        colSpan="2"
                        className="px-6 py-8 text-center text-gray-500"
                      >
                        Loading players...
                      </td>
                    </tr>
                  ) : filteredPlayers.length > 0 ? (
                    filteredPlayers.map((player) => (
                      <tr key={player.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 text-base font-medium text-gray-800">
                          {getPlayerName(player)}
                        </td>
                        <td className="px-6 py-4 text-base text-gray-700">
                          {getPlayerRating(player)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="2"
                        className="px-6 py-8 text-center text-gray-500"
                      >
                        No players match the current filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default List;
