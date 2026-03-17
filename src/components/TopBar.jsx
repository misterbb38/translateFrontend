

// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Crown, HelpCircle } from "lucide-react";

// export default function TopBar() {
//   const [subscription, setSubscription] = useState(null);
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   useEffect(() => {
//     if (token) {
//       const fetchSubscriptionStatus = async () => {
//         try {
//           const response = await fetch(`${apiUrl}/api/subscriptions/status`, {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           const data = await response.json();
//           if (response.ok) {
//             setSubscription(data);
//           }
//         } catch (error) {
//           console.error("Erreur lors de la récupération du statut:", error);
//         }
//       };

//       fetchSubscriptionStatus();
//     }
//   }, [token]);

//   return (
//     <nav className="bg-base-200 rounded-b-lg shadow-lg flex justify-center mb-4">
//       <ul className="menu menu-horizontal p-2">
//         <li>
//           <Link to="/">Accueil</Link>
//         </li>
//         {token ? (
//           <>
//             <li>
//               <Link to="/translate">Traduire</Link>
//             </li>
//             <li>
//               <Link to="/glossaries">Glossaires</Link>
//             </li>
//             {token && subscription && (
//               <div className="flex items-center">
//                 <Link
//                   to="/subscriptions"
//                   className={`btn btn-ghost btn-sm gap-2 ${
//                     subscription.plan !== "free" ? "text-primary" : ""
//                   }`}
//                 >
//                   <Crown className="w-4 h-4" />
//                   {subscription.plan === "free" ? "Plan Gratuit" : "Premium"}
//                 </Link>
//               </div>
//             )}
//             <li>
//               <button onClick={handleLogout}>Déconnexion</button>
//             </li>
//           </>
//         ) : (
//           <>
//             <li>
//               <Link to="/login">Connexion</Link>
//             </li>
//             <li>
//               <Link to="/register">Inscription</Link>
//             </li>
//           </>
//         )}
//         {/* Ajout du lien Documentation */}
//         <li>
//           <Link to="/documentation" className="flex items-center gap-2">
//             <HelpCircle className="w-4 h-4" />
//             Documentation
//           </Link>
//         </li>
//       </ul>
//       <label className="grid cursor-pointer place-items-center">
//         <input
//           type="checkbox"
//           value="synthwave"
//           className="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1"
//         />
//         <svg
//           className="stroke-base-100 fill-base-100 col-start-1 row-start-1"
//           xmlns="http://www.w3.org/2000/svg"
//           width="14"
//           height="14"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <circle cx="12" cy="12" r="5" />
//           <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
//         </svg>
//         <svg
//           className="stroke-base-100 fill-base-100 col-start-2 row-start-1"
//           xmlns="http://www.w3.org/2000/svg"
//           width="14"
//           height="14"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
//         </svg>
//       </label>
//       <div></div>
//     </nav>
//   );
// }


// src/components/TopBar.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Crown } from "lucide-react";
import logo from "../assets/logo1.png";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Source+Sans+3:wght@300;400;600&display=swap');
  .eco-topbar { --eco-green: #008751; --eco-red: #CE1126; --eco-gold: #C8A951; --eco-dark: #1a2e1a; }
  .eco-topbar-nav {
    background: var(--eco-dark);
    padding: 0 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 68px;
    position: sticky;
    top: 0;
    z-index: 100;
    border-bottom: 1px solid rgba(206,17,38,0.3);
  }
  .eco-topbar-stripe {
    height: 5px;
    background: linear-gradient(90deg,
      var(--eco-green) 0%, var(--eco-green) 33%,
      #fff 33%, #fff 66%,
      var(--eco-red) 66%, var(--eco-red) 100%
    );
    position: sticky;
    top: 68px;
    z-index: 99;
  }
  .eco-topbar-logo { display: flex; align-items: center; gap: 12px; text-decoration: none; }
  .eco-topbar-logo img { height: 44px; width: auto; object-fit: contain; }
  .eco-topbar-logo-text { display: flex; flex-direction: column; }
  .eco-topbar-logo-title { font-family: 'Playfair Display', serif; color: #fff; font-size: 18px; font-weight: 600; letter-spacing: 0.5px; line-height: 1.2; }
  .eco-topbar-logo-sub { color: rgba(255,255,255,0.45); font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase; }
  .eco-topbar-sep { width: 1px; height: 32px; background: rgba(206,17,38,0.35); margin: 0 0.5rem; }
  .eco-topbar-links { display: flex; align-items: center; gap: 0.15rem; }
  .eco-topbar-link {
    color: rgba(255,255,255,0.7);
    font-family: 'Source Sans 3', sans-serif;
    font-size: 13px;
    text-decoration: none;
    letter-spacing: 0.3px;
    padding: 6px 13px;
    border-radius: 2px;
    transition: color 0.2s, background 0.2s;
    background: transparent;
    border: none;
    cursor: pointer;
  }
  .eco-topbar-link:hover { color: #fff; background: rgba(255,255,255,0.07); }
  .eco-topbar-divider { width: 1px; height: 20px; background: rgba(206,17,38,0.3); margin: 0 0.5rem; }
  .eco-topbar-btn-login {
    background: transparent;
    color: rgba(255,255,255,0.8);
    border: 1px solid rgba(206,17,38,0.45);
    padding: 7px 18px;
    font-family: 'Source Sans 3', sans-serif;
    font-size: 12px; font-weight: 600;
    letter-spacing: 1px; text-transform: uppercase;
    cursor: pointer; border-radius: 2px;
    transition: all 0.2s; text-decoration: none;
    display: flex; align-items: center;
  }
  .eco-topbar-btn-login:hover { border-color: var(--eco-red); color: #fff; background: rgba(206,17,38,0.12); }
  .eco-topbar-btn-register {
    background: var(--eco-red);
    color: #fff; border: none;
    padding: 7px 18px;
    font-family: 'Source Sans 3', sans-serif;
    font-size: 12px; font-weight: 600;
    letter-spacing: 1px; text-transform: uppercase;
    cursor: pointer; border-radius: 2px;
    transition: background 0.2s; text-decoration: none;
    display: flex; align-items: center;
    margin-left: 8px;
  }
  .eco-topbar-btn-register:hover { background: #a50e1e; }
  .eco-topbar-plan-badge {
    display: flex; align-items: center; gap: 6px;
    padding: 5px 12px; border-radius: 2px;
    font-family: 'Source Sans 3', sans-serif;
    font-size: 12px; font-weight: 600; letter-spacing: 0.5px;
    text-decoration: none; transition: all 0.2s;
  }
  .eco-topbar-plan-free { color: rgba(255,255,255,0.45); border: 1px solid rgba(255,255,255,0.12); }
  .eco-topbar-plan-free:hover { color: rgba(255,255,255,0.75); border-color: rgba(255,255,255,0.25); }
  .eco-topbar-plan-premium { color: var(--eco-gold); border: 1px solid rgba(200,169,81,0.35); }
  .eco-topbar-plan-premium:hover { background: rgba(200,169,81,0.1); }
  .eco-topbar-logout {
    color: rgba(255,255,255,0.4);
    font-family: 'Source Sans 3', sans-serif;
    font-size: 11px; letter-spacing: 1.2px; text-transform: uppercase;
    background: transparent; border: none; cursor: pointer;
    padding: 6px 10px; border-radius: 2px; transition: color 0.2s;
  }
  .eco-topbar-logout:hover { color: var(--eco-red); }

  @media (max-width: 768px) {
    .eco-topbar-nav { padding: 0 1rem; }
    .eco-topbar-logo-sub { display: none; }
    .eco-topbar-link { font-size: 12px; padding: 5px 8px; }
    .eco-topbar-sep { display: none; }
  }
`;

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
    if (!token) return;
    const fetchSubscription = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/subscriptions/status`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (response.ok) setSubscription(data);
      } catch (error) {
        console.error("Erreur lors de la récupération du statut:", error);
      }
    };
    fetchSubscription();
  }, [token, apiUrl]);

  const isPremium = subscription && subscription.plan !== "free";

  return (
    <>
      <style>{styles}</style>
      <nav className="eco-topbar eco-topbar-nav">

        {/* Logo */}
        <Link to="/" className="eco-topbar-logo">
          <img src={logo} alt="CEDEAO / ECOWAS" />
          <div className="eco-topbar-sep" />
          <div className="eco-topbar-logo-text">
            <span className="eco-topbar-logo-title">EcoTerm</span>
            <span className="eco-topbar-logo-sub">ECOWAS / CEDEAO</span>
          </div>
        </Link>

        {/* Liens */}
        <div className="eco-topbar-links">
          {token ? (
            <>
              <Link to="/translate" className="eco-topbar-link">Traduire</Link>
              <Link to="/glossaries" className="eco-topbar-link">Glossaires</Link>
              <Link to="/documentation" className="eco-topbar-link">Documentation</Link>
              <div className="eco-topbar-divider" />
              {subscription && (
                <Link
                  to="/subscriptions"
                  className={`eco-topbar-plan-badge ${isPremium ? "eco-topbar-plan-premium" : "eco-topbar-plan-free"}`}
                >
                  <Crown style={{ width: "13px", height: "13px" }} />
                  {isPremium
                    ? subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)
                    : "Plan Gratuit"}
                </Link>
              )}
              <div className="eco-topbar-divider" />
              <button className="eco-topbar-logout" onClick={handleLogout}>
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/documentation" className="eco-topbar-link">Documentation</Link>
              <div className="eco-topbar-divider" />
              <Link to="/login" className="eco-topbar-btn-login">Connexion</Link>
              <Link to="/register" className="eco-topbar-btn-register">Créer un compte</Link>
            </>
          )}
        </div>

      </nav>
      <div className="eco-topbar-stripe" />
    </>
  );
}