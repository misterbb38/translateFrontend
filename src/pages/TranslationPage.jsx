

// src/pages/TranslationPage.jsx
import { useState, useEffect } from "react";
import { Copy, Lock, AlertTriangle } from "lucide-react";
import GlossaryList from "../components/GlossaryList";
import TranslationHistory from "../components/TranslationHistory";
import AddTermModal from "../components/AddTermModal";
import DefinitionPopup from "../components/DefinitionPopup";

// Configuration des plans et modèles disponibles
const PLAN_FEATURES = {
  free: {
    maxLength: 1000,
    availableModels: ["gemini"],
    showAds: true,
    watermark: true,
  },
  starter: {
    maxLength: 3000,
    // Ajout de "deepseek"
    availableModels: ["gemini", "gpt", "deepseek"],
    showAds: false,
    watermark: false,
  },
  pro: {
    maxLength: 10000,
    // Ajout de "deepseek"
    availableModels: ["gemini", "gpt", "claude", "deepseek"],
    showAds: false,
    watermark: false,
  },
  enterprise: {
    maxLength: Infinity,
    // Ajout de "deepseek"
    availableModels: ["gemini", "gpt", "claude", "deepseek"],
    showAds: false,
    watermark: false,
  },
};

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

  // Informations d'abonnement et d'usage
  const [subscription, setSubscription] = useState(null);
  const [usageStats, setUsageStats] = useState(null);

  // Gestion de la sélection de texte pour ajout au glossaire
  const [selectedSourceSnippet, setSelectedSourceSnippet] = useState("");
  const [selectedTargetSnippet, setSelectedTargetSnippet] = useState("");

  // Gestion de la définition contextuelle
  const [selectedWord, setSelectedWord] = useState(null);
  const [definitionPosition, setDefinitionPosition] = useState({ x: 0, y: 0 });

  const token = localStorage.getItem("token");
  const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

  // 1) Récupérer infos d'abonnement
  useEffect(() => {
    const fetchSubscriptionInfo = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/subscriptions/status`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();

        if (response.ok) {
          setSubscription(data);
          // Sélectionner par défaut le 1er modèle disponible pour ce plan
          setModel(PLAN_FEATURES[data.plan].availableModels[0]);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du statut:", error);
      }
    };

    fetchSubscriptionInfo();
  }, [token]);

  // 2) Récupérer la liste des glossaires pour ces langues
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

  // 3) Fonction pour traduire
  const handleTranslate = async () => {
    if (!sourceText) {
      setError("Veuillez entrer le texte à traduire");
      return;
    }

    // Vérifier l’abonnement et ses limites
    if (!subscription) {
      setError("Aucun abonnement actif");
      return;
    }

    const planConfig = PLAN_FEATURES[subscription.plan];

    // Vérifier la limite de caractères par traduction
    if (sourceText.length > planConfig.maxLength) {
      setError(
        `Votre plan est limité à ${planConfig.maxLength} caractères par traduction`
      );
      return;
    }

    // On peut vérifier usageStats si nécessaire (selon votre implémentation)
    // if (usageStats?.characters + sourceText.length > subscription.limits.characters) {
    //   setError("Vous avez atteint votre limite mensuelle de caractères");
    //   return;
    // }

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

  // 4) Gestion de la sélection de texte
  const getSelectedText = () => {
    if (window.getSelection) {
      return window.getSelection().toString();
    }
    return "";
  };

  // Ajouter le texte sélectionné (source) au glossaire
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

  // Ajouter le texte sélectionné (target) au glossaire
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

  // Détection du mot sélectionné pour afficher une définition contextuelle
  const handleTextSelect = (e) => {
    const selection = window.getSelection();
    const word = selection.toString().trim();

    // N'afficher la définition que si la sélection est un seul mot
    if (word.length > 0 && word.split(" ").length === 1) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      setSelectedWord(word);
      setDefinitionPosition({ x: rect.right + 10, y: rect.top });
    }
  };

  // Callback quand on a ajouté un terme
  const handleTermAdded = () => {
    console.log("Nouveau terme ajouté au glossaire !");
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Barre latérale : Glossaires */}
      <div className="p-4 bg-base-100 w-full md:w-1/4 md:sticky md:top-0">
        <GlossaryList
          glossaries={glossaries}
          selectedGlossaries={selectedGlossaries}
          setSelectedGlossaries={setSelectedGlossaries}
        />
      </div>

      {/* Zone principale */}
      <div className="flex flex-col flex-grow p-4">
        {error && <div className="alert alert-error">{error}</div>}

        {subscription && usageStats && subscription.limits && (
          <div className="alert alert-info mb-4">
            <AlertTriangle className="w-4 h-4" />
            <span>
              Utilisation : {usageStats.characters}/
              {subscription.limits.characters} caractères (
              {usageStats.translations}/{subscription.limits.translations}{" "}
              traductions)
            </span>
          </div>
        )}

        {/* Sélection du modèle */}
        {subscription && (
          <div className="mb-4">
            <label className="label">Modèle de traduction</label>
            <select
              className="select select-bordered w-full max-w-xs"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            >
              {PLAN_FEATURES[subscription.plan].availableModels.map((m) => (
                <option key={m} value={m}>
                  {
                    // Affichage du label propre
                    m === "gemini"
                      ? "Google Gemini"
                      : m === "claude"
                      ? "Anthropic Claude"
                      : m === "gpt"
                      ? "OpenAI GPT"
                      : "DeepSeek" // <-- Label quand c'est "deepseek"
                  }
                </option>
              ))}
            </select>

            {/* Indicateur si on n'a pas accès à claude, par exemple */}
            {!PLAN_FEATURES[subscription.plan].availableModels.includes(
              "claude"
            ) && (
              <div className="text-sm text-base-content/70 mt-1 flex items-center gap-1">
                <Lock size={12} />
                <span>
                  Modèles premium disponibles dans les plans supérieurs
                </span>
              </div>
            )}
          </div>
        )}

        {/* Zones texte source/target */}
        <div className="flex flex-col md:flex-row md:space-x-4">
          {/* Zone source */}
          <div className="flex flex-col w-full md:w-1/2">
            <select
              className="select select-bordered mb-2"
              value={sourceLanguage}
              onChange={(e) => setSourceLanguage(e.target.value)}
            >
              <option value="arabe">Arabe</option>
              <option value="anglais">Anglais</option>
              <option value="français">Français</option>
              <option value="portugais">Portugais</option>
              <option value="russe">Russe</option>
              <option value="spagnole">Spagnole</option>
              <option value="wolof">Wolof*</option>
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

          {/* Zone target */}
          <div className="flex flex-col w-full md:w-1/2 mt-4 md:mt-0">
            <select
              className="select select-bordered mb-2"
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
            >
              <option value="arabe">Arabe</option>
              <option value="anglais">Anglais</option>
              <option value="français">Français</option>
              <option value="portugais">Portugais</option>
              <option value="russe">Russe</option>
              <option value="spagnole">Spagnole</option>
              <option value="wolof">Wolof*</option>
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

        {/* Pop-up de définition si un seul mot est sélectionné */}
        {selectedWord && (
          <DefinitionPopup
            word={selectedWord}
            language={sourceLanguage}
            model={model}
            position={definitionPosition}
            onClose={() => setSelectedWord(null)}
          />
        )}

        {/* Indication du nombre de caractères utilisés */}
        {subscription && (
          <div className="text-sm text-base-content/70 mt-2">
            Limite de caractères : {sourceText.length}/
            {PLAN_FEATURES[subscription.plan].maxLength}
          </div>
        )}

        {/* Bouton pour lancer la traduction */}
        <button
          className={`btn btn-primary mt-4 ${isLoading ? "loading" : ""}`}
          onClick={handleTranslate}
          disabled={isLoading}
        >
          {isLoading ? "Traduction en cours..." : "Traduire"}
        </button>

        {/* Historique de traduction */}
        <TranslationHistory refreshTrigger={refreshTrigger} />

        {/* Modal pour l’ajout d’un nouveau terme au glossaire */}
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
