// import React, { useState } from "react";
// import {
//   ChevronDown,
//   CreditCard,
//   Book,
//   Users,
//   Sparkles,
//   Globe,
//   Search,
//   Bot,
//   Check,
// } from "lucide-react";

// const Documentation = () => {
//   const [activeSection, setActiveSection] = useState("getting-started");

//   const sections = {
//     "getting-started": {
//       title: "Bienvenue",
//       content: (
//         <div className="space-y-6">
//           <h3 className="text-xl font-semibold mb-4">
//             Bienvenue sur notre plateforme de traduction IA
//           </h3>
//           <p className="mb-4">
//             Notre application offre une solution complète de traduction en
//             combinant la puissance des modèles d'IA (GPT, Claude, Gemini) avec
//             des outils professionnels comme la gestion de glossaires et un
//             dictionnaire intégré.
//           </p>

//           <div className="bg-base-200 p-4 rounded-lg">
//             <h4 className="font-semibold mb-2">
//               Fonctionnalités Principales :
//             </h4>
//             <ul className="space-y-3">
//               <li className="flex items-start gap-2">
//                 <Globe className="w-5 h-5 mt-1 text-primary" />
//                 <div>
//                   <span className="font-medium">Traduction Multilingue</span>
//                   <p className="text-sm">
//                     Support pour français, anglais, portugais, espagnol et arabe
//                     avec une qualité professionnelle
//                   </p>
//                 </div>
//               </li>
//               <li className="flex items-start gap-2">
//                 <Book className="w-5 h-5 mt-1 text-primary" />
//                 <div>
//                   <span className="font-medium">Dictionnaire Intelligent</span>
//                   <p className="text-sm">
//                     Accès instantané aux définitions par double-clic avec
//                     exemples d'utilisation
//                   </p>
//                 </div>
//               </li>
//               <li className="flex items-start gap-2">
//                 <Bot className="w-5 h-5 mt-1 text-primary" />
//                 <div>
//                   <span className="font-medium">Modèles d'IA</span>
//                   <p className="text-sm">
//                     Choisissez entre Google Gemini, GPT et Claude selon votre
//                     abonnement
//                   </p>
//                 </div>
//               </li>
//             </ul>
//           </div>
//         </div>
//       ),
//     },
//     dictionary: {
//       title: "Dictionnaire",
//       content: (
//         <div className="space-y-6">
//           <h3 className="text-xl font-semibold mb-4">
//             Utilisation du Dictionnaire
//           </h3>

//           <div className="bg-base-200 p-4 rounded-lg mb-6">
//             <h4 className="font-semibold mb-2">Comment ça marche :</h4>
//             <ol className="space-y-2 list-decimal list-inside">
//               <li>
//                 Double-cliquez sur n'importe quel mot dans la zone de traduction
//               </li>
//               <li>Une fenêtre pop-up apparaît avec la définition détaillée</li>
//               <li>
//                 Déplacez la fenêtre en la faisant glisser par sa barre
//                 supérieure
//               </li>
//               <li>Fermez la définition avec le bouton 'X'</li>
//             </ol>
//           </div>

//           <div className="space-y-4">
//             <h4 className="font-semibold">Contenu des Définitions :</h4>
//             <ul className="space-y-2">
//               <li>• Nature grammaticale du mot</li>
//               <li>• Définition complète</li>
//               <li>• Exemples d'utilisation</li>
//               <li>• Suggestions de synonymes (selon disponibilité)</li>
//             </ul>
//           </div>

//           <div className="bg-base-200 p-4 rounded-lg mt-4">
//             <h4 className="font-semibold mb-2">Limitations par Plan :</h4>
//             <ul className="space-y-2">
//               <li>Free : Modèle Gemini uniquement</li>
//               <li>Starter : Accès à Gemini et GPT</li>
//               <li>
//                 Pro/Enterprise : Accès à tous les modèles, y compris Claude
//               </li>
//             </ul>
//           </div>
//         </div>
//       ),
//     },
//     "user-types": {
//       title: "Types d'Utilisateurs",
//       content: (
//         <div className="space-y-6">
//           <div className="card bg-base-200 p-4">
//             <h4 className="font-semibold mb-3">Utilisateur Free</h4>
//             <ul className="space-y-2">
//               <li className="flex items-start gap-2">
//                 <Check className="w-4 h-4 text-success mt-1" />
//                 <span>50 000 caractères/mois</span>
//               </li>
//               <li className="flex items-start gap-2">
//                 <Check className="w-4 h-4 text-success mt-1" />
//                 <span>50 traductions/mois</span>
//               </li>
//               <li className="flex items-start gap-2">
//                 <Check className="w-4 h-4 text-success mt-1" />
//                 <span>1 glossaire maximum</span>
//               </li>
//               <li className="flex items-start gap-2">
//                 <Check className="w-4 h-4 text-success mt-1" />
//                 <span>Accès au modèle Gemini uniquement</span>
//               </li>
//               <li className="flex items-start gap-2">
//                 <Check className="w-4 h-4 text-success mt-1" />
//                 <span>Support basique (48h+)</span>
//               </li>
//             </ul>
//           </div>

//           <div className="card bg-base-200 p-4">
//             <h4 className="font-semibold mb-3">
//               Utilisateur Starter (8000 FCFA/mois)
//             </h4>
//             <ul className="space-y-2">
//               <li className="flex items-start gap-2">
//                 <Check className="w-4 h-4 text-success mt-1" />
//                 <span>300 000 caractères/mois</span>
//               </li>
//               <li className="flex items-start gap-2">
//                 <Check className="w-4 h-4 text-success mt-1" />
//                 <span>300 traductions/mois</span>
//               </li>
//               <li className="flex items-start gap-2">
//                 <Check className="w-4 h-4 text-success mt-1" />
//                 <span>5 glossaires maximum</span>
//               </li>
//               <li className="flex items-start gap-2">
//                 <Check className="w-4 h-4 text-success mt-1" />
//                 <span>Accès aux modèles Gemini et GPT</span>
//               </li>
//               <li className="flex items-start gap-2">
//                 <Check className="w-4 h-4 text-success mt-1" />
//                 <span>Support standard (24-48h)</span>
//               </li>
//             </ul>
//           </div>

//           <div className="card bg-base-200 p-4">
//             <h4 className="font-semibold mb-3">
//               Utilisateur Pro (25000 FCFA/mois)
//             </h4>
//             <ul className="space-y-2">
//               <li className="flex items-start gap-2">
//                 <Check className="w-4 h-4 text-success mt-1" />
//                 <span>1 000 000 caractères/mois</span>
//               </li>
//               <li className="flex items-start gap-2">
//                 <Check className="w-4 h-4 text-success mt-1" />
//                 <span>1000 traductions/mois</span>
//               </li>
//               <li className="flex items-start gap-2">
//                 <Check className="w-4 h-4 text-success mt-1" />
//                 <span>20 glossaires maximum</span>
//               </li>
//               <li className="flex items-start gap-2">
//                 <Check className="w-4 h-4 text-success mt-1" />
//                 <span>Accès à tous les modèles (Gemini, GPT, Claude)</span>
//               </li>
//               <li className="flex items-start gap-2">
//                 <Check className="w-4 h-4 text-success mt-1" />
//                 <span>Support prioritaire (4h)</span>
//               </li>
//             </ul>
//           </div>

//           <div className="card bg-base-200 p-4">
//             <h4 className="font-semibold mb-3">
//               Utilisateur Enterprise (Sur devis)
//             </h4>
//             <ul className="space-y-2">
//               <li className="flex items-start gap-2">
//                 <Check className="w-4 h-4 text-success mt-1" />
//                 <span>Caractères illimités</span>
//               </li>
//               <li className="flex items-start gap-2">
//                 <Check className="w-4 h-4 text-success mt-1" />
//                 <span>Traductions illimitées</span>
//               </li>
//               <li className="flex items-start gap-2">
//                 <Check className="w-4 h-4 text-success mt-1" />
//                 <span>Glossaires illimités</span>
//               </li>
//               <li className="flex items-start gap-2">
//                 <Check className="w-4 h-4 text-success mt-1" />
//                 <span>Accès à tous les modèles avec priorité</span>
//               </li>
//               <li className="flex items-start gap-2">
//                 <Check className="w-4 h-4 text-success mt-1" />
//                 <span>Support dédié (ligne directe)</span>
//               </li>
//             </ul>
//           </div>
//         </div>
//       ),
//     },
//     payment: {
//       title: "Paiement",
//       content: (
//         <div className="space-y-6">
//           <h3 className="text-xl font-semibold mb-4">Modes de Paiement</h3>

//           <div className="bg-base-200 p-4 rounded-lg">
//             <h4 className="font-semibold mb-2">Options de Paiement :</h4>
//             <ul className="space-y-3">
//               <li className="flex items-center gap-2">
//                 <CreditCard className="w-5 h-5 text-primary" />
//                 <span>Cartes bancaires (Visa, Mastercard)</span>
//               </li>
//               <li className="flex items-center gap-2">
//                 <CreditCard className="w-5 h-5 text-primary" />
//                 <span>Mobile Money</span>
//               </li>
//             </ul>
//           </div>

//           <div className="mt-4">
//             <h4 className="font-semibold mb-2">Informations importantes :</h4>
//             <ul className="space-y-2 text-sm">
//               <li>• Paiements sécurisés via Stripe</li>
//               <li>• Facturation mensuelle automatique</li>
//               <li>• Pas d'engagement de durée</li>
//               <li>• Possibilité de changer de plan à tout moment</li>
//             </ul>
//           </div>

//           <div className="bg-base-200 p-4 rounded-lg mt-4">
//             <h4 className="font-semibold mb-2">Contact :</h4>
//             <p>
//               Pour toute question concernant la facturation :
//               support@palabresak2.com
//             </p>
//           </div>
//         </div>
//       ),
//     },
//   };

//   return (
//     <div className="container mx-auto p-4 max-w-4xl">
//       <h1 className="text-3xl font-bold mb-8">Documentation</h1>

//       <div className="bg-base-100 rounded-lg shadow-lg overflow-hidden">
//         <div className="flex flex-col md:flex-row">
//           {/* Navigation sidebar */}
//           <div className="w-full md:w-64 bg-base-200 p-4">
//             {Object.entries(sections).map(([key, section]) => (
//               <button
//                 key={key}
//                 onClick={() => setActiveSection(key)}
//                 className={`w-full text-left p-2 rounded transition-colors ${
//                   activeSection === key
//                     ? "bg-primary text-primary-content"
//                     : "hover:bg-base-300"
//                 }`}
//               >
//                 {section.title}
//               </button>
//             ))}
//           </div>

//           {/* Content area */}
//           <div className="flex-1 p-6">
//             <h2 className="text-2xl font-bold mb-4">
//               {sections[activeSection].title}
//             </h2>
//             {sections[activeSection].content}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Documentation;

import React, { useState } from "react";
import {
  ChevronDown,
  CreditCard,
  Book,
  Users,
  Sparkles,
  Globe,
  Search,
  Bot,
  Check,
  Upload,
  Settings,
  Languages,
} from "lucide-react";

const Documentation = () => {
  const [activeSection, setActiveSection] = useState("getting-started");

  const sections = {
    "getting-started": {
      title: "Bienvenue",
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold mb-4">
            Bienvenue sur notre plateforme de traduction IA
          </h3>
          <p className="mb-4">
            Notre application offre une solution complète de traduction en
            combinant la puissance des modèles d'IA (GPT, Claude, Gemini) avec
            des outils professionnels comme la gestion de glossaires et un
            dictionnaire intégré.
          </p>

          <div className="bg-base-200 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">
              Fonctionnalités Principales :
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Globe className="w-5 h-5 mt-1 text-primary" />
                <div>
                  <span className="font-medium">Traduction Multilingue</span>
                  <p className="text-sm">
                    Support pour français, anglais, portugais, espagnol et arabe
                    avec une qualité professionnelle
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Book className="w-5 h-5 mt-1 text-primary" />
                <div>
                  <span className="font-medium">Dictionnaire Intelligent</span>
                  <p className="text-sm">
                    Accès instantané aux définitions par double-clic avec
                    exemples d'utilisation
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Bot className="w-5 h-5 mt-1 text-primary" />
                <div>
                  <span className="font-medium">Modèles d'IA</span>
                  <p className="text-sm">
                    Choisissez entre Google Gemini, GPT et Claude selon votre
                    abonnement
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    translation: {
      title: "Comment Traduire",
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold mb-4">Guide de Traduction</h3>

          <div className="bg-base-200 p-4 rounded-lg mb-6">
            <h4 className="font-semibold mb-2">Étapes de Traduction :</h4>
            <ol className="space-y-3">
              <li className="flex items-start gap-2">
                <Languages className="w-5 h-5 mt-1 text-primary" />
                <div>
                  <span className="font-medium">1. Sélection des Langues</span>
                  <p className="text-sm">
                    Choisissez la langue source et la langue cible dans les
                    menus déroulants
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Bot className="w-5 h-5 mt-1 text-primary" />
                <div>
                  <span className="font-medium">2. Choix du Modèle</span>
                  <p className="text-sm">
                    Sélectionnez le modèle d'IA selon votre abonnement (Gemini,
                    GPT, ou Claude)
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Book className="w-5 h-5 mt-1 text-primary" />
                <div>
                  <span className="font-medium">
                    3. Sélection du Glossaire (Optionnel)
                  </span>
                  <p className="text-sm">
                    Choisissez un glossaire correspondant à vos langues pour
                    maintenir la cohérence terminologique
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Settings className="w-5 h-5 mt-1 text-primary" />
                <div>
                  <span className="font-medium">4. Traduction</span>
                  <p className="text-sm">
                    Entrez votre texte et cliquez sur "Traduire". La traduction
                    apparaîtra dans la zone de droite
                  </p>
                </div>
              </li>
            </ol>
          </div>

          <div className="bg-base-200 p-4 rounded-lg mt-4">
            <h4 className="font-semibold mb-2">
              Fonctionnalités Supplémentaires :
            </h4>
            <ul className="space-y-2">
              <li>
                • Copie rapide de la traduction avec le bouton en haut à droite
              </li>
              <li>• Dictionnaire intégré par double-clic sur les mots</li>
              <li>• Historique des traductions récentes</li>
              <li>
                • Ajout rapide de termes au glossaire depuis les zones de texte
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    glossary: {
      title: "Glossaires",
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold mb-4">Gestion des Glossaires</h3>

          <div className="bg-base-200 p-4 rounded-lg mb-6">
            <h4 className="font-semibold mb-2">Création d'un Glossaire :</h4>
            <ol className="space-y-3">
              <li className="flex items-start gap-2">
                <Settings className="w-5 h-5 mt-1 text-primary" />
                <div>
                  <span className="font-medium">Configuration Initiale</span>
                  <ul className="text-sm mt-1 space-y-1">
                    <li>- Donnez un nom à votre glossaire</li>
                    <li>- Sélectionnez les langues source et cible</li>
                    <li>- Ajoutez vos premiers termes manuellement</li>
                  </ul>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Upload className="w-5 h-5 mt-1 text-primary" />
                <div>
                  <span className="font-medium">Import de Termes</span>
                  <ul className="text-sm mt-1 space-y-1">
                    <li>- Import via fichier CSV</li>
                    <li>- Support des formats TMX et JSON</li>
                    <li>- Import en masse des termes</li>
                  </ul>
                </div>
              </li>
            </ol>
          </div>

          <div className="bg-base-200 p-4 rounded-lg mb-6">
            <h4 className="font-semibold mb-2">Utilisation des Glossaires :</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 mt-1 text-primary" />
                <div>
                  <span className="font-medium">Pendant la Traduction</span>
                  <p className="text-sm">
                    Les termes du glossaire sont automatiquement appliqués lors
                    de la traduction
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 mt-1 text-primary" />
                <div>
                  <span className="font-medium">Ajout Rapide de Termes</span>
                  <p className="text-sm">
                    Sélectionnez du texte dans les zones de traduction et
                    cliquez sur "Ajouter au glossaire"
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-base-200 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Limites par Plan :</h4>
            <ul className="space-y-2">
              <li>Free : 1 glossaire, 50 termes maximum</li>
              <li>Starter : 5 glossaires, 200 termes par glossaire</li>
              <li>Pro : 20 glossaires, 1000 termes par glossaire</li>
              <li>Enterprise : Glossaires et termes illimités</li>
            </ul>
          </div>
        </div>
      ),
    },
    dictionary: {
      title: "Dictionnaire",
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold mb-4">
            Utilisation du Dictionnaire
          </h3>

          <div className="bg-base-200 p-4 rounded-lg mb-6">
            <h4 className="font-semibold mb-2">Comment ça marche :</h4>
            <ol className="space-y-2 list-decimal list-inside">
              <li>
                Double-cliquez sur n'importe quel mot dans la zone de traduction
              </li>
              <li>Une fenêtre pop-up apparaît avec la définition détaillée</li>
              <li>
                Déplacez la fenêtre en la faisant glisser par sa barre
                supérieure
              </li>
              <li>Fermez la définition avec le bouton 'X'</li>
            </ol>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Contenu des Définitions :</h4>
            <ul className="space-y-2">
              <li>• Nature grammaticale du mot</li>
              <li>• Définition complète</li>
              <li>• Exemples d'utilisation</li>
              <li>• Suggestions de synonymes (selon disponibilité)</li>
            </ul>
          </div>

          <div className="bg-base-200 p-4 rounded-lg mt-4">
            <h4 className="font-semibold mb-2">Limitations par Plan :</h4>
            <ul className="space-y-2">
              <li>Free : Modèle Gemini uniquement</li>
              <li>Starter : Accès à Gemini et GPT</li>
              <li>
                Pro/Enterprise : Accès à tous les modèles, y compris Claude
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    "user-types": {
      title: "Types d'Utilisateurs",
      content: (
        <div className="space-y-6">
          {/* Utilisateur Free */}
          <div className="card bg-base-200 p-4">
            <h4 className="font-semibold mb-3">Utilisateur Free</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-success mt-1" />
                <span>50 000 caractères/mois</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-success mt-1" />
                <span>50 traductions/mois</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-success mt-1" />
                <span>1 glossaire maximum</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-success mt-1" />
                <span>Accès au modèle Gemini uniquement</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-success mt-1" />
                <span>Support basique (48h+)</span>
              </li>
            </ul>
          </div>

          {/* Utilisateur Starter */}
          <div className="card bg-base-200 p-4">
            <h4 className="font-semibold mb-3">
              Utilisateur Starter (8000 FCFA/mois)
            </h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-success mt-1" />
                <span>300 000 caractères/mois</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-success mt-1" />
                <span>300 traductions/mois</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-success mt-1" />
                <span>5 glossaires maximum</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-success mt-1" />
                <span>Accès aux modèles Gemini et GPT</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-success mt-1" />
                <span>Support standard (24-48h)</span>
              </li>
            </ul>
          </div>

          {/* Utilisateur Pro */}
          <div className="card bg-base-200 p-4">
            <h4 className="font-semibold mb-3">
              Utilisateur Pro (25000 FCFA/mois)
            </h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-success mt-1" />
                <span>1 000 000 caractères/mois</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-success mt-1" />
                <span>1000 traductions/mois</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-success mt-1" />
                <span>20 glossaires maximum</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-success mt-1" />
                <span>Accès à tous les modèles (Gemini, GPT, Claude)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-success mt-1" />
                <span>Support prioritaire (4h)</span>
              </li>
            </ul>
          </div>

          {/* Utilisateur Enterprise */}
          <div className="card bg-base-200 p-4">
            <h4 className="font-semibold mb-3">
              Utilisateur Enterprise (Sur devis)
            </h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-success mt-1" />
                <span>Caractères illimités</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-success mt-1" />
                <span>Traductions illimitées</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-success mt-1" />
                <span>Glossaires illimités</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-success mt-1" />
                <span>Accès à tous les modèles avec priorité</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-success mt-1" />
                <span>Support dédié (ligne directe)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-success mt-1" />
                <span>Formation et accompagnement personnalisés</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-success mt-1" />
                <span>API dédiée pour l'intégration</span>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    payment: {
      title: "Paiement",
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold mb-4">Modes de Paiement</h3>

          <div className="bg-base-200 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Options de Paiement :</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                <span>Cartes bancaires (Visa, Mastercard)</span>
              </li>
              {/* <li className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                <span>Mobile Money (Orange Money, Wave, MTN Money)</span>
              </li> */}
            </ul>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold mb-2">Informations importantes :</h4>
            <ul className="space-y-2 text-sm">
              <li>• Paiements sécurisés via Stripe</li>
              <li>• Facturation mensuelle automatique</li>
              <li>• Pas d'engagement de durée</li>
              <li>• Possibilité de changer de plan à tout moment</li>
              <li>• Remboursement au prorata en cas d'annulation</li>
            </ul>
          </div>

          <div className="bg-base-200 p-4 rounded-lg mt-4">
            <h4 className="font-semibold mb-2">Contact :</h4>
            <p>
              Pour toute question concernant la facturation :{" "}
              <strong>support@palabresak2.com</strong>
            </p>
            <p className="mt-2">
              Service client disponible du lundi au vendredi de 8h à 18h
            </p>
          </div>
        </div>
      ),
    },
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Documentation</h1>

      <div className="bg-base-100 rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Navigation sidebar */}
          <div className="w-full md:w-64 bg-base-200 p-4">
            {Object.entries(sections).map(([key, section]) => (
              <button
                key={key}
                onClick={() => setActiveSection(key)}
                className={`w-full text-left p-2 rounded transition-colors ${
                  activeSection === key
                    ? "bg-primary text-primary-content"
                    : "hover:bg-base-300"
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>

          {/* Content area */}
          <div className="flex-1 p-6">
            <h2 className="text-2xl font-bold mb-4">
              {sections[activeSection].title}
            </h2>
            {sections[activeSection].content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
