// src/components/TopBar.jsx
import { Link, useNavigate } from "react-router-dom";

export default function TopBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-base-200 rounded-b-lg shadow-lg flex justify-center mb-4">
      <ul className="menu menu-horizontal p-2">
        <li>
          <Link to="/">Accueil</Link>
        </li>
        {token ? (
          <>
            <li>
              <Link to="/translate">Traduire</Link>
            </li>
            <li>
              <Link to="/glossaries">Glossaires</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Déconnexion</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Connexion</Link>
            </li>
            <li>
              <Link to="/register">Inscription</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
