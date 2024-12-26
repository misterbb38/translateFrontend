// import { useNavigate } from "react-router-dom";
// import { Bot, Book, Stars, Coins } from "lucide-react";

// export default function HomePage() {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200">
//       {/* Hero Section */}
//       <section className="hero min-h-[60vh] bg-base-200">
//         <div className="hero-content text-center">
//           <div className="max-w-3xl">
//             <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
//               Traduction Intelligente avec IA
//             </h1>
//             <p className="text-xl mb-8">
//               Une plateforme révolutionnaire qui combine les meilleurs modèles
//               d'IA au monde avec une gestion avancée de glossaires pour des
//               traductions précises et cohérentes.
//             </p>
//             <div className="flex gap-4 justify-center">
//               <button
//                 className="btn btn-primary btn-lg"
//                 onClick={() => navigate("/register")}
//               >
//                 Commencer Gratuitement
//               </button>
//               <button
//                 className="btn btn-outline btn-lg"
//                 onClick={() => navigate("/login")}
//               >
//                 Se Connecter
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* À Propos */}
//       <section className="py-16 px-4">
//         <div className="container mx-auto max-w-6xl">
//           <h2 className="text-3xl font-bold text-center mb-12">À Propos</h2>
//           <div className="card bg-base-100 shadow-xl">
//             <div className="card-body">
//               <p className="text-lg">
//                 Notre plateforme innovante révolutionne la traduction en
//                 combinant les technologies d'IA les plus avancées (GPT-4,
//                 Claude, Gemini) avec une gestion intelligente des glossaires.
//                 Notre approche unique garantit non seulement des traductions
//                 précises, mais aussi le maintien de la cohérence terminologique
//                 essentielle pour les professionnels et les entreprises.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Notre Mission */}
//       <section className="py-16 px-4 bg-base-200">
//         <div className="container mx-auto max-w-6xl">
//           <h2 className="text-3xl font-bold text-center mb-12">
//             Notre Mission
//           </h2>
//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="card bg-base-100 shadow-xl">
//               <div className="card-body items-center text-center">
//                 <Bot className="w-12 h-12 text-primary mb-4" />
//                 <h3 className="card-title">Intelligence Artificielle</h3>
//                 <p>
//                   Exploiter les meilleurs modèles d'IA pour des traductions de
//                   qualité supérieure
//                 </p>
//               </div>
//             </div>
//             <div className="card bg-base-100 shadow-xl">
//               <div className="card-body items-center text-center">
//                 <Book className="w-12 h-12 text-primary mb-4" />
//                 <h3 className="card-title">Cohérence</h3>
//                 <p>
//                   Maintenir une terminologie cohérente grâce à notre système de
//                   glossaires intelligent
//                 </p>
//               </div>
//             </div>
//             <div className="card bg-base-100 shadow-xl">
//               <div className="card-body items-center text-center">
//                 <Stars className="w-12 h-12 text-primary mb-4" />
//                 <h3 className="card-title">Excellence</h3>
//                 <p>
//                   Fournir des traductions de la plus haute qualité pour tous vos
//                   besoins
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Services */}
//       <section className="py-16 px-4">
//         <div className="container mx-auto max-w-6xl">
//           <h2 className="text-3xl font-bold text-center mb-12">Nos Services</h2>
//           <div className="grid md:grid-cols-2 gap-8">
//             <div className="card bg-base-100 shadow-xl">
//               <div className="card-body">
//                 <h3 className="card-title">Traduction IA Multi-Modèles</h3>
//                 <ul className="list-disc list-inside space-y-2">
//                   <li>Accès à GPT-4, Claude et Gemini</li>
//                   <li>Sélection automatique du meilleur modèle</li>
//                   <li>Support multilingue avancé</li>
//                 </ul>
//               </div>
//             </div>
//             <div className="card bg-base-100 shadow-xl">
//               <div className="card-body">
//                 <h3 className="card-title">Gestion de Glossaires</h3>
//                 <ul className="list-disc list-inside space-y-2">
//                   <li>Création de glossaires personnalisés</li>
//                   <li>Application automatique des termes</li>
//                   <li>Maintenance de la cohérence terminologique</li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Tarifs */}
//       <section className="py-16 px-4 bg-base-200">
//         <div className="container mx-auto max-w-6xl">
//           <h2 className="text-3xl font-bold text-center mb-12">Nos Tarifs</h2>
//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="card bg-base-100 shadow-xl">
//               <div className="card-body items-center text-center">
//                 <h3 className="card-title">Gratuit</h3>
//                 <Coins className="w-12 h-12 text-primary my-4" />
//                 <ul className="space-y-2 mb-4">
//                   <li>500 mots par jour</li>
//                   <li>1 glossaire</li>
//                   <li>Modèle Gemini uniquement</li>
//                 </ul>
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => navigate("/register")}
//                 >
//                   Commencer
//                 </button>
//               </div>
//             </div>
//             <div className="card bg-primary text-primary-content shadow-xl">
//               <div className="card-body items-center text-center">
//                 <h3 className="card-title">Pro</h3>
//                 <Coins className="w-12 h-12 my-4" />
//                 <ul className="space-y-2 mb-4">
//                   <li>10,000 mots par jour</li>
//                   <li>Glossaires illimités</li>
//                   <li>Tous les modèles d'IA</li>
//                   <li>Support prioritaire</li>
//                 </ul>
//                 <p className="text-2xl font-bold mb-4">29€/mois</p>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => navigate("/register")}
//                 >
//                   Essai Gratuit
//                 </button>
//               </div>
//             </div>
//             <div className="card bg-base-100 shadow-xl">
//               <div className="card-body items-center text-center">
//                 <h3 className="card-title">Entreprise</h3>
//                 <Coins className="w-12 h-12 text-primary my-4" />
//                 <ul className="space-y-2 mb-4">
//                   <li>Volume illimité</li>
//                   <li>API dédiée</li>
//                   <li>Support 24/7</li>
//                   <li>Formation personnalisée</li>
//                 </ul>
//                 <button
//                   className="btn btn-primary"
//                   onClick={() =>
//                     (window.location.href = "mailto:contact@example.com")
//                   }
//                 >
//                   Nous Contacter
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Final */}
//       <section className="py-16 px-4">
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

import { useNavigate } from "react-router-dom";
import { Bot, Book, Stars, Coins } from "lucide-react";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200">
      {/* Hero Section */}
      <section className="hero min-h-[60vh] bg-base-200 px-4">
        <div className="hero-content text-center p-0">
          <div className="max-w-3xl w-full">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent px-2">
              Traduction Intelligente avec IA
            </h1>
            <p className="text-lg md:text-xl mb-6 md:mb-8 px-2">
              Une plateforme révolutionnaire qui combine les meilleurs modèles
              d'IA au monde avec une gestion avancée de glossaires pour des
              traductions précises et cohérentes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full px-4">
              <button
                className="btn btn-primary w-full sm:w-auto px-8"
                onClick={() => navigate("/register")}
              >
                Commencer Gratuitement
              </button>
              <button
                className="btn btn-outline w-full sm:w-auto px-8"
                onClick={() => navigate("/")}
              >
                Se Connecter
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* À Propos */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">À Propos</h2>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <p className="text-lg">
                Notre plateforme innovante révolutionne la traduction en
                combinant les technologies d'IA les plus avancées (GPT-4,
                Claude, Gemini) avec une gestion intelligente des glossaires.
                Notre approche unique garantit non seulement des traductions
                précises, mais aussi le maintien de la cohérence terminologique
                essentielle pour les professionnels et les entreprises.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Notre Mission */}
      <section className="py-16 px-4 bg-base-200">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Notre Mission
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <Bot className="w-12 h-12 text-primary mb-4" />
                <h3 className="card-title">Intelligence Artificielle</h3>
                <p>
                  Exploiter les meilleurs modèles d'IA pour des traductions de
                  qualité supérieure
                </p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <Book className="w-12 h-12 text-primary mb-4" />
                <h3 className="card-title">Cohérence</h3>
                <p>
                  Maintenir une terminologie cohérente grâce à notre système de
                  glossaires intelligent
                </p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <Stars className="w-12 h-12 text-primary mb-4" />
                <h3 className="card-title">Excellence</h3>
                <p>
                  Fournir des traductions de la plus haute qualité pour tous vos
                  besoins
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-8 md:py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
            Nos Services
          </h2>
          <div className="grid md:grid-cols-2 gap-4 md:gap-8">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body p-4 md:p-8">
                <h3 className="card-title text-lg md:text-xl mb-4">
                  Traduction IA Multi-Modèles
                </h3>
                <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
                  <li>Accès à GPT-4, Claude et Gemini</li>
                  <li>Sélection automatique du meilleur modèle</li>
                  <li>Support multilingue avancé</li>
                </ul>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body p-4 md:p-8">
                <h3 className="card-title text-lg md:text-xl mb-4">
                  Gestion de Glossaires
                </h3>
                <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
                  <li>Création de glossaires personnalisés</li>
                  <li>Application automatique des termes</li>
                  <li>Maintenance de la cohérence terminologique</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tarifs */}
      <section className="py-8 md:py-16 px-4 bg-base-200">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
            Nos Tarifs
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 max-w-lg sm:max-w-none mx-auto">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center p-4 md:p-8">
                <h3 className="card-title text-lg md:text-xl">Gratuit</h3>
                <Coins className="w-8 h-8 md:w-12 md:h-12 text-primary my-2 md:my-4" />
                <ul className="space-y-2 mb-4 text-sm md:text-base">
                  <li>500 mots par jour</li>
                  <li>1 glossaire</li>
                  <li>Modèle Gemini uniquement</li>
                </ul>
                <button
                  className="btn btn-primary w-full sm:w-auto"
                  onClick={() => navigate("/register")}
                >
                  Commencer
                </button>
              </div>
            </div>
            <div className="card bg-primary text-primary-content shadow-xl">
              <div className="card-body items-center text-center">
                <h3 className="card-title">Pro</h3>
                <Coins className="w-12 h-12 my-4" />
                <ul className="space-y-2 mb-4">
                  <li>10,000 mots par jour</li>
                  <li>Glossaires illimités</li>
                  <li>Tous les modèles d'IA</li>
                  <li>Support prioritaire</li>
                </ul>
                <p className="text-2xl font-bold mb-4">29€/mois</p>
                <button
                  className="btn btn-secondary"
                  onClick={() => navigate("/register")}
                >
                  Essai Gratuit
                </button>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <h3 className="card-title">Entreprise</h3>
                <Coins className="w-12 h-12 text-primary my-4" />
                <ul className="space-y-2 mb-4">
                  <li>Volume illimité</li>
                  <li>API dédiée</li>
                  <li>Support 24/7</li>
                  <li>Formation personnalisée</li>
                </ul>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    (window.location.href = "mailto:contact@example.com")
                  }
                >
                  Nous Contacter
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-8">Prêt à Commencer ?</h2>
          <p className="text-xl mb-8">
            Rejoignez les milliers d'utilisateurs qui font confiance à notre
            plateforme pour leurs besoins de traduction.
          </p>
          <button
            className="btn btn-primary btn-lg"
            onClick={() => navigate("/register")}
          >
            Créer un Compte Gratuit
          </button>
        </div>
      </section>
    </div>
  );
}
