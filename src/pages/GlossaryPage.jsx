// // src/pages/GlossaryPage.jsx
// import { useState, useEffect } from "react";
// import GlossaryCard from "../components/GlossaryCard";
// import { Link } from "react-router-dom";

// export default function GlossaryPage() {
//   const [glossaries, setGlossaries] = useState([]);
//   const [error, setError] = useState("");
//   const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

//   const fetchGlossaries = async () => {
//     const token = localStorage.getItem("token");

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

//   useEffect(() => {
//     fetchGlossaries();
//   }, []);

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Mes Glossaires</h1>
//       {error && <div className="alert alert-error">{error}</div>}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {glossaries.map((glossary) => (
//           <GlossaryCard
//             key={glossary._id}
//             glossary={glossary}
//             onUpdate={fetchGlossaries}
//           />
//         ))}
//       </div>
//       <Link to="/glossaries/add" className="btn btn-primary mt-4">
//         Ajouter un Glossaire
//       </Link>
//     </div>
//   );
// }

// src/pages/GlossaryPage.jsx
import { useState, useEffect } from "react";
import GlossaryCard from "../components/GlossaryCard";
import { Link } from "react-router-dom";

export default function GlossaryPage() {
  const [glossaries, setGlossaries] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

  const fetchGlossaries = async () => {
    const token = localStorage.getItem("token");
    setIsLoading(true);

    try {
      const response = await fetch(`${apiUrl}/api/glossaries`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data); // Vérifier les données reçues

      if (response.ok) {
        // S'assurer que data est un tableau
        setGlossaries(Array.isArray(data) ? data : []);
      } else {
        setError(
          data.message || "Erreur lors de la récupération des glossaires"
        );
      }
    } catch (err) {
      setError("Erreur du serveur");
      setGlossaries([]); // Réinitialiser les glossaires en cas d'erreur
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGlossaries();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mes Glossaires</h1>

      {error && <div className="alert alert-error mb-4">{error}</div>}

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      ) : glossaries.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">Aucun glossaire trouvé</p>
          <Link to="/glossaries/add" className="btn btn-primary">
            Créer mon premier glossaire
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {glossaries.map((glossary) => (
              <GlossaryCard
                key={glossary._id}
                glossary={glossary}
                onUpdate={fetchGlossaries}
              />
            ))}
          </div>
          <Link to="/glossaries/add" className="btn btn-primary mt-4">
            Ajouter un Glossaire
          </Link>
        </>
      )}
    </div>
  );
}
