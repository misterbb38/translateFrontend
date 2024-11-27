// // src/pages/AddEditGlossaryPage.jsx
// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { Trash } from "lucide-react";

// export default function AddEditGlossaryPage() {
//   const [name, setName] = useState("");
//   const [terms, setTerms] = useState([{ source: "", target: "" }]);
//   const [sourceLanguage, setSourceLanguage] = useState("français");
//   const [targetLanguage, setTargetLanguage] = useState("anglais");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const isEditMode = !!id;
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (isEditMode) {
//       // Récupérer les données du glossaire à modifier
//       const fetchGlossary = async () => {
//         try {
//           const response = await fetch(
//             `${apiUrl}/api/glossaries/${id}`,
//             {
//               headers: { Authorization: `Bearer ${token}` },
//             }
//           );
//           const data = await response.json();

//           if (response.ok) {
//             setName(data.name);
//             setTerms(data.terms);
//             setSourceLanguage(data.sourceLanguage);
//             setTargetLanguage(data.targetLanguage);
//           } else {
//             setError(
//               data.message || "Erreur lors de la récupération du glossaire"
//             );
//           }
//         } catch (err) {
//           setError("Erreur du serveur");
//         }
//       };

//       fetchGlossary();
//     }
//   }, [id, isEditMode, token]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const glossaryData = {
//       name,
//       terms,
//       sourceLanguage,
//       targetLanguage,
//     };

//     try {
//       const response = await fetch(
//         `${apiUrl}/api/glossaries${isEditMode ? `/${id}` : ""}`,
//         {
//           method: isEditMode ? "PUT" : "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(glossaryData),
//         }
//       );
//       const data = await response.json();

//       if (response.ok) {
//         navigate("/glossaries");
//       } else {
//         setError(
//           data.message || "Erreur lors de l'enregistrement du glossaire"
//         );
//       }
//     } catch (err) {
//       setError("Erreur du serveur");
//     }
//   };

//   const handleTermChange = (index, field, value) => {
//     const newTerms = [...terms];
//     newTerms[index][field] = value;
//     setTerms(newTerms);
//   };

//   const addTerm = () => {
//     setTerms([...terms, { source: "", target: "" }]);
//   };

//   const removeTerm = (index) => {
//     const newTerms = terms.filter((_, i) => i !== index);
//     setTerms(newTerms);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">
//         {isEditMode ? "Modifier le Glossaire" : "Ajouter un Glossaire"}
//       </h1>
//       {error && <div className="alert alert-error">{error}</div>}
//       <form onSubmit={handleSubmit}>
//         <div className="form-control mb-4">
//           <label className="label">Nom du glossaire</label>
//           <input
//             type="text"
//             className="input input-bordered"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>
//         <div className="flex space-x-4 mb-4">
//           <div className="form-control w-1/2">
//             <label className="label">Langue source</label>
//             <select
//               className="select select-bordered"
//               value={sourceLanguage}
//               onChange={(e) => setSourceLanguage(e.target.value)}
//               required
//             >
//               <option value="français">Français</option>
//               <option value="anglais">Anglais</option>
//               {/* Ajouter d'autres langues */}
//             </select>
//           </div>
//           <div className="form-control w-1/2">
//             <label className="label">Langue cible</label>
//             <select
//               className="select select-bordered"
//               value={targetLanguage}
//               onChange={(e) => setTargetLanguage(e.target.value)}
//               required
//             >
//               <option value="anglais">Anglais</option>
//               <option value="français">Français</option>
//               {/* Ajouter d'autres langues */}
//             </select>
//           </div>
//         </div>
//         <div className="mb-4">
//           <h2 className="text-lg font-bold">Termes</h2>
//           {terms.map((term, index) => (
//             <div key={index} className="flex space-x-4 items-center mb-2">
//               <input
//                 type="text"
//                 className="input input-bordered w-1/2"
//                 placeholder="Source"
//                 value={term.source}
//                 onChange={(e) =>
//                   handleTermChange(index, "source", e.target.value)
//                 }
//                 required
//               />
//               <input
//                 type="text"
//                 className="input input-bordered w-1/2"
//                 placeholder="Cible"
//                 value={term.target}
//                 onChange={(e) =>
//                   handleTermChange(index, "target", e.target.value)
//                 }
//                 required
//               />
//               <button
//                 type="button"
//                 className="btn btn-error"
//                 onClick={() => removeTerm(index)}
//               >
//                 <Trash className="w-4 h-4" />
//               </button>
//             </div>
//           ))}
//           <button
//             type="button"
//             className="btn btn-secondary mt-2"
//             onClick={addTerm}
//           >
//             Ajouter un terme
//           </button>
//         </div>
//         <button type="submit" className="btn btn-primary">
//           {isEditMode ? "Enregistrer les modifications" : "Créer le glossaire"}
//         </button>
//       </form>
//     </div>
//   );
// }

// src/pages/AddEditGlossaryPage.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Trash } from "lucide-react";
import Papa from "papaparse";

export default function AddEditGlossaryPage() {
  const [name, setName] = useState("");
  const [terms, setTerms] = useState([{ source: "", target: "" }]);
  const [sourceLanguage, setSourceLanguage] = useState("français");
  const [targetLanguage, setTargetLanguage] = useState("anglais");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  const token = localStorage.getItem("token");
  const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

  useEffect(() => {
    if (isEditMode) {
      // Récupérer les données du glossaire à modifier
      const fetchGlossary = async () => {
        try {
          const response = await fetch(`${apiUrl}/api/glossaries/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await response.json();

          if (response.ok) {
            setName(data.name);
            setTerms(data.terms);
            setSourceLanguage(data.sourceLanguage);
            setTargetLanguage(data.targetLanguage);
          } else {
            setError(
              data.message || "Erreur lors de la récupération du glossaire"
            );
          }
        } catch (err) {
          setError("Erreur du serveur");
        }
      };

      fetchGlossary();
    }
  }, [id, isEditMode, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const glossaryData = {
      name,
      terms,
      sourceLanguage,
      targetLanguage,
    };

    try {
      const response = await fetch(
        `${apiUrl}/api/glossaries${isEditMode ? `/${id}` : ""}`,
        {
          method: isEditMode ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(glossaryData),
        }
      );
      const data = await response.json();

      if (response.ok) {
        navigate("/glossaries");
      } else {
        setError(
          data.message || "Erreur lors de l'enregistrement du glossaire"
        );
      }
    } catch (err) {
      setError("Erreur du serveur");
    }
  };

  const handleTermChange = (index, field, value) => {
    const newTerms = [...terms];
    newTerms[index][field] = value;
    setTerms(newTerms);
  };

  const addTerm = () => {
    setTerms([...terms, { source: "", target: "" }]);
  };

  const removeTerm = (index) => {
    const newTerms = terms.filter((_, i) => i !== index);
    setTerms(newTerms);
  };

  // Fonction pour gérer le téléchargement du fichier
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.name.split(".").pop().toLowerCase();
      const reader = new FileReader();

      reader.onload = (event) => {
        const content = event.target.result;
        switch (fileType) {
          case "json":
            parseJSONFile(content);
            break;
          case "csv":
            parseCSVFile(content);
            break;
          case "tmx":
            parseTMXFile(content);
            break;
          default:
            alert("Type de fichier non supporté.");
        }
      };

      reader.readAsText(file);
    }
  };

  // Parser un fichier JSON
  const parseJSONFile = (content) => {
    try {
      const jsonData = JSON.parse(content);
      if (Array.isArray(jsonData)) {
        setTerms(jsonData);
      } else {
        alert("Le fichier JSON doit être un tableau de termes.");
      }
    } catch (error) {
      alert("Erreur lors du parsing du fichier JSON.");
    }
  };

  // Parser un fichier CSV
  const parseCSVFile = (content) => {
    Papa.parse(content, {
      header: true,
      complete: (results) => {
        const parsedTerms = results.data.map((row) => ({
          source: row.source || "",
          target: row.target || "",
        }));
        setTerms(parsedTerms);
      },
      error: (error) => {
        alert("Erreur lors du parsing du fichier CSV.");
      },
    });
  };

  // Parser un fichier TMX
  const parseTMXFile = (content) => {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(content, "text/xml");
      const tus = xmlDoc.getElementsByTagName("tu");
      const parsedTerms = [];

      for (let i = 0; i < tus.length; i++) {
        const tu = tus[i];
        const tuvElements = tu.getElementsByTagName("tuv");

        let sourceTerm = "";
        let targetTerm = "";

        for (let j = 0; j < tuvElements.length; j++) {
          const tuv = tuvElements[j];
          const lang = tuv.getAttribute("xml:lang") || tuv.getAttribute("lang");
          const seg = tuv.getElementsByTagName("seg")[0]?.textContent || "";

          if (lang === sourceLanguage) {
            sourceTerm = seg;
          } else if (lang === targetLanguage) {
            targetTerm = seg;
          }
        }

        if (sourceTerm && targetTerm) {
          parsedTerms.push({ source: sourceTerm, target: targetTerm });
        }
      }

      setTerms(parsedTerms);
    } catch (error) {
      alert("Erreur lors du parsing du fichier TMX.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {isEditMode ? "Modifier le Glossaire" : "Ajouter un Glossaire"}
      </h1>
      {error && <div className="alert alert-error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-control mb-4">
          <label className="label">Nom du glossaire</label>
          <input
            type="text"
            className="input input-bordered"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="flex space-x-4 mb-4">
          <div className="form-control w-1/2">
            <label className="label">Langue source</label>
            <select
              className="select select-bordered"
              value={sourceLanguage}
              onChange={(e) => setSourceLanguage(e.target.value)}
              required
            >
              <option value="français">Français</option>
              <option value="anglais">Anglais</option>
              <option value="portugais">Portugais</option>
              {/* Ajouter d'autres langues avec leurs codes */}
            </select>
          </div>
          <div className="form-control w-1/2">
            <label className="label">Langue cible</label>
            <select
              className="select select-bordered"
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
              required
            >
              <option value="anglais">Anglais</option>
              <option value="français">Français</option>
              <option value="portugais">Portugais</option>
              {/* Ajouter d'autres langues avec leurs codes */}
            </select>
          </div>
        </div>

        {/* Champ de téléchargement de fichier */}
        <div className="form-control mb-4">
          <label className="label">Importer un fichier (TMX, CSV, JSON)</label>
          <input
            type="file"
            accept=".csv, .json, .tmx"
            onChange={handleFileUpload}
          />
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-bold">Termes</h2>
          {terms.map((term, index) => (
            <div key={index} className="flex space-x-4 items-center mb-2">
              <input
                type="text"
                className="input input-bordered w-1/2"
                placeholder="Source"
                value={term.source}
                onChange={(e) =>
                  handleTermChange(index, "source", e.target.value)
                }
                required
              />
              <input
                type="text"
                className="input input-bordered w-1/2"
                placeholder="Cible"
                value={term.target}
                onChange={(e) =>
                  handleTermChange(index, "target", e.target.value)
                }
                required
              />
              <button
                type="button"
                className="btn btn-error"
                onClick={() => removeTerm(index)}
              >
                <Trash className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary mt-2"
            onClick={addTerm}
          >
            Ajouter un terme
          </button>
        </div>
        <button type="submit" className="btn btn-primary">
          {isEditMode ? "Enregistrer les modifications" : "Créer le glossaire"}
        </button>
      </form>
    </div>
  );
}
