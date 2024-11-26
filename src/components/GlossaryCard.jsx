// src/components/GlossaryCard.jsx
import { Edit, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function GlossaryCard({ glossary, onUpdate }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleEdit = () => {
    navigate(`/glossaries/edit/${glossary._id}`);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Voulez-vous vraiment supprimer ce glossaire ?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/glossaries/${glossary._id}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.json();

        if (response.ok) {
          onUpdate();
        } else {
          alert(data.message || "Erreur lors de la suppression du glossaire");
        }
      } catch (err) {
        alert("Erreur du serveur");
      }
    }
  };

  return (
    <div className="card bg-base-100 shadow-md">
      <div className="card-body">
        <h2 className="card-title">{glossary.name}</h2>
        <p>
          {glossary.terms.length} termes • {glossary.sourceLanguage} ➔{" "}
          {glossary.targetLanguage}
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-sm btn-secondary" onClick={handleEdit}>
            <Edit className="w-4 h-4" /> Modifier
          </button>
          <button className="btn btn-sm btn-error" onClick={handleDelete}>
            <Trash className="w-4 h-4" /> Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
