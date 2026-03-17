

// import { useNavigate } from "react-router-dom";
// import { Bot, Book, Stars, Coins, Check } from "lucide-react";

// const SUBSCRIPTION_PLANS = {
//   free: {
//     name: "Free",
//     price: "0€",
//     features: [
//       "Basique (Chat + Dictionnaire)",
//       "Limitation sur la longueur",
//       "Publicités ou watermark",
//       "Support forum ou email (48h+)",
//     ],
//     limits: {
//       translations: 50,
//       characters: 50000,
//       glossaries: 1,
//     },
//     availableModels: ["gemini"],
//   },
//   starter: {
//     name: "Starter",
//     price: "8000 FCFA",
//     features: [
//       "Chat + Traduction + Correction",
//       "Longueur raisonnable",
//       "Stats simples",
//       "Support email standard (24-48h)",
//     ],
//     limits: {
//       translations: 300,
//       characters: 300000,
//       glossaries: 5,
//     },
//     availableModels: ["gemini", "gpt"],
//   },
//   pro: {
//     name: "Pro",
//     price: "25000 FCFA",
//     features: [
//       "Toutes les fonctionnalités",
//       "Priorité de réponse",
//       "Rapports avancés",
//       "Support prioritaire (sous 4h)",
//     ],
//     limits: {
//       translations: 1000,
//       characters: 1000000,
//       glossaries: 20,
//     },
//     availableModels: ["gemini", "gpt", "claude"],
//   },
//   enterprise: {
//     name: "Enterprise",
//     price: "Sur devis",
//     features: [
//       "Accès illimité",
//       "SLA + Contrat spécifique",
//       "Personnalisation complète",
//       "Support dédié (ligne directe)",
//     ],
//     limits: {
//       translations: Infinity,
//       characters: Infinity,
//       glossaries: Infinity,
//     },
//     availableModels: ["gemini", "gpt", "claude"],
//   },
// };

// export default function HomePage() {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200">
//       {/* Hero Section */}
//       <section className="hero min-h-[60vh] bg-base-200 px-4">
//         <div className="hero-content text-center p-0">
//           <div className="max-w-3xl w-full">
//             <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent px-2">
//               Traduction Intelligente avec IA
//             </h1>
//             <p className="text-lg md:text-xl mb-6 md:mb-8 px-2">
//               Une plateforme révolutionnaire qui combine les meilleurs modèles
//               d'IA (GPT, Claude, Gemini) avec une gestion avancée de glossaires
//               pour des traductions précises et cohérentes.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full px-4">
//               <button
//                 className="btn btn-primary w-full sm:w-auto px-8"
//                 onClick={() => navigate("/register")}
//               >
//                 Commencer Gratuitement
//               </button>
//               <button
//                 className="btn btn-outline w-full sm:w-auto px-8"
//                 onClick={() => navigate("/login")}
//               >
//                 Se Connecter
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Fonctionnalités */}
//       <section className="py-16 px-4 bg-base-200">
//         <div className="container mx-auto max-w-6xl">
//           <h2 className="text-3xl font-bold text-center mb-12">
//             Nos Fonctionnalités
//           </h2>
//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="card bg-base-100 shadow-xl">
//               <div className="card-body items-center text-center">
//                 <Bot className="w-12 h-12 text-primary mb-4" />
//                 <h3 className="card-title">Modèles IA Avancés</h3>
//                 <p>
//                   Accès aux meilleurs modèles : GPT, Claude, et Gemini pour des
//                   traductions de qualité supérieure
//                 </p>
//               </div>
//             </div>
//             <div className="card bg-base-100 shadow-xl">
//               <div className="card-body items-center text-center">
//                 <Book className="w-12 h-12 text-primary mb-4" />
//                 <h3 className="card-title">Gestion de Glossaires</h3>
//                 <p>
//                   Créez et gérez vos glossaires personnalisés pour maintenir une
//                   terminologie cohérente
//                 </p>
//               </div>
//             </div>
//             <div className="card bg-base-100 shadow-xl">
//               <div className="card-body items-center text-center">
//                 <Stars className="w-12 h-12 text-primary mb-4" />
//                 <h3 className="card-title">Statistiques Détaillées</h3>
//                 <p>
//                   Suivez votre utilisation et optimisez vos traductions avec des
//                   rapports détaillés
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Plans et Tarifs */}
//       <section className="py-16 px-4">
//         <div className="container mx-auto max-w-6xl">
//           <h2 className="text-3xl font-bold text-center mb-12">Nos Plans</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {Object.entries(SUBSCRIPTION_PLANS).map(([planId, plan]) => (
//               <div
//                 key={planId}
//                 className={`card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 ${
//                   planId === "pro" ? "border-2 border-primary" : ""
//                 }`}
//               >
//                 <div className="card-body">
//                   <h3 className="card-title text-xl mb-4">{plan.name}</h3>
//                   <p className="text-3xl font-bold mb-4">{plan.price}</p>

//                   <div className="text-sm text-base-content/70 mb-4">
//                     <p>{plan.limits.translations} traductions/mois</p>
//                     <p>
//                       {plan.limits.characters.toLocaleString()} caractères/mois
//                     </p>
//                     <p>{plan.limits.glossaries} glossaires</p>
//                   </div>

//                   <ul className="space-y-2 mb-6">
//                     {plan.features.map((feature, index) => (
//                       <li key={index} className="flex items-center gap-2">
//                         <Check className="w-4 h-4 text-success flex-shrink-0" />
//                         <span className="text-sm">{feature}</span>
//                       </li>
//                     ))}
//                   </ul>

//                   <div className="text-sm mb-4">
//                     <p className="font-semibold mb-2">Modèles disponibles :</p>
//                     <div className="flex flex-wrap gap-2">
//                       {plan.availableModels.map((model) => (
//                         <span key={model} className="badge badge-outline">
//                           {model}
//                         </span>
//                       ))}
//                     </div>
//                   </div>

//                   <button
//                     className={`btn ${
//                       planId === "enterprise"
//                         ? "btn-outline"
//                         : planId === "pro"
//                         ? "btn-primary"
//                         : "btn-ghost"
//                     } w-full mt-4`}
//                     onClick={() =>
//                       planId === "enterprise"
//                         ? (window.location.href =
//                             "mailto:contact@traduction.com")
//                         : navigate("/register")
//                     }
//                   >
//                     {planId === "enterprise" ? "Contactez-nous" : "Commencer"}
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Final */}
//       <section className="py-16 px-4 bg-base-200">
//         <div className="container mx-auto max-w-3xl text-center">
//           <h2 className="text-3xl font-bold mb-8">Prêt à Commencer ?</h2>
//           <p className="text-xl mb-8">
//             Rejoignez les milliers d'utilisateurs qui font confiance à notre
//             plateforme pour leurs besoins de traduction.
//           </p>
//           <button
//             className="btn btn-primary btn-lg"
//             onClick={() => navigate("/register")}
//           >
//             Créer un Compte Gratuit
//           </button>
//         </div>
//       </section>
//     </div>
//   );
// }


// src/pages/HomePage.jsx
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo1.png";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Source+Sans+3:wght@300;400;600&display=swap');
  .eco-root { --eco-green: #008751; --eco-red: #CE1126; --eco-gold: #C8A951; --eco-dark: #1a2e1a; --eco-light: #f5f8f4; font-family: 'Source Sans 3', sans-serif; }

  /* HERO */
  .eco-hero { background: var(--eco-dark); position: relative; overflow: hidden; padding: 5rem 2rem 6rem; text-align: center; }
  .eco-hero-bg { position: absolute; inset: 0; opacity: 0.04; background-image: repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%); background-size: 20px 20px; }
  .eco-hero-accent-left { position: absolute; left: 0; top: 0; bottom: 0; width: 5px; background: var(--eco-green); }
  .eco-hero-accent-right { position: absolute; right: 0; top: 0; bottom: 0; width: 5px; background: var(--eco-red); }
  .eco-hero-logo { margin: 0 auto 1.5rem; display: block; height: 80px; width: auto; filter: brightness(0) invert(1); opacity: 0.9; }
  .eco-hero-badge { display: inline-block; background: rgba(206,17,38,0.15); border: 1px solid rgba(206,17,38,0.4); color: #f4879a; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; padding: 6px 16px; border-radius: 2px; margin-bottom: 1.5rem; }
  .eco-hero h1 { font-family: 'Playfair Display', serif; color: #fff; font-size: clamp(30px, 5vw, 52px); font-weight: 700; line-height: 1.15; margin: 0 auto 1rem; max-width: 750px; }
  .eco-hero h1 span.green { color: #4dd4a0; }
  .eco-hero h1 span.red { color: #f4879a; }
  .eco-hero p { color: rgba(255,255,255,0.65); font-size: 16px; max-width: 580px; margin: 0 auto 2.5rem; line-height: 1.7; font-weight: 300; }
  .eco-hero-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
  .eco-btn-green { background: var(--eco-green); color: #fff; border: none; padding: 13px 30px; font-family: 'Source Sans 3', sans-serif; font-size: 14px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; cursor: pointer; border-radius: 2px; transition: background 0.2s; }
  .eco-btn-green:hover { background: #00a863; }
  .eco-btn-red { background: var(--eco-red); color: #fff; border: none; padding: 13px 30px; font-family: 'Source Sans 3', sans-serif; font-size: 14px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; cursor: pointer; border-radius: 2px; transition: background 0.2s; }
  .eco-btn-red:hover { background: #a50e1e; }
  .eco-flag { display: flex; gap: 5px; justify-content: center; margin-top: 3.5rem; }
  .eco-flag-star { width: 9px; height: 9px; background: var(--eco-gold); clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%); }

  /* LANGS */
  .eco-langs { background: var(--eco-red); padding: 10px 2rem; display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap; }
  .eco-langs span { color: rgba(255,255,255,0.85); font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase; }
  .eco-langs span strong { color: #fff; font-weight: 600; }

  /* FEATURES */
  .eco-section { padding: 4rem 2rem; max-width: 1100px; margin: 0 auto; }
  .eco-section-title { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; color: var(--eco-dark); margin-bottom: 0.5rem; }
  .eco-section-line { width: 48px; height: 3px; margin-bottom: 2rem; }
  .eco-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; }
  .eco-card { background: #fff; border: 0.5px solid #e0dada; border-radius: 4px; padding: 1.75rem; border-top: 3px solid var(--eco-green); }
  .eco-card.red { border-top-color: var(--eco-red); }
  .eco-card.gold { border-top-color: var(--eco-gold); }
  .eco-card.dark { border-top-color: var(--eco-dark); }
  .eco-card-icon { width: 46px; height: 46px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem; }
  .eco-card h3 { font-family: 'Playfair Display', serif; font-size: 17px; font-weight: 600; color: var(--eco-dark); margin-bottom: 0.5rem; }
  .eco-card p { font-size: 14px; color: #4a5a4a; line-height: 1.65; margin: 0; }

  /* HOW */
  .eco-how { background: var(--eco-dark); padding: 4rem 2rem; border-top: 3px solid var(--eco-red); }
  .eco-how-inner { max-width: 900px; margin: 0 auto; }
  .eco-how h2 { font-family: 'Playfair Display', serif; color: #fff; font-size: 28px; margin-bottom: 0.5rem; }
  .eco-how-line { width: 48px; height: 3px; background: var(--eco-red); margin-bottom: 2.5rem; }
  .eco-steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1.5rem; }
  .eco-step { text-align: center; }
  .eco-step-num { width: 48px; height: 48px; border-radius: 50%; border: 2px solid var(--eco-red); display: flex; align-items: center; justify-content: center; font-family: 'Playfair Display', serif; font-size: 20px; color: #f4879a; margin: 0 auto 1rem; }
  .eco-step h4 { color: #fff; font-size: 15px; font-weight: 600; margin-bottom: 0.4rem; }
  .eco-step p { color: rgba(255,255,255,0.5); font-size: 13px; line-height: 1.5; margin: 0; }

  /* STATS */
  .eco-stats { padding: 3rem 2rem; background: linear-gradient(135deg, var(--eco-dark) 0%, #0f3020 50%, #2a0a10 100%); }
  .eco-stats-inner { max-width: 900px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 2rem; text-align: center; }
  .eco-stat-num { font-family: 'Playfair Display', serif; font-size: 44px; font-weight: 700; }
  .eco-stat-num.green { color: #4dd4a0; }
  .eco-stat-num.red { color: #f4879a; }
  .eco-stat-num.gold { color: var(--eco-gold); }
  .eco-stat-num.white { color: #fff; }
  .eco-stat-label { color: rgba(255,255,255,0.6); font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin-top: 4px; }

  /* CTA */
  .eco-cta { background: var(--eco-light); padding: 4rem 2rem; text-align: center; border-top: 4px solid var(--eco-red); border-bottom: 4px solid var(--eco-green); }

  /* FOOTER */
  .eco-footer { background: #0f1f0f; padding: 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; padding: 1.25rem 2rem; border-top: 3px solid rgba(206,17,38,0.3); }
  .eco-footer p { color: rgba(255,255,255,0.3); font-size: 12px; letter-spacing: 1px; margin: 0; }
  .eco-footer-flags { display: flex; gap: 3px; }
  .eco-footer-flag-g { width: 18px; height: 10px; background: var(--eco-green); border-radius: 1px 0 0 1px; }
  .eco-footer-flag-w { width: 18px; height: 10px; background: #fff; }
  .eco-footer-flag-r { width: 18px; height: 10px; background: var(--eco-red); border-radius: 0 1px 1px 0; }
`;

const LANGUAGES = [
  ["EN","English"],["FR","Français"],["PT","Português"],
  ["AR","العربية"],["WO","Wolof"],["HA","Hausa"],["SW","Kiswahili"],
];
const STEPS = [
  { num:"1", title:"Créer un compte", desc:"Inscrivez-vous en tant que traducteur accrédité CEDEAO" },
  { num:"2", title:"Consulter le glossaire", desc:"Accédez aux 44 000+ termes validés dans 8 langues" },
  { num:"3", title:"Traduire avec l'IA", desc:"Choisissez votre modèle et traduisez avec précision terminologique" },
  { num:"4", title:"Contribuer", desc:"Soumettez de nouveaux termes pour enrichir la base collective" },
];
const STATS = [
  { num:"15", label:"États membres", cls:"green" },
  { num:"8",  label:"Langues de travail", cls:"red" },
  { num:"44k+", label:"Termes validés", cls:"gold" },
  { num:"4",  label:"Moteurs IA", cls:"white" },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="eco-root">
      <style>{styles}</style>

      {/* Hero */}
      <section className="eco-hero">
        <div className="eco-hero-bg" />
        <div className="eco-hero-accent-left" />
        <div className="eco-hero-accent-right" />
        <img src={logo} alt="CEDEAO ECOWAS" className="eco-hero-logo" />
        <div className="eco-hero-badge">Plateforme Officielle des Traducteurs CEDEAO</div>
        <h1>
          La Terminologie au Service de<br />
          <span className="green">l'Intégration</span> <span className="red">Régionale</span>
        </h1>
        <p>
          Outil de référence des traducteurs et interprètes accrédités de la CEDEAO.
          Consultez les glossaires institutionnels, traduisez avec l'IA et contribuez
          à l'harmonisation linguistique de l'Afrique de l'Ouest.
        </p>
        <div className="eco-hero-btns">
          <button className="eco-btn-green" onClick={() => navigate("/translate")}>Accéder au Glossaire</button>
          <button className="eco-btn-red" onClick={() => navigate("/register")}>Créer mon Compte</button>
        </div>
        <div className="eco-flag">
          {Array.from({ length: 15 }).map((_, i) => <div key={i} className="eco-flag-star" />)}
        </div>
      </section>

      {/* Langues — bande rouge */}
      <div className="eco-langs">
        {LANGUAGES.map(([code, label]) => (
          <span key={code}><strong>{code}</strong> {label}</span>
        ))}
      </div>

      {/* Fonctionnalités */}
      <div style={{ background: "var(--eco-light)" }}>
        <div className="eco-section">
          <p className="eco-section-title">Fonctionnalités</p>
          <div className="eco-section-line" style={{ background: "var(--eco-red)" }} />
          <div className="eco-cards">

            <div className="eco-card">
              <div className="eco-card-icon" style={{ background: "#e8f5ef" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#008751" strokeWidth="2">
                  <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
                </svg>
              </div>
              <h3>Glossaires Institutionnels</h3>
              <p>Termes officiels validés par les institutions CEDEAO dans toutes les langues de travail.</p>
            </div>

            <div className="eco-card red">
              <div className="eco-card-icon" style={{ background: "#fdeaec" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#CE1126" strokeWidth="2">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                </svg>
              </div>
              <h3>Traduction Assistée par IA</h3>
              <p>GPT, Claude, Gemini et DeepSeek avec respect automatique de la terminologie officielle.</p>
            </div>

            <div className="eco-card gold">
              <div className="eco-card-icon" style={{ background: "#fdf6e3" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C8A951" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              </div>
              <h3>Contribution Terminologique</h3>
              <p>Proposez de nouveaux termes et participez à la validation collective des bases de données.</p>
            </div>

            <div className="eco-card dark">
              <div className="eco-card-icon" style={{ background: "#e8ede8" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a2e1a" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
                </svg>
              </div>
              <h3>Réseau de Traducteurs</h3>
              <p>Collaborez avec les traducteurs accrédités des 15 États membres dans un espace partagé.</p>
            </div>

          </div>
        </div>
      </div>

      {/* Comment ça fonctionne — accent rouge */}
      <div className="eco-how">
        <div className="eco-how-inner">
          <h2>Comment ça fonctionne</h2>
          <div className="eco-how-line" />
          <div className="eco-steps">
            {STEPS.map((step) => (
              <div className="eco-step" key={step.num}>
                <div className="eco-step-num">{step.num}</div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats — dégradé vert/rouge */}
      <div className="eco-stats">
        <div className="eco-stats-inner">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className={`eco-stat-num ${s.cls}`}>{s.num}</div>
              <div className="eco-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="eco-cta">
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "26px", color: "var(--eco-dark)", marginBottom: "1rem" }}>
            Rejoignez le réseau des traducteurs CEDEAO
          </p>
          <p style={{ color: "#4a5a4a", fontSize: "15px", marginBottom: "2rem", lineHeight: "1.6" }}>
            Une plateforme réservée aux professionnels de la traduction et de la terminologie des institutions de l'Afrique de l'Ouest.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <button className="eco-btn-green" onClick={() => navigate("/translate")}>Accéder au Glossaire</button>
            <button className="eco-btn-red" onClick={() => navigate("/register")}>Créer mon Compte</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="eco-footer">
        <p>© 2025 ECOWAS / CEDEAO — EcoTerm — Plateforme Terminologique Régionale</p>
        <div className="eco-footer-flags">
          <div className="eco-footer-flag-g" />
          <div className="eco-footer-flag-w" />
          <div className="eco-footer-flag-r" />
        </div>
      </footer>
    </div>
  );
}