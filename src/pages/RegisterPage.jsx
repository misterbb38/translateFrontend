// // src/pages/RegisterPage.jsx
// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";

// export default function RegisterPage() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const [error, setError] = useState("");
//   const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(`${apiUrl}/api/auth/register`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, password }),
//       });
//       const data = await response.json();

//       if (response.ok) {
//         navigate("/login");
//       } else {
//         setError(data.message || "Erreur lors de l'inscription");
//       }
//     } catch (err) {
//       setError("Erreur du serveur");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <div className="card w-96 bg-base-100 shadow-md">
//         <form className="card-body" onSubmit={handleRegister}>
//           <h2 className="card-title">Inscription</h2>
//           {error && <div className="alert alert-error">{error}</div>}
//           <input
//             type="text"
//             className="input input-bordered w-full mb-2"
//             placeholder="Nom"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
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
//             S'inscrire
//           </button>
//           <p className="mt-2 text-sm">
//             Déjà un compte ?{" "}
//             <Link to="/login" className="text-primary">
//               Se connecter
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { EyeIcon, EyeOffIcon, CheckCircle2, XCircle } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

  // Vérifier la force du mot de passe
  useEffect(() => {
    setPasswordChecks({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*]/.test(password),
    });
  }, [password]);

  // Vérifier si tous les critères sont remplis
  useEffect(() => {
    setIsPasswordValid(Object.values(passwordChecks).every((check) => check));
  }, [passwordChecks]);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!isPasswordValid) {
      setError("Veuillez respecter tous les critères du mot de passe");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/auth/register`, {
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

  const PasswordCheckItem = ({ isValid, text }) => (
    <div className="flex items-center gap-2">
      {isValid ? (
        <CheckCircle2 className="w-4 h-4 text-success" />
      ) : (
        <XCircle className="w-4 h-4 text-error" />
      )}
      <span className={isValid ? "text-success" : "text-error"}>{text}</span>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <form className="card-body" onSubmit={handleRegister}>
          <h2 className="card-title justify-center text-2xl mb-6">
            Inscription
          </h2>

          {error && (
            <div className="alert alert-error mb-4">
              <span>{error}</span>
            </div>
          )}

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Nom</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Mot de passe</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="w-5 h-5 text-base-content/70" />
                ) : (
                  <EyeIcon className="w-5 h-5 text-base-content/70" />
                )}
              </button>
            </div>
          </div>

          <div className="bg-base-200 p-4 rounded-lg mt-4">
            <h3 className="font-semibold mb-2">
              Le mot de passe doit contenir :
            </h3>
            <div className="space-y-2 text-sm">
              <PasswordCheckItem
                isValid={passwordChecks.length}
                text="Au moins 8 caractères"
              />
              <PasswordCheckItem
                isValid={passwordChecks.uppercase}
                text="Au moins une majuscule (A-Z)"
              />
              <PasswordCheckItem
                isValid={passwordChecks.lowercase}
                text="Au moins une minuscule (a-z)"
              />
              <PasswordCheckItem
                isValid={passwordChecks.number}
                text="Au moins un chiffre (0-9)"
              />
              <PasswordCheckItem
                isValid={passwordChecks.special}
                text="Au moins un caractère spécial (!@#$%^&*)"
              />
            </div>
          </div>

          <button
            className={`btn btn-primary w-full mt-6 ${
              !isPasswordValid ? "btn-disabled" : ""
            }`}
            type="submit"
            disabled={!isPasswordValid}
          >
            S'inscrire
          </button>

          <p className="text-center mt-4">
            Déjà un compte ?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Se connecter
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
