// // // src/components/TranslationHistory.jsx

// // import { useState, useEffect } from "react";

// // export default function TranslationHistory({ refreshTrigger }) {
// //   const [history, setHistory] = useState([]);
// //   const [error, setError] = useState("");
// //   const token = localStorage.getItem("token");

// //   useEffect(() => {
// //     const fetchHistory = async () => {
// //       try {
// //         const response = await fetch("${apiUrl}/api/translations", {
// //           headers: { Authorization: `Bearer ${token}` },
// //         });
// //         const data = await response.json();

// //         if (response.ok) {
// //           setHistory(data);
// //         } else {
// //           setError(
// //             data.message || "Erreur lors de la récupération de l'historique"
// //           );
// //         }
// //       } catch (err) {
// //         setError("Erreur du serveur");
// //       }
// //     };

// //     fetchHistory();
// //   }, [token, refreshTrigger]); // Ajout de refreshTrigger pour rafraîchir l'historique

// //   return (
// //     <div className="mt-8">
// //       <h2 className="text-lg font-bold mb-2">Historique des traductions</h2>
// //       {error && <div className="alert alert-error">{error}</div>}
// //       {history.length === 0 ? (
// //         <p>Aucune traduction trouvée.</p>
// //       ) : (
// //         <ul className="list-disc list-inside">
// //           {history.map((item) => (
// //             <li key={item._id} className="mb-4">
// //               <strong>Langues :</strong> {item.sourceLanguage} ➔{" "}
// //               {item.targetLanguage} <br />
// //               <strong>Date :</strong>{" "}
// //               {new Date(item.createdAt).toLocaleString("fr-FR")} <br />
// //               <strong>Source :</strong> {item.sourceText} <br />
// //               <strong>Traduction :</strong> {item.translatedText}
// //             </li>
// //           ))}
// //         </ul>
// //       )}
// //     </div>
// //   );
// // }

// // src/components/TranslationHistory.jsx

// import { useState, useEffect } from "react";

// export default function TranslationHistory({ refreshTrigger }) {
//   const [history, setHistory] = useState([]);
//   const [error, setError] = useState("");
//   const token = localStorage.getItem("token");
//   const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const response = await fetch(`${apiUrl}/api/translations`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await response.json();

//         if (response.ok) {
//           setHistory(data);
//         } else {
//           setError(
//             data.message || "Erreur lors de la récupération de l'historique"
//           );
//         }
//       } catch (err) {
//         setError("Erreur du serveur");
//       }
//     };

//     fetchHistory();
//   }, [token, refreshTrigger]); // Rafraîchir l'historique après chaque traduction

//   return (
//     <div className="mt-8">
//       <h2 className="text-2xl font-bold mb-4">Historique des traductions</h2>
//       {error && <div className="alert alert-error">{error}</div>}
//       {history.length === 0 ? (
//         <p>Aucune traduction trouvée.</p>
//       ) : (
//         <div className="space-y-4">
//           {history.map((item) => (
//             <div key={item._id} className="bg-base-200 p-4 rounded-lg shadow">
//               <div className="flex items-center mb-2">
//                 <span className="badge badge-primary mr-2">
//                   {item.sourceLanguage} ➔ {item.targetLanguage}
//                 </span>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <h3 className="font-semibold mb-1">Source</h3>
//                   <div className="p-2 bg-base-100 rounded">
//                     {item.sourceText}
//                   </div>
//                 </div>
//                 <div>
//                   <h3 className="font-semibold mb-1">Traduction</h3>
//                   <div className="p-2 bg-base-100 rounded">
//                     {item.translatedText}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import { useState, useEffect } from "react";

export default function TranslationHistory({ refreshTrigger }) {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const token = localStorage.getItem("token");
  const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/translations`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();

        if (response.ok) {
          setHistory(data);
        } else {
          setError(
            data.message || "Erreur lors de la récupération de l'historique"
          );
        }
      } catch (err) {
        setError("Erreur du serveur");
      }
    };

    fetchHistory();
  }, [token, refreshTrigger]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = history.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(history.length / itemsPerPage);

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Historique des traductions</h2>
      {error && <div className="alert alert-error">{error}</div>}
      {history.length === 0 ? (
        <p>Aucune traduction trouvée.</p>
      ) : (
        <>
          <div className="space-y-4">
            {currentItems.map((item) => (
              <div key={item._id} className="bg-base-200 p-4 rounded-lg shadow">
                <div className="flex items-center mb-2">
                  <span className="badge badge-primary mr-2">
                    {item.sourceLanguage} ➔ {item.targetLanguage}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-1">Source</h3>
                    <div className="p-2 bg-base-100 rounded">
                      {item.sourceText}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Traduction</h3>
                    <div className="p-2 bg-base-100 rounded">
                      {item.translatedText}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            <button
              className="btn btn-outline"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
            >
              Précédent
            </button>
            <button
              className="btn btn-outline ml-2"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              Suivant
            </button>
          </div>
        </>
      )}
    </div>
  );
}
