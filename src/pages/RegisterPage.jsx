// src/pages/RegisterPage.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        navigate("/login");
      } else {
        setError(data.message || "Erreur lors de l'inscription");
      }
    } catch (err) {
      setError("Erreur du serveur");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="card w-96 bg-base-100 shadow-md">
        <form className="card-body" onSubmit={handleRegister}>
          <h2 className="card-title">Inscription</h2>
          {error && <div className="alert alert-error">{error}</div>}
          <input
            type="text"
            className="input input-bordered w-full mb-2"
            placeholder="Nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            className="input input-bordered w-full mb-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="input input-bordered w-full mb-4"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="btn btn-primary w-full" type="submit">
            S'inscrire
          </button>
          <p className="mt-2 text-sm">
            Déjà un compte ?{" "}
            <Link to="/login" className="text-primary">
              Se connecter
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
