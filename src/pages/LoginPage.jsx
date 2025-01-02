// // src/pages/LoginPage.jsx
// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const [error, setError] = useState("");
//   const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(`${apiUrl}/api/auth/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await response.json();

//       if (response.ok) {
//         const token = data.token;
//         localStorage.setItem("token", token);
//         navigate("/translate");
//       } else {
//         setError(data.message || "Erreur lors de la connexion");
//       }
//     } catch (err) {
//       setError("Erreur du serveur");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <div className="card w-96 bg-base-100 shadow-md">
//         <form className="card-body" onSubmit={handleLogin}>
//           <h2 className="card-title">Connexion</h2>
//           {error && <div className="alert alert-error">{error}</div>}
//           <input
//             type="email"
//             className="input input-bordered w-full mb-2"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             className="input input-bordered w-full mb-4"
//             placeholder="Mot de passe"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button className="btn btn-primary w-full" type="submit">
//             Se connecter
//           </button>
//           <p className="mt-2 text-sm">
//             Pas de compte ?{" "}
//             <Link to="/register" className="text-primary">
//               S'inscrire
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        const token = data.token;
        localStorage.setItem("token", token);
        navigate("/translate");
      } else {
        setError(data.message || "Erreur lors de la connexion");
      }
    } catch (err) {
      setError("Erreur du serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="card w-96 bg-base-100 shadow-md">
        <form className="card-body" onSubmit={handleLogin}>
          <h2 className="card-title">Connexion</h2>
          {error && <div className="alert alert-error">{error}</div>}
          <input
            type="email"
            className="input input-bordered w-full mb-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />
          <input
            type="password"
            className="input input-bordered w-full mb-4"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
          />
          <button
            className="btn btn-primary w-full"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Connexion en cours...
              </>
            ) : (
              "Se connecter"
            )}
          </button>
          <p className="mt-2 text-sm">
            Pas de compte ?{" "}
            <Link
              to="/register"
              className="text-primary"
              tabIndex={loading ? -1 : 0}
            >
              S'inscrire
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
