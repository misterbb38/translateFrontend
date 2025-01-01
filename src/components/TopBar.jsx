// src/components/TopBar.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Crown } from "lucide-react";
export default function TopBar() {
  const [subscription, setSubscription] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    if (token) {
      const fetchSubscriptionStatus = async () => {
        try {
          const response = await fetch(`${apiUrl}/api/subscriptions/status`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await response.json();
          if (response.ok) {
            setSubscription(data);
          }
        } catch (error) {
          console.error("Erreur lors de la récupération du statut:", error);
        }
      };

      fetchSubscriptionStatus();
    }
  }, [token]);

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
            {token && subscription && (
              <div className="flex items-center">
                <Link
                  to="/subscriptions"
                  className={`btn btn-ghost btn-sm gap-2 ${
                    subscription.plan !== "free" ? "text-primary" : ""
                  }`}
                >
                  <Crown className="w-4 h-4" />
                  {subscription.plan === "free" ? "Plan Gratuit" : "Premium"}
                </Link>
              </div>
            )}
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
      <label className="grid cursor-pointer place-items-center">
        <input
          type="checkbox"
          value="synthwave"
          className="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1"
        />
        <svg
          className="stroke-base-100 fill-base-100 col-start-1 row-start-1"
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
        </svg>
        <svg
          className="stroke-base-100 fill-base-100 col-start-2 row-start-1"
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </label>
      <div></div>
    </nav>
  );
}
