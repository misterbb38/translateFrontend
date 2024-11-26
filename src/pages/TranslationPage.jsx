// src/pages/TranslationPage.jsx
import { useState, useEffect } from "react";
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
  const [refreshTrigger, setRefreshTrigger] = useState(0); // Ajout du refreshTrigge
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

  // Récupérer les glossaires en fonction des langues sélectionnées
  useEffect(() => {
    const fetchGlossaries = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/glossaries`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();

        if (response.ok) {
          // Filtrer les glossaires en fonction des langues
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

    // if (selectedGlossaries.length === 0) {
    //   setError("Veuillez sélectionner au moins un glossaire");
    //   return;
    // }

    setError("");

    try {
      const response = await fetch(`${apiUrl}/api/translations/translate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          text: sourceText,
          glossaryId: selectedGlossaries[0], // Vous pouvez modifier pour supporter plusieurs glossaires
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
      } else {
        setError(data.message || "Erreur lors de la traduction");
      }
    } catch (err) {
      setError("Erreur du serveur");
    }
  };

  return (
    <div className="flex">
      {/* Liste des glossaires */}
      <GlossaryList
        glossaries={glossaries}
        selectedGlossaries={selectedGlossaries}
        setSelectedGlossaries={setSelectedGlossaries}
      />

      {/* Zone de traduction */}
      <div className="flex flex-col flex-grow p-4">
        {error && <div className="alert alert-error">{error}</div>}
        <div className="flex space-x-4">
          {/* Champ de texte source */}
          <div className="flex flex-col w-1/2">
            <select
              className="select select-bordered mb-2"
              value={sourceLanguage}
              onChange={(e) => setSourceLanguage(e.target.value)}
            >
              <option value="français">Français</option>
              <option value="anglais">Anglais</option>
              {/* Ajouter d'autres langues */}
            </select>
            <textarea
              className="textarea textarea-bordered h-full"
              placeholder="Entrez le texte à traduire"
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
            />
          </div>

          {/* Champ de texte traduit */}
          <div className="flex flex-col w-1/2">
            <select
              className="select select-bordered mb-2"
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
            >
              <option value="anglais">Anglais</option>
              <option value="français">Français</option>
              {/* Ajouter d'autres langues */}
            </select>
            <textarea
              className="textarea textarea-bordered h-full"
              placeholder="Traduction"
              value={translatedText}
              readOnly
            />
          </div>
        </div>

        {/* Bouton pour traduire */}
        <button className="btn btn-primary mt-4" onClick={handleTranslate}>
          Traduire
        </button>

        {/* Historique des traductions */}
        <TranslationHistory refreshTrigger={refreshTrigger} />
      </div>
    </div>
  );
}
