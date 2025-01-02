// // src/components/UsageStats.jsx
// import { useState, useEffect } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// export default function UsageStats() {
//   const [usageData, setUsageData] = useState(null);
//   const [error, setError] = useState(null);
//   const token = localStorage.getItem("token");
//   const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

//   useEffect(() => {
//     const fetchUsageStats = async () => {
//       try {
//         const response = await fetch(`${apiUrl}/api/subscriptions/usage`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await response.json();

//         if (response.ok) {
//           setUsageData(data);
//         } else {
//           setError(data.message);
//         }
//       } catch (error) {
//         setError("Erreur lors de la récupération des statistiques");
//       }
//     };

//     fetchUsageStats();
//   }, [token, apiUrl]);

//   if (error) return <div className="alert alert-error">{error}</div>;
//   if (!usageData) return <div className="loading">Chargement...</div>;

//   return (
//     <div className="card bg-base-100 shadow-xl">
//       <div className="card-body">
//         <h2 className="card-title">Utilisation du service</h2>

//         <div className="stats shadow">
//           <div className="stat">
//             <div className="stat-title">Caractères ce mois</div>
//             <div className="stat-value">
//               {usageData.currentMonthUsage.characters}
//             </div>
//             <div className="stat-desc">
//               {Math.round(
//                 (usageData.currentMonthUsage.characters /
//                   usageData.limits.characters) *
//                   100
//               )}
//               % de la limite
//             </div>
//           </div>

//           <div className="stat">
//             <div className="stat-title">Traductions</div>
//             <div className="stat-value">
//               {usageData.currentMonthUsage.translations}
//             </div>
//             <div className="stat-desc">
//               {Math.round(
//                 (usageData.currentMonthUsage.translations /
//                   usageData.limits.translations) *
//                   100
//               )}
//               % de la limite
//             </div>
//           </div>
//         </div>

//         <div className="h-64 mt-4">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart
//               data={usageData.monthlyHistory}
//               margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//             >
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="characters" fill="#8884d8" name="Caractères" />
//               <Bar dataKey="translations" fill="#82ca9d" name="Traductions" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function UsageStats() {
//   const [usageData, setUsageData] = useState(null);
//   const [error, setError] = useState(null);
//   const token = localStorage.getItem("token");
//   const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

//   useEffect(() => {
//     const fetchUsageStats = async () => {
//       try {
//         const response = await fetch(`${apiUrl}/api/subscriptions/usage`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await response.json();

//         if (response.ok) {
//           setUsageData(data);
//         } else {
//           setError(data.message);
//         }
//       } catch (error) {
//         setError("Erreur lors de la récupération des statistiques");
//       }
//     };

//     fetchUsageStats();
//   }, [token, apiUrl]);

//   if (error) return <div className="alert alert-error">{error}</div>;
//   if (!usageData) return <div className="loading">Chargement...</div>;

//   return (
//     <div className="card bg-base-100 shadow-xl">
//       <div className="card-body">
//         <h2 className="card-title">Utilisation du service</h2>

//         <div className="stats shadow">
//           <div className="stat">
//             <div className="stat-title">Caractères ce mois</div>
//             <div className="stat-value">
//               {usageData.currentMonthUsage.characters}
//             </div>
//             <div className="stat-desc">
//               {Math.round(
//                 (usageData.currentMonthUsage.characters /
//                   usageData.limits.characters) *
//                   100
//               )}
//               % de la limite
//             </div>
//           </div>

//           <div className="stat">
//             <div className="stat-title">Traductions ce mois</div>
//             <div className="stat-value">
//               {usageData.currentMonthUsage.translations}
//             </div>
//             <div className="stat-desc">
//               {Math.round(
//                 (usageData.currentMonthUsage.translations /
//                   usageData.limits.translations) *
//                   100
//               )}
//               % de la limite
//             </div>
//           </div>
//         </div>

//         {/* Graphique : si usageData.monthlyHistory existe */}
//         {usageData.monthlyHistory && (
//           <div className="h-64 mt-4">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart
//                 data={usageData.monthlyHistory}
//                 margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="month" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="characters" fill="#8884d8" name="Caractères" />
//                 <Bar dataKey="translations" fill="#82ca9d" name="Traductions" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

export default function UsageStats() {
  const [usageData, setUsageData] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

  // Couleurs pour les graphiques
  const COLORS = ["#36D399", "#3ABFF8", "#F87272"];

  useEffect(() => {
    const fetchUsageStats = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/subscriptions/usage`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();

        if (response.ok) {
          setUsageData(data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError("Erreur lors de la récupération des statistiques");
      }
    };

    fetchUsageStats();
  }, [token, apiUrl]);

  if (error) return <div className="alert alert-error">{error}</div>;
  if (!usageData) return <div className="loading">Chargement...</div>;

  // Données pour les graphiques circulaires
  const charactersData = [
    {
      name: "Utilisé",
      value: usageData.currentMonthUsage.characters,
    },
    {
      name: "Restant",
      value: Math.max(
        0,
        usageData.limits.characters - usageData.currentMonthUsage.characters
      ),
    },
  ];

  const translationsData = [
    {
      name: "Utilisé",
      value: usageData.currentMonthUsage.translations,
    },
    {
      name: "Restant",
      value: Math.max(
        0,
        usageData.limits.translations - usageData.currentMonthUsage.translations
      ),
    },
  ];

  // Formater les données pour le graphique linéaire
  const historyData = usageData.monthlyHistory?.map((entry) => ({
    ...entry,
    month: new Date(entry.month + "-01").toLocaleDateString("fr-FR", {
      month: "short",
      year: "2-digit",
    }),
  }));

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title mb-6">Utilisation du service</h2>

        {/* Graphiques circulaires */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card bg-base-200 p-4">
            <h3 className="text-center font-semibold mb-2">Caractères</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={charactersData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    <Cell fill={COLORS[0]} />
                    <Cell fill={COLORS[1]} />
                  </Pie>
                  <Tooltip formatter={(value) => value.toLocaleString()} />
                </PieChart>
              </ResponsiveContainer>
              <div className="text-center mt-2">
                <p className="font-bold">
                  {Math.round(
                    (usageData.currentMonthUsage.characters /
                      usageData.limits.characters) *
                      100
                  )}
                  %
                </p>
                <p className="text-sm text-base-content/70">
                  {usageData.currentMonthUsage.characters.toLocaleString()} /{" "}
                  {usageData.limits.characters.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="card bg-base-200 p-4">
            <h3 className="text-center font-semibold mb-2">Traductions</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={translationsData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    <Cell fill={COLORS[0]} />
                    <Cell fill={COLORS[1]} />
                  </Pie>
                  <Tooltip formatter={(value) => value.toLocaleString()} />
                </PieChart>
              </ResponsiveContainer>
              <div className="text-center mt-2">
                <p className="font-bold">
                  {Math.round(
                    (usageData.currentMonthUsage.translations /
                      usageData.limits.translations) *
                      100
                  )}
                  %
                </p>
                <p className="text-sm text-base-content/70">
                  {usageData.currentMonthUsage.translations.toLocaleString()} /{" "}
                  {usageData.limits.translations.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Graphique linéaire de l'historique */}
        {historyData && historyData.length > 0 && (
          <div className="mt-8">
            <h3 className="font-semibold mb-4">Historique d'utilisation</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="characters"
                    name="Caractères"
                    stroke={COLORS[0]}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="translations"
                    name="Traductions"
                    stroke={COLORS[1]}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
