// // // // import { useState, useEffect } from "react";
// // // // import GlossaryList from "../components/GlossaryList";
// // // // import TranslationHistory from "../components/TranslationHistory";

// // // // export default function TranslationPage() {
// // // //   const [sourceText, setSourceText] = useState("");
// // // //   const [translatedText, setTranslatedText] = useState("");
// // // //   const [sourceLanguage, setSourceLanguage] = useState("français");
// // // //   const [targetLanguage, setTargetLanguage] = useState("anglais");
// // // //   const [glossaries, setGlossaries] = useState([]);
// // // //   const [selectedGlossaries, setSelectedGlossaries] = useState([]);
// // // //   const [history, setHistory] = useState([]);
// // // //   const [refreshTrigger, setRefreshTrigger] = useState(0);
// // // //   const [error, setError] = useState("");
// // // //   const [isLoading, setIsLoading] = useState(false); // Ajout de isLoading
// // // //   const token = localStorage.getItem("token");
// // // //   const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

// // // //   // Récupérer les glossaires en fonction des langues sélectionnées
// // // //   useEffect(() => {
// // // //     const fetchGlossaries = async () => {
// // // //       try {
// // // //         const response = await fetch(`${apiUrl}/api/glossaries`, {
// // // //           headers: { Authorization: `Bearer ${token}` },
// // // //         });
// // // //         const data = await response.json();

// // // //         if (response.ok) {
// // // //           // Filtrer les glossaires en fonction des langues
// // // //           const filteredGlossaries = data.filter(
// // // //             (glossary) =>
// // // //               glossary.sourceLanguage === sourceLanguage &&
// // // //               glossary.targetLanguage === targetLanguage
// // // //           );
// // // //           setGlossaries(filteredGlossaries);
// // // //         } else {
// // // //           setError(
// // // //             data.message || "Erreur lors de la récupération des glossaires"
// // // //           );
// // // //         }
// // // //       } catch (err) {
// // // //         setError("Erreur du serveur");
// // // //       }
// // // //     };

// // // //     fetchGlossaries();
// // // //   }, [sourceLanguage, targetLanguage, token]);

// // // //   const handleTranslate = async () => {
// // // //     if (!sourceText) {
// // // //       setError("Veuillez entrer le texte à traduire");
// // // //       return;
// // // //     }

// // // //     setError("");
// // // //     setIsLoading(true); // Démarre le chargement

// // // //     try {
// // // //       const response = await fetch(`${apiUrl}/api/translations/translate`, {
// // // //         method: "POST",
// // // //         headers: {
// // // //           "Content-Type": "application/json",
// // // //           Authorization: `Bearer ${token}`,
// // // //         },
// // // //         body: JSON.stringify({
// // // //           text: sourceText,
// // // //           glossaryId: selectedGlossaries[0],
// // // //           sourceLanguage,
// // // //           targetLanguage,
// // // //         }),
// // // //       });
// // // //       const data = await response.json();

// // // //       if (response.ok) {
// // // //         setTranslatedText(data.translatedText);
// // // //         setHistory([
// // // //           ...history,
// // // //           { sourceText, translatedText: data.translatedText },
// // // //         ]);
// // // //         setRefreshTrigger((prev) => prev + 1); // Rafraîchit l'historique
// // // //       } else {
// // // //         setError(data.message || "Erreur lors de la traduction");
// // // //       }
// // // //     } catch (err) {
// // // //       setError("Erreur du serveur");
// // // //     } finally {
// // // //       setIsLoading(false); // Termine le chargement
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="flex">
// // // //       {/* Liste des glossaires */}
// // // //       <GlossaryList
// // // //         glossaries={glossaries}
// // // //         selectedGlossaries={selectedGlossaries}
// // // //         setSelectedGlossaries={setSelectedGlossaries}
// // // //       />

// // // //       {/* Zone de traduction */}
// // // //       <div className="flex flex-col flex-grow p-4">
// // // //         {error && <div className="alert alert-error">{error}</div>}
// // // //         <div className="flex space-x-4">
// // // //           {/* Champ de texte source */}
// // // //           <div className="flex flex-col w-1/2">
// // // //             <select
// // // //               className="select select-bordered mb-2"
// // // //               value={sourceLanguage}
// // // //               onChange={(e) => setSourceLanguage(e.target.value)}
// // // //             >
// // // //               <option value="anglais">Anglais</option>
// // // //               <option value="français">Français</option>
// // // //               <option value="portugais">Portugais</option>

// // // //               {/* Ajouter d'autres langues */}
// // // //             </select>
// // // //             <textarea
// // // //               className="textarea textarea-bordered h-full"
// // // //               placeholder="Entrez le texte à traduire"
// // // //               value={sourceText}
// // // //               onChange={(e) => setSourceText(e.target.value)}
// // // //               height="200px"
// // // //             />
// // // //           </div>

// // // //           {/* Champ de texte traduit */}
// // // //           <div className="flex flex-col w-1/2">
// // // //             <select
// // // //               className="select select-bordered mb-2"
// // // //               value={targetLanguage}
// // // //               onChange={(e) => setTargetLanguage(e.target.value)}
// // // //             >
// // // //               <option value="anglais">Anglais</option>
// // // //               <option value="français">Français</option>
// // // //               <option value="portugais">Portugais</option>

// // // //               {/* Ajouter d'autres langues */}
// // // //             </select>
// // // //             <textarea
// // // //               className="textarea textarea-bordered h-full"
// // // //               placeholder="Traduction"
// // // //               value={translatedText}
// // // //               readOnly
// // // //             />
// // // //           </div>
// // // //         </div>

// // // //         {/* Bouton pour traduire */}
// // // //         <button
// // // //           className={`btn btn-primary mt-4 ${isLoading ? "loading" : ""}`}
// // // //           onClick={handleTranslate}
// // // //           disabled={isLoading}
// // // //         >
// // // //           {isLoading ? "Traduction en cours..." : "Traduire"}
// // // //         </button>

// // // //         {/* Historique des traductions */}
// // // //         <TranslationHistory refreshTrigger={refreshTrigger} />
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // src/pages/TranslationPage.jsx
// // // import { useState, useEffect } from "react";
// // // import { Copy } from "lucide-react"; // Si vous utilisez l'icône de copie
// // // import GlossaryList from "../components/GlossaryList";
// // // import TranslationHistory from "../components/TranslationHistory";

// // // export default function TranslationPage() {
// // //   const [sourceText, setSourceText] = useState("");
// // //   const [translatedText, setTranslatedText] = useState("");
// // //   const [sourceLanguage, setSourceLanguage] = useState("français");
// // //   const [targetLanguage, setTargetLanguage] = useState("anglais");
// // //   const [glossaries, setGlossaries] = useState([]);
// // //   const [selectedGlossaries, setSelectedGlossaries] = useState([]);
// // //   const [history, setHistory] = useState([]);
// // //   const [refreshTrigger, setRefreshTrigger] = useState(0);
// // //   const [error, setError] = useState("");
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const token = localStorage.getItem("token");
// // //   const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

// // //   // Récupérer les glossaires en fonction des langues sélectionnées
// // //   useEffect(() => {
// // //     const fetchGlossaries = async () => {
// // //       try {
// // //         const response = await fetch(`${apiUrl}/api/glossaries`, {
// // //           headers: { Authorization: `Bearer ${token}` },
// // //         });
// // //         const data = await response.json();

// // //         if (response.ok) {
// // //           // Filtrer les glossaires en fonction des langues
// // //           const filteredGlossaries = data.filter(
// // //             (glossary) =>
// // //               glossary.sourceLanguage === sourceLanguage &&
// // //               glossary.targetLanguage === targetLanguage
// // //           );
// // //           setGlossaries(filteredGlossaries);
// // //         } else {
// // //           setError(
// // //             data.message || "Erreur lors de la récupération des glossaires"
// // //           );
// // //         }
// // //       } catch (err) {
// // //         setError("Erreur du serveur");
// // //       }
// // //     };

// // //     fetchGlossaries();
// // //   }, [sourceLanguage, targetLanguage, token]);

// // //   const handleTranslate = async () => {
// // //     if (!sourceText) {
// // //       setError("Veuillez entrer le texte à traduire");
// // //       return;
// // //     }

// // //     setError("");
// // //     setIsLoading(true);

// // //     try {
// // //       const response = await fetch(`${apiUrl}/api/translations/translate`, {
// // //         method: "POST",
// // //         headers: {
// // //           "Content-Type": "application/json",
// // //           Authorization: `Bearer ${token}`,
// // //         },
// // //         body: JSON.stringify({
// // //           text: sourceText,
// // //           glossaryId: selectedGlossaries[0],
// // //           sourceLanguage,
// // //           targetLanguage,
// // //         }),
// // //       });
// // //       const data = await response.json();

// // //       if (response.ok) {
// // //         setTranslatedText(data.translatedText);
// // //         setHistory([
// // //           ...history,
// // //           { sourceText, translatedText: data.translatedText },
// // //         ]);
// // //         setRefreshTrigger((prev) => prev + 1);
// // //       } else {
// // //         setError(data.message || "Erreur lors de la traduction");
// // //       }
// // //     } catch (err) {
// // //       setError("Erreur du serveur");
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="flex flex-col md:flex-row">
// // //       {/* Liste des glossaires */}
// // //       <GlossaryList
// // //         glossaries={glossaries}
// // //         selectedGlossaries={selectedGlossaries}
// // //         setSelectedGlossaries={setSelectedGlossaries}
// // //       />

// // //       {/* Zone de traduction */}
// // //       <div className="flex flex-col flex-grow p-4">
// // //         {error && <div className="alert alert-error">{error}</div>}
// // //         <div className="flex flex-col md:flex-row md:space-x-4">
// // //           {/* Champ de texte source */}
// // //           <div className="flex flex-col w-full md:w-1/2">
// // //             <select
// // //               className="select select-bordered mb-2"
// // //               value={sourceLanguage}
// // //               onChange={(e) => setSourceLanguage(e.target.value)}
// // //             >
// // //               <option value="anglais">Anglais</option>
// // //               <option value="français">Français</option>
// // //               <option value="portugais">Portugais</option>
// // //               {/* Ajouter d'autres langues */}
// // //             </select>
// // //             <textarea
// // //               className="textarea textarea-bordered min-h-[200px] w-full"
// // //               placeholder="Entrez le texte à traduire"
// // //               value={sourceText}
// // //               onChange={(e) => setSourceText(e.target.value)}
// // //             />
// // //           </div>

// // //           {/* Champ de texte traduit */}
// // //           <div className="flex flex-col w-full md:w-1/2 mt-4 md:mt-0">
// // //             <select
// // //               className="select select-bordered mb-2"
// // //               value={targetLanguage}
// // //               onChange={(e) => setTargetLanguage(e.target.value)}
// // //             >
// // //               <option value="anglais">Anglais</option>
// // //               <option value="français">Français</option>
// // //               <option value="portugais">Portugais</option>
// // //               {/* Ajouter d'autres langues */}
// // //             </select>
// // //             <div className="relative">
// // //               <textarea
// // //                 className="textarea textarea-bordered min-h-[200px] w-full pr-12"
// // //                 placeholder="Traduction"
// // //                 value={translatedText}
// // //                 readOnly
// // //               />
// // //               <button
// // //                 className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
// // //                 onClick={() => navigator.clipboard.writeText(translatedText)}
// // //               >
// // //                 <Copy className="w-5 h-5" />
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Bouton pour traduire */}
// // //         <button
// // //           className={`btn btn-primary mt-4 ${isLoading ? "loading" : ""}`}
// // //           onClick={handleTranslate}
// // //           disabled={isLoading}
// // //         >
// // //           {isLoading ? "Traduction en cours..." : "Traduire"}
// // //         </button>

// // //         {/* Historique des traductions */}
// // //         <TranslationHistory refreshTrigger={refreshTrigger} />
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // src/pages/TranslationPage.jsx
// // import { useState, useEffect } from "react";
// // import { Copy } from "lucide-react";
// // import GlossaryList from "../components/GlossaryList";
// // import TranslationHistory from "../components/TranslationHistory";

// // export default function TranslationPage() {
// //   const [sourceText, setSourceText] = useState("");
// //   const [translatedText, setTranslatedText] = useState("");
// //   const [sourceLanguage, setSourceLanguage] = useState("français");
// //   const [targetLanguage, setTargetLanguage] = useState("anglais");
// //   const [glossaries, setGlossaries] = useState([]);
// //   const [selectedGlossaries, setSelectedGlossaries] = useState([]);
// //   const [history, setHistory] = useState([]);
// //   const [refreshTrigger, setRefreshTrigger] = useState(0);
// //   const [error, setError] = useState("");
// //   const [isLoading, setIsLoading] = useState(false);
// //   const token = localStorage.getItem("token");
// //   const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

// //   // Récupérer les glossaires en fonction des langues sélectionnées
// //   useEffect(() => {
// //     const fetchGlossaries = async () => {
// //       try {
// //         const response = await fetch(`${apiUrl}/api/glossaries`, {
// //           headers: { Authorization: `Bearer ${token}` },
// //         });
// //         const data = await response.json();

// //         if (response.ok) {
// //           // Filtrer les glossaires en fonction des langues
// //           const filteredGlossaries = data.filter(
// //             (glossary) =>
// //               glossary.sourceLanguage === sourceLanguage &&
// //               glossary.targetLanguage === targetLanguage
// //           );
// //           setGlossaries(filteredGlossaries);
// //         } else {
// //           setError(
// //             data.message || "Erreur lors de la récupération des glossaires"
// //           );
// //         }
// //       } catch (err) {
// //         setError("Erreur du serveur");
// //       }
// //     };

// //     fetchGlossaries();
// //   }, [sourceLanguage, targetLanguage, token]);

// //   const handleTranslate = async () => {
// //     if (!sourceText) {
// //       setError("Veuillez entrer le texte à traduire");
// //       return;
// //     }

// //     setError("");
// //     setIsLoading(true);

// //     try {
// //       const response = await fetch(`${apiUrl}/api/translations/translate`, {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //           Authorization: `Bearer ${token}`,
// //         },
// //         body: JSON.stringify({
// //           text: sourceText,
// //           glossaryId: selectedGlossaries[0],
// //           sourceLanguage,
// //           targetLanguage,
// //         }),
// //       });
// //       const data = await response.json();

// //       if (response.ok) {
// //         setTranslatedText(data.translatedText);
// //         setHistory([
// //           ...history,
// //           { sourceText, translatedText: data.translatedText },
// //         ]);
// //         setRefreshTrigger((prev) => prev + 1);
// //       } else {
// //         setError(data.message || "Erreur lors de la traduction");
// //       }
// //     } catch (err) {
// //       setError("Erreur du serveur");
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="flex flex-col md:flex-row">
// //       {/* Liste des glossaires */}
// //       <GlossaryList
// //         glossaries={glossaries}
// //         selectedGlossaries={selectedGlossaries}
// //         setSelectedGlossaries={setSelectedGlossaries}
// //       />

// //       {/* Zone de traduction */}
// //       <div className="flex flex-col flex-grow p-4">
// //         {error && <div className="alert alert-error">{error}</div>}
// //         <div className="flex flex-col md:flex-row md:space-x-4">
// //           {/* Champ de texte source */}
// //           <div className="flex flex-col w-full md:w-1/2">
// //             <select
// //               className="select select-bordered mb-2"
// //               value={sourceLanguage}
// //               onChange={(e) => setSourceLanguage(e.target.value)}
// //             >
// //               <option value="anglais">Anglais</option>
// //               <option value="français">Français</option>
// //               <option value="portugais">Portugais</option>
// //               {/* Ajouter d'autres langues */}
// //             </select>
// //             <textarea
// //               className="textarea textarea-bordered min-h-[200px] w-full"
// //               placeholder="Entrez le texte à traduire"
// //               value={sourceText}
// //               onChange={(e) => setSourceText(e.target.value)}
// //             />
// //           </div>

// //           {/* Champ de texte traduit */}
// //           <div className="flex flex-col w-full md:w-1/2 mt-4 md:mt-0">
// //             <select
// //               className="select select-bordered mb-2"
// //               value={targetLanguage}
// //               onChange={(e) => setTargetLanguage(e.target.value)}
// //             >
// //               <option value="anglais">Anglais</option>
// //               <option value="français">Français</option>
// //               <option value="portugais">Portugais</option>
// //               {/* Ajouter d'autres langues */}
// //             </select>
// //             <div className="relative">
// //               <textarea
// //                 className="textarea textarea-bordered min-h-[200px] w-full pr-12"
// //                 placeholder="Traduction"
// //                 value={translatedText}
// //                 readOnly
// //               />
// //               <button
// //                 className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
// //                 onClick={() => navigator.clipboard.writeText(translatedText)}
// //               >
// //                 <Copy className="w-5 h-5" />
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Bouton pour traduire */}
// //         <button
// //           className={`btn btn-primary mt-4 ${isLoading ? "loading" : ""}`}
// //           onClick={handleTranslate}
// //           disabled={isLoading}
// //         >
// //           {isLoading ? "Traduction en cours..." : "Traduire"}
// //         </button>

// //         {/* Historique des traductions */}
// //         <TranslationHistory refreshTrigger={refreshTrigger} />
// //       </div>
// //     </div>
// //   );
// // }

// import { useState, useEffect } from "react";
// import { Copy } from "lucide-react";
// import GlossaryList from "../components/GlossaryList";
// import TranslationHistory from "../components/TranslationHistory";

// export default function TranslationPage() {
//   const [sourceText, setSourceText] = useState("");
//   const [translatedText, setTranslatedText] = useState("");
//   const [sourceLanguage, setSourceLanguage] = useState("français");
//   const [targetLanguage, setTargetLanguage] = useState("anglais");
//   const [glossaries, setGlossaries] = useState([]);
//   const [selectedGlossaries, setSelectedGlossaries] = useState([]);
//   const [history, setHistory] = useState([]);
//   const [refreshTrigger, setRefreshTrigger] = useState(0);
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const token = localStorage.getItem("token");
//   const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

//   // Récupérer les glossaires en fonction des langues sélectionnées
//   useEffect(() => {
//     const fetchGlossaries = async () => {
//       try {
//         const response = await fetch(`${apiUrl}/api/glossaries`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await response.json();

//         if (response.ok) {
//           const filteredGlossaries = data.filter(
//             (glossary) =>
//               glossary.sourceLanguage === sourceLanguage &&
//               glossary.targetLanguage === targetLanguage
//           );
//           setGlossaries(filteredGlossaries);
//         } else {
//           setError(
//             data.message || "Erreur lors de la récupération des glossaires"
//           );
//         }
//       } catch (err) {
//         setError("Erreur du serveur");
//       }
//     };

//     fetchGlossaries();
//   }, [sourceLanguage, targetLanguage, token]);

//   const handleTranslate = async () => {
//     if (!sourceText) {
//       setError("Veuillez entrer le texte à traduire");
//       return;
//     }

//     setError("");
//     setIsLoading(true);

//     try {
//       const response = await fetch(`${apiUrl}/api/translations/translate`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           text: sourceText,
//           glossaryId: selectedGlossaries[0],
//           sourceLanguage,
//           targetLanguage,
//         }),
//       });
//       const data = await response.json();

//       if (response.ok) {
//         setTranslatedText(data.translatedText);
//         setHistory([
//           ...history,
//           { sourceText, translatedText: data.translatedText },
//         ]);
//         setRefreshTrigger((prev) => prev + 1);
//       } else {
//         setError(data.message || "Erreur lors de la traduction");
//       }
//     } catch (err) {
//       setError("Erreur du serveur");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col md:flex-row">
//       {/* Glossaires */}
//       <div className="w-full md:w-1/3 p-4 bg-base-100">
//         <GlossaryList
//           glossaries={glossaries}
//           selectedGlossaries={selectedGlossaries}
//           setSelectedGlossaries={setSelectedGlossaries}
//         />
//       </div>

//       {/* Zone de traduction */}
//       <div className="flex flex-col flex-grow p-4">
//         {error && <div className="alert alert-error">{error}</div>}
//         <div className="flex flex-col md:flex-row md:space-x-4">
//           {/* Champ de texte source */}
//           <div className="flex flex-col w-full md:w-1/2">
//             <select
//               className="select select-bordered mb-2"
//               value={sourceLanguage}
//               onChange={(e) => setSourceLanguage(e.target.value)}
//             >
//               <option value="anglais">Anglais</option>
//               <option value="français">Français</option>
//               <option value="portugais">Portugais</option>
//             </select>
//             <textarea
//               className="textarea textarea-bordered min-h-[200px] w-full"
//               placeholder="Entrez le texte à traduire"
//               value={sourceText}
//               onChange={(e) => setSourceText(e.target.value)}
//             />
//           </div>

//           {/* Champ de texte traduit */}
//           <div className="flex flex-col w-full md:w-1/2 mt-4 md:mt-0">
//             <select
//               className="select select-bordered mb-2"
//               value={targetLanguage}
//               onChange={(e) => setTargetLanguage(e.target.value)}
//             >
//               <option value="anglais">Anglais</option>
//               <option value="français">Français</option>
//               <option value="portugais">Portugais</option>
//             </select>
//             <div className="relative">
//               <textarea
//                 className="textarea textarea-bordered min-h-[200px] w-full pr-12"
//                 placeholder="Traduction"
//                 value={translatedText}
//                 readOnly
//               />
//               <button
//                 className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//                 onClick={() => navigator.clipboard.writeText(translatedText)}
//               >
//                 <Copy className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Bouton pour traduire */}
//         <button
//           className={`btn btn-primary mt-4 ${isLoading ? "loading" : ""}`}
//           onClick={handleTranslate}
//           disabled={isLoading}
//         >
//           {isLoading ? "Traduction en cours..." : "Traduire"}
//         </button>

//         {/* Historique des traductions */}
//         <TranslationHistory refreshTrigger={refreshTrigger} />
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { Copy } from "lucide-react";
import GlossaryList from "../components/GlossaryList";
import TranslationHistory from "../components/TranslationHistory";

export default function TranslationPage() {
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("français");
  const [targetLanguage, setTargetLanguage] = useState("anglais");
  const [glossaries, setGlossaries] = useState([]);
  const [selectedGlossaries, setSelectedGlossaries] = useState([]);
  const [history, setHistory] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");
  const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

  useEffect(() => {
    const fetchGlossaries = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/glossaries`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();

        if (response.ok) {
          const filteredGlossaries = data.filter(
            (glossary) =>
              glossary.sourceLanguage === sourceLanguage &&
              glossary.targetLanguage === targetLanguage
          );
          setGlossaries(filteredGlossaries);
        } else {
          setError(
            data.message || "Erreur lors de la récupération des glossaires"
          );
        }
      } catch (err) {
        setError("Erreur du serveur");
      }
    };

    fetchGlossaries();
  }, [sourceLanguage, targetLanguage, token]);

  const handleTranslate = async () => {
    if (!sourceText) {
      setError("Veuillez entrer le texte à traduire");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(`${apiUrl}/api/translations/translate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          text: sourceText,
          glossaryId: selectedGlossaries[0],
          sourceLanguage,
          targetLanguage,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        setTranslatedText(data.translatedText);
        setHistory([
          ...history,
          { sourceText, translatedText: data.translatedText },
        ]);
        setRefreshTrigger((prev) => prev + 1);
      } else {
        setError(data.message || "Erreur lors de la traduction");
      }
    } catch (err) {
      setError("Erreur du serveur");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Glossaires */}
      <div className="p-4 bg-base-100 w-full md:w-1/4 md:sticky md:top-0">
        <GlossaryList
          glossaries={glossaries}
          selectedGlossaries={selectedGlossaries}
          setSelectedGlossaries={setSelectedGlossaries}
        />
      </div>

      {/* Zone de traduction */}
      <div className="flex flex-col flex-grow p-4">
        {error && <div className="alert alert-error">{error}</div>}
        <div className="flex flex-col md:flex-row md:space-x-4">
          {/* Champ de texte source */}
          <div className="flex flex-col w-full md:w-1/2">
            <select
              className="select select-bordered mb-2"
              value={sourceLanguage}
              onChange={(e) => setSourceLanguage(e.target.value)}
            >
              <option value="anglais">Anglais</option>
              <option value="français">Français</option>
              <option value="portugais">Portugais</option>
            </select>
            <textarea
              className="textarea textarea-bordered min-h-[200px] w-full"
              placeholder="Entrez le texte à traduire"
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
            />
          </div>

          {/* Champ de texte traduit */}
          <div className="flex flex-col w-full md:w-1/2 mt-4 md:mt-0">
            <select
              className="select select-bordered mb-2"
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
            >
              <option value="anglais">Anglais</option>
              <option value="français">Français</option>
              <option value="portugais">Portugais</option>
            </select>
            <div className="relative">
              <textarea
                className="textarea textarea-bordered min-h-[200px] w-full pr-12"
                placeholder="Traduction"
                value={translatedText}
                readOnly
              />
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={() => navigator.clipboard.writeText(translatedText)}
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bouton pour traduire */}
        <button
          className={`btn btn-primary mt-4 ${isLoading ? "loading" : ""}`}
          onClick={handleTranslate}
          disabled={isLoading}
        >
          {isLoading ? "Traduction en cours..." : "Traduire"}
        </button>

        {/* Historique des traductions */}
        <TranslationHistory refreshTrigger={refreshTrigger} />
      </div>
    </div>
  );
}
