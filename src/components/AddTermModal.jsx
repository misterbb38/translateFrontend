// // src/components/AddTermModal.jsx
// import { useState, useEffect } from "react";

// export default function AddTermModal({
//   isOpen,
//   onClose,
//   initialSource = "",
//   initialTarget = "",
//   onTermAdded, // callback pour rafraîchir la liste côté parent
// }) {
//   const [glossaries, setGlossaries] = useState([]);
//   const [selectedGlossaryId, setSelectedGlossaryId] = useState("");
//   const [newGlossaryName, setNewGlossaryName] = useState("");
//   const [sourceLanguage, setSourceLanguage] = useState("français");
//   const [targetLanguage, setTargetLanguage] = useState("anglais");

//   const [sourceText, setSourceText] = useState(initialSource);
//   const [targetText, setTargetText] = useState(initialTarget);

//   const [error, setError] = useState("");
//   const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     // Réinitialiser les champs quand la modal s'ouvre
//     setSourceText(initialSource);
//     setTargetText(initialTarget);
//     setError("");
//     setNewGlossaryName("");
//     setSelectedGlossaryId("");

//     if (isOpen) {
//       fetchGlossaries();
//     }
//   }, [isOpen, initialSource, initialTarget]);

//   const fetchGlossaries = async () => {
//     try {
//       const response = await fetch(`${apiUrl}/api/glossaries`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await response.json();
//       if (response.ok) {
//         setGlossaries(data);
//       } else {
//         setError(
//           data.message || "Erreur lors de la récupération des glossaires"
//         );
//       }
//     } catch (err) {
//       setError("Erreur du serveur");
//     }
//   };

//   const handleAddTerm = async () => {
//     if (!sourceText || !targetText) {
//       setError("Veuillez renseigner les champs source et cible.");
//       return;
//     }

//     // Si l'utilisateur veut créer un nouveau glossaire
//     if (newGlossaryName.trim()) {
//       try {
//         // 1) Créer un nouveau glossaire
//         const newGlossaryResponse = await fetch(`${apiUrl}/api/glossaries`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             name: newGlossaryName,
//             sourceLanguage,
//             targetLanguage,
//             terms: [{ source: sourceText, target: targetText }],
//           }),
//         });
//         const newGlossaryData = await newGlossaryResponse.json();

//         if (!newGlossaryResponse.ok) {
//           setError(
//             newGlossaryData.message ||
//               "Erreur lors de la création d'un nouveau glossaire."
//           );
//           return;
//         }

//         // Succès : on appelle le callback
//         onTermAdded && onTermAdded();
//         onClose();
//       } catch (err) {
//         setError("Erreur du serveur lors de la création du glossaire.");
//       }
//     }
//     // Sinon, si on veut ajouter à un glossaire existant
//     else if (selectedGlossaryId) {
//       try {
//         const addTermResponse = await fetch(
//           `${apiUrl}/api/glossaries/${selectedGlossaryId}/terms`,
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify({
//               source: sourceText,
//               target: targetText,
//             }),
//           }
//         );
//         const addTermData = await addTermResponse.json();

//         if (!addTermResponse.ok) {
//           setError(
//             addTermData.message ||
//               "Erreur lors de l'ajout du terme au glossaire existant."
//           );
//           return;
//         }

//         // Succès : on appelle le callback
//         onTermAdded && onTermAdded();
//         onClose();
//       } catch (err) {
//         setError("Erreur du serveur lors de l'ajout du terme.");
//       }
//     } else {
//       // Aucun glossaire choisi et aucun nom saisi
//       setError("Veuillez sélectionner un glossaire ou en créer un nouveau.");
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-gray-800 bg-opacity-60 flex items-center justify-center z-50">
//       <div className="bg-base-100 p-4 rounded shadow-lg w-full max-w-md">
//         <h2 className="text-lg font-bold mb-2">Ajouter un terme</h2>
//         {error && <div className="alert alert-error mb-2">{error}</div>}

//         <div className="mb-4">
//           <label className="label text-sm">Terme source</label>
//           <input
//             type="text"
//             className="input input-bordered w-full"
//             value={sourceText}
//             onChange={(e) => setSourceText(e.target.value)}
//           />
//         </div>
//         <div className="mb-4">
//           <label className="label text-sm">Terme cible</label>
//           <input
//             type="text"
//             className="input input-bordered w-full"
//             value={targetText}
//             onChange={(e) => setTargetText(e.target.value)}
//           />
//         </div>

//         {/* Choisir un glossaire existant */}
//         <div className="mb-4">
//           <label className="label text-sm">Ajouter au glossaire existant</label>
//           <select
//             className="select select-bordered w-full"
//             value={selectedGlossaryId}
//             onChange={(e) => setSelectedGlossaryId(e.target.value)}
//           >
//             <option value="">-- Sélectionner --</option>
//             {glossaries.map((g) => (
//               <option key={g._id} value={g._id}>
//                 {g.name} ({g.sourceLanguage} ➔ {g.targetLanguage})
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* OU création d'un nouveau glossaire */}
//         <div className="mb-4 border-t pt-2">
//           <label className="label text-sm">Ou créer un nouveau glossaire</label>
//           <input
//             type="text"
//             placeholder="Nom du nouveau glossaire"
//             className="input input-bordered w-full mb-2"
//             value={newGlossaryName}
//             onChange={(e) => setNewGlossaryName(e.target.value)}
//           />
//           <div className="flex space-x-2">
//             <select
//               className="select select-bordered w-1/2"
//               value={sourceLanguage}
//               onChange={(e) => setSourceLanguage(e.target.value)}
//             >
//               <option value="français">Français</option>
//               <option value="anglais">Anglais</option>
//               <option value="portugais">Portugais</option>
//             </select>
//             <select
//               className="select select-bordered w-1/2"
//               value={targetLanguage}
//               onChange={(e) => setTargetLanguage(e.target.value)}
//             >
//               <option value="anglais">Anglais</option>
//               <option value="français">Français</option>
//               <option value="portugais">Portugais</option>
//             </select>
//           </div>
//         </div>

//         <div className="flex justify-end space-x-2">
//           <button className="btn btn-outline" onClick={onClose}>
//             Annuler
//           </button>
//           <button className="btn btn-primary" onClick={handleAddTerm}>
//             Enregistrer
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect, useRef } from "react";
import { Minus, Maximize2, X } from "lucide-react";

export default function AddTermModal({
  isOpen,
  onClose,
  initialSource = "",
  initialTarget = "",
  onTermAdded,
}) {
  const [glossaries, setGlossaries] = useState([]);
  const [selectedGlossaryId, setSelectedGlossaryId] = useState("");
  const [newGlossaryName, setNewGlossaryName] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("français");
  const [targetLanguage, setTargetLanguage] = useState("anglais");
  const [sourceText, setSourceText] = useState(initialSource);
  const [targetText, setTargetText] = useState(initialTarget);
  const [error, setError] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });

  const modalRef = useRef(null);
  const dragRef = useRef(null);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;
  const token = localStorage.getItem("token");

  useEffect(() => {
    setSourceText(initialSource);
    setTargetText(initialTarget);
    setError("");
    setNewGlossaryName("");
    setSelectedGlossaryId("");

    if (isOpen) {
      fetchGlossaries();
    }
  }, [isOpen, initialSource, initialTarget]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging.current) return;

      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;

      setPosition((prev) => ({
        x: prev.x + dx,
        y: prev.y + dy,
      }));

      dragStart.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleDragStart = (e) => {
    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const fetchGlossaries = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/glossaries`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setGlossaries(data);
      } else {
        setError(
          data.message || "Erreur lors de la récupération des glossaires"
        );
      }
    } catch (err) {
      setError("Erreur du serveur");
    }
  };

  const handleAddTerm = async () => {
    if (!sourceText || !targetText) {
      setError("Veuillez renseigner les champs source et cible.");
      return;
    }

    if (newGlossaryName.trim()) {
      try {
        const newGlossaryResponse = await fetch(`${apiUrl}/api/glossaries`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: newGlossaryName,
            sourceLanguage,
            targetLanguage,
            terms: [{ source: sourceText, target: targetText }],
          }),
        });
        const newGlossaryData = await newGlossaryResponse.json();

        if (!newGlossaryResponse.ok) {
          setError(
            newGlossaryData.message ||
              "Erreur lors de la création d'un nouveau glossaire."
          );
          return;
        }

        onTermAdded && onTermAdded();
        onClose();
      } catch (err) {
        setError("Erreur du serveur lors de la création du glossaire.");
      }
    } else if (selectedGlossaryId) {
      try {
        const addTermResponse = await fetch(
          `${apiUrl}/api/glossaries/${selectedGlossaryId}/terms`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              source: sourceText,
              target: targetText,
            }),
          }
        );
        const addTermData = await addTermResponse.json();

        if (!addTermResponse.ok) {
          setError(
            addTermData.message ||
              "Erreur lors de l'ajout du terme au glossaire existant."
          );
          return;
        }

        onTermAdded && onTermAdded();
        onClose();
      } catch (err) {
        setError("Erreur du serveur lors de l'ajout du terme.");
      }
    } else {
      setError("Veuillez sélectionner un glossaire ou en créer un nouveau.");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="fixed bg-base-100 rounded shadow-lg"
      style={{
        width: "400px",
        left: position.x,
        top: position.y,
        zIndex: 50,
      }}
    >
      {/* Barre de titre déplaçable */}
      <div
        ref={dragRef}
        className="bg-primary text-primary-content p-2 rounded-t flex justify-between items-center cursor-move"
        onMouseDown={handleDragStart}
      >
        <h2 className="text-lg font-bold">Ajouter un terme</h2>
        <div className="flex space-x-2">
          <button
            className="hover:text-primary-content/80"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? <Maximize2 size={16} /> : <Minus size={16} />}
          </button>
          <button className="hover:text-primary-content/80" onClick={onClose}>
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Contenu de la modal (masqué si minimisé) */}
      {!isMinimized && (
        <div className="p-4">
          {error && <div className="alert alert-error mb-2">{error}</div>}

          <div className="mb-4">
            <label className="label text-sm">Terme source</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="label text-sm">Terme cible</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={targetText}
              onChange={(e) => setTargetText(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="label text-sm">
              Ajouter au glossaire existant
            </label>
            <select
              className="select select-bordered w-full"
              value={selectedGlossaryId}
              onChange={(e) => setSelectedGlossaryId(e.target.value)}
            >
              <option value="">-- Sélectionner --</option>
              {glossaries.map((g) => (
                <option key={g._id} value={g._id}>
                  {g.name} ({g.sourceLanguage} ➔ {g.targetLanguage})
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4 border-t pt-2">
            <label className="label text-sm">
              Ou créer un nouveau glossaire
            </label>
            <input
              type="text"
              placeholder="Nom du nouveau glossaire"
              className="input input-bordered w-full mb-2"
              value={newGlossaryName}
              onChange={(e) => setNewGlossaryName(e.target.value)}
            />
            <div className="flex space-x-2">
              <select
                className="select select-bordered w-1/2"
                value={sourceLanguage}
                onChange={(e) => setSourceLanguage(e.target.value)}
              >
                <option value="français">Français</option>
                <option value="anglais">Anglais</option>
                <option value="portugais">Portugais</option>
              </select>
              <select
                className="select select-bordered w-1/2"
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
              >
                <option value="anglais">Anglais</option>
                <option value="français">Français</option>
                <option value="portugais">Portugais</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <button className="btn btn-outline" onClick={onClose}>
              Annuler
            </button>
            <button className="btn btn-primary" onClick={handleAddTerm}>
              Enregistrer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
