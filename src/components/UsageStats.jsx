// // src/components/UsageStats.jsx
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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

export default function UsageStats() {
  const [usageData, setUsageData] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

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

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Utilisation du service</h2>

        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Caractères ce mois</div>
            <div className="stat-value">
              {usageData.currentMonthUsage.characters}
            </div>
            <div className="stat-desc">
              {Math.round(
                (usageData.currentMonthUsage.characters /
                  usageData.limits.characters) *
                  100
              )}
              % de la limite
            </div>
          </div>

          <div className="stat">
            <div className="stat-title">Traductions ce mois</div>
            <div className="stat-value">
              {usageData.currentMonthUsage.translations}
            </div>
            <div className="stat-desc">
              {Math.round(
                (usageData.currentMonthUsage.translations /
                  usageData.limits.translations) *
                  100
              )}
              % de la limite
            </div>
          </div>
        </div>

        {/* Graphique : si usageData.monthlyHistory existe */}
        {usageData.monthlyHistory && (
          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={usageData.monthlyHistory}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="characters" fill="#8884d8" name="Caractères" />
                <Bar dataKey="translations" fill="#82ca9d" name="Traductions" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
