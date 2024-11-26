// src/pages/GlossaryPage.jsx
import { useState, useEffect } from "react";
import GlossaryCard from "../components/GlossaryCard";
import { Link } from "react-router-dom";

export default function GlossaryPage() {
  const [glossaries, setGlossaries] = useState([]);
  const [error, setError] = useState("");
  const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

  const fetchGlossaries = async () => {
    const token = localStorage.getItem("token");

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

  useEffect(() => {
    fetchGlossaries();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mes Glossaires</h1>
      {error && <div className="alert alert-error">{error}</div>}
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
    </div>
  );
}
