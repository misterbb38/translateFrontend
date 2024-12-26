// src/components/DefinitionPopup.jsx
import { useState, useEffect } from "react";
import { X, Book, Loader } from "lucide-react";

const DefinitionPopup = ({ word, language, model, position, onClose }) => {
  const [definition, setDefinition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMoving, setIsMoving] = useState(false);
  const [popupPosition, setPopupPosition] = useState(position);

  const token = localStorage.getItem("token");
  const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;
  useEffect(() => {
    const fetchDefinition = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/definitions/define`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ word, language, model }),
        });
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération");
        }
        const data = await response.json();
        setDefinition(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDefinition();
  }, [word, language, model, token, apiUrl]);

  // --- Gestions du drag (optionnel) ---
  const handleMouseDown = (e) => {
    if (e.target.closest(".popup-header")) {
      setIsMoving(true);
    }
  };

  const handleMouseMove = (e) => {
    if (isMoving) {
      setPopupPosition({
        x: e.clientX - 200,
        y: e.clientY - 20,
      });
    }
  };

  const handleMouseUp = () => {
    setIsMoving(false);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isMoving]);

  if (!word) return null; // Si pas de mot, on ne rend pas le popup

  return (
    <div
      className="fixed bg-base-100 rounded-lg shadow-xl w-96"
      style={{
        left: popupPosition.x,
        top: popupPosition.y,
        cursor: isMoving ? "grabbing" : "default",
        zIndex: 1000,
      }}
    >
      <div
        className="popup-header flex justify-between items-center p-3 bg-primary text-primary-content rounded-t-lg cursor-grab"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <Book size={20} />
          <h3 className="font-bold capitalize">{word}</h3>
        </div>
        <button onClick={onClose} className="hover:text-primary-content/80">
          <X size={20} />
        </button>
      </div>

      <div className="p-4">
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader className="animate-spin" size={24} />
          </div>
        ) : error ? (
          <div className="text-error text-center py-4">{error}</div>
        ) : (
          <div className="space-y-4">
            {definition?.definitions?.map((def, index) => (
              <div key={index} className="border-l-2 border-primary pl-3">
                <div className="text-sm text-primary font-medium">
                  {def.partOfSpeech}
                </div>
                <div className="mt-1">{def.meaning}</div>
                {def.examples?.length > 0 && (
                  <div className="mt-2 text-sm text-base-content/80">
                    <div className="font-medium">Exemples :</div>
                    <ul className="list-disc list-inside space-y-1 mt-1">
                      {def.examples.map((example, i) => (
                        <li key={i} className="italic">
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DefinitionPopup;
