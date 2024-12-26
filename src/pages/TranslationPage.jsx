// src/pages/TranslationPage.jsx
import { useState, useEffect } from "react";
import { Copy } from "lucide-react";
import GlossaryList from "../components/GlossaryList";
import TranslationHistory from "../components/TranslationHistory";
import AddTermModal from "../components/AddTermModal";
import DefinitionPopup from "../components/DefinitionPopup";

export default function TranslationPage() {
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("français");
  const [targetLanguage, setTargetLanguage] = useState("anglais");
  const [model, setModel] = useState("gemini");
  const [glossaries, setGlossaries] = useState([]);
  const [selectedGlossaries, setSelectedGlossaries] = useState([]);
  const [history, setHistory] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAddTermModalOpen, setIsAddTermModalOpen] = useState(false);

  // Pour stocker le texte sélectionné
  const [selectedSourceSnippet, setSelectedSourceSnippet] = useState("");
  const [selectedTargetSnippet, setSelectedTargetSnippet] = useState("");

  const [selectedWord, setSelectedWord] = useState(null);
  const [definitionPosition, setDefinitionPosition] = useState({ x: 0, y: 0 });

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
          // Filtrer par langue, comme avant
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
          model,
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

  // Fonction utilitaire pour choper le texte sélectionné
  const getSelectedText = () => {
    if (window.getSelection) {
      return window.getSelection().toString();
    }
    return "";
  };

  // Appelé lorsque l'on clique sur "Ajouter au glossaire" (source)
  const handleAddSourceSelection = () => {
    const snippet = getSelectedText();
    if (snippet) {
      setSelectedSourceSnippet(snippet);
      setSelectedTargetSnippet("");
      setIsAddTermModalOpen(true);
    } else {
      alert("Veuillez sélectionner du texte dans la zone source.");
    }
  };
  const handleTextSelect = (e) => {
    const selection = window.getSelection();
    const word = selection.toString().trim();

    if (word.length > 0 && word.split(" ").length === 1) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      setSelectedWord(word);
      setDefinitionPosition({
        x: rect.right + 10,
        y: rect.top,
      });
    }
  };

  // Appelé lorsque l'on clique sur "Ajouter au glossaire" (target)
  const handleAddTargetSelection = () => {
    const snippet = getSelectedText();
    if (snippet) {
      setSelectedSourceSnippet("");
      setSelectedTargetSnippet(snippet);
      setIsAddTermModalOpen(true);
    } else {
      alert("Veuillez sélectionner du texte dans la zone de traduction.");
    }
  };

  // Callback quand on a ajouté ou créé un glossaire + term
  const handleTermAdded = () => {
    // On peut éventuellement refetch les glossaires
    // ou juste rafraîchir l’UI, etc.
    console.log("Nouveau terme ajouté !");
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Liste des glossaires à gauche */}
      <div className="p-4 bg-base-100 w-full md:w-1/4 md:sticky md:top-0">
        <GlossaryList
          glossaries={glossaries}
          selectedGlossaries={selectedGlossaries}
          setSelectedGlossaries={setSelectedGlossaries}
        />
      </div>

      <div className="flex flex-col flex-grow p-4">
        {error && <div className="alert alert-error">{error}</div>}
        {/* Modèle de traduction */}
        <div className="mb-4">
          <label className="label">Modèle de traduction</label>
          <select
            className="select select-bordered w-full max-w-xs"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          >
            <option value="gemini">Google Gemini</option>
            <option value="claude">Anthropic Claude</option>
            <option value="gpt">OpenAI GPT</option>
          </select>
        </div>
        {/* Zones texte source/target */}
        <div className="flex flex-col md:flex-row md:space-x-4">
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

            <div className="relative">
              <textarea
                className="textarea textarea-bordered min-h-[200px] w-full"
                placeholder="Entrez le texte à traduire"
                onMouseUp={handleTextSelect}
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-xs btn-accent absolute bottom-2 right-2"
                onClick={handleAddSourceSelection}
                title="Sélectionnez du texte, puis cliquez"
              >
                Ajouter au glossaire
              </button>
            </div>
          </div>

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
                onMouseUp={handleTextSelect}
                value={translatedText}
                readOnly
              />
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={() => navigator.clipboard.writeText(translatedText)}
              >
                <Copy className="w-5 h-5" />
              </button>
              <button
                type="button"
                className="btn btn-xs btn-accent absolute bottom-2 right-2"
                onClick={handleAddTargetSelection}
                title="Sélectionnez du texte, puis cliquez"
              >
                Ajouter au glossaire
              </button>
            </div>
          </div>
        </div>

        {selectedWord && (
          <DefinitionPopup
            word={selectedWord}
            language={sourceLanguage}
            model={model}
            position={definitionPosition}
            onClose={() => setSelectedWord(null)}
          />
        )}
        {/* Bouton Traduire */}
        <button
          className={`btn btn-primary mt-4 ${isLoading ? "loading" : ""}`}
          onClick={handleTranslate}
          disabled={isLoading}
        >
          {isLoading ? "Traduction en cours..." : "Traduire"}
        </button>
        {/* Historique */}
        <TranslationHistory refreshTrigger={refreshTrigger} />
        {/* Modal pour ajouter un terme */}
        <AddTermModal
          isOpen={isAddTermModalOpen}
          onClose={() => setIsAddTermModalOpen(false)}
          initialSource={selectedSourceSnippet}
          initialTarget={selectedTargetSnippet}
          onTermAdded={handleTermAdded}
        />
      </div>
    </div>
  );
}
