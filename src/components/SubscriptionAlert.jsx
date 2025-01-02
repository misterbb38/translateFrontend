// // // src/components/SubscriptionAlert.jsx
// // import { useState, useEffect } from "react";
// // import { AlertTriangle, X } from "lucide-react";

// // export default function SubscriptionAlert() {
// //   const [subscription, setSubscription] = useState(null);
// //   const [dismissed, setDismissed] = useState(false);
// //   const token = localStorage.getItem("token");
// //   const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

// //   useEffect(() => {
// //     const fetchSubscriptionStatus = async () => {
// //       try {
// //         const response = await fetch(`${apiUrl}/api/subscriptions/status`, {
// //           headers: { Authorization: `Bearer ${token}` },
// //         });

// //         const data = await response.json();
// //         console.log(data);

// //         if (response.ok) {
// //           setSubscription(data);
// //         }
// //       } catch (error) {
// //         console.error("Erreur lors de la récupération du statut:", error);
// //       }
// //     };

// //     fetchSubscriptionStatus();
// //     const interval = setInterval(fetchSubscriptionStatus, 24 * 60 * 60 * 1000); // Rafraîchir toutes les 24 heures
// //     return () => clearInterval(interval);
// //   }, [token, apiUrl]);

// //   // Ne pas afficher d'alerte si :
// //   // - Pas de données d'abonnement
// //   // - L'alerte a été ignorée
// //   // - C'est un plan gratuit
// //   // - Les limites ne sont pas atteintes et le renouvellement n'est pas proche
// //   if (
// //     !subscription ||
// //     dismissed ||
// //     subscription.plan === "free" ||
// //     (!subscription.isApproachingLimit &&
// //       (!subscription.daysUntilRenewal || subscription.daysUntilRenewal > 7))
// //   ) {
// //     return null;
// //   }

// //   return (
// //     <div className="alert alert-warning shadow-lg flex justify-between items-start">
// //       <div className="flex items-start gap-4">
// //         <AlertTriangle className="w-6 h-6 text-warning" />
// //         <div>
// //           <h3 className="font-bold">Attention à votre abonnement !</h3>
// //           <div className="text-sm">
// //             {subscription.daysUntilRenewal &&
// //               subscription.daysUntilRenewal <= 7 && (
// //                 <p>
// //                   Votre abonnement <strong>{subscription.plan}</strong> sera
// //                   renouvelé dans{" "}
// //                   <strong>{subscription.daysUntilRenewal}</strong> jours.
// //                 </p>
// //               )}
// //             {subscription.isApproachingLimit &&
// //               subscription.usage &&
// //               subscription.limits && (
// //                 <p>
// //                   Vous approchez de votre limite d'utilisation mensuelle (
// //                   <strong>
// //                     {subscription.usage.characters.toLocaleString()}
// //                   </strong>
// //                   /
// //                   <strong>
// //                     {subscription.limits.characters.toLocaleString()}
// //                   </strong>{" "}
// //                   caractères).
// //                 </p>
// //               )}
// //           </div>
// //           <a href="/subscriptions" className="btn btn-sm btn-primary mt-2">
// //             Gérer mon abonnement
// //           </a>
// //         </div>
// //       </div>
// //       <button
// //         className="btn btn-ghost btn-sm"
// //         onClick={() => setDismissed(true)}
// //       >
// //         <X className="w-4 h-4" />
// //       </button>
// //     </div>
// //   );
// // }

// // src/components/SubscriptionAlert.jsx
// // import { useState, useEffect } from "react";
// // import { AlertTriangle, X } from "lucide-react";

// // export default function SubscriptionAlert() {
// //   const [subscription, setSubscription] = useState(null);
// //   const [dismissed, setDismissed] = useState(false);
// //   const token = localStorage.getItem("token");
// //   const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

// //   useEffect(() => {
// //     const fetchSubscriptionStatus = async () => {
// //       try {
// //         const response = await fetch(`${apiUrl}/api/subscriptions/status`, {
// //           headers: { Authorization: `Bearer ${token}` },
// //         });

// //         const data = await response.json();
// //         console.log("Subscription Data:", data);

// //         if (response.ok) {
// //           setSubscription(data);
// //         }
// //       } catch (error) {
// //         console.error("Erreur lors de la récupération du statut:", error);
// //       }
// //     };

// //     fetchSubscriptionStatus();
// //     const interval = setInterval(fetchSubscriptionStatus, 24 * 60 * 60 * 1000); // Rafraîchir toutes les 24 heures
// //     return () => clearInterval(interval);
// //   }, [token, apiUrl]);

// //   // Pour les tests : afficher l'alerte même si les limites ne sont pas atteintes et le renouvellement n'est pas proche
// //   if (!subscription || dismissed || subscription.plan === "free") {
// //     return null;
// //   }

// //   return (
// //     <div className="alert alert-warning shadow-lg flex justify-between items-start">
// //       <div className="flex items-start gap-4">
// //         <AlertTriangle className="w-6 h-6 text-warning" />
// //         <div>
// //           <h3 className="font-bold">Attention à votre abonnement !</h3>
// //           <div className="text-sm">
// //             {subscription.daysUntilRenewal && (
// //               <p>
// //                 Votre abonnement <strong>{subscription.plan}</strong> sera
// //                 renouvelé dans <strong>{subscription.daysUntilRenewal}</strong>{" "}
// //                 jours.
// //               </p>
// //             )}
// //             {subscription.usage && subscription.limits && (
// //               <p>
// //                 Vous avez effectué{" "}
// //                 <strong>
// //                   {subscription.usage.translations.toLocaleString()}
// //                 </strong>{" "}
// //                 traductions ce mois-ci. Vous avez utilisé{" "}
// //                 <strong>
// //                   {subscription.usage.characters.toLocaleString()}
// //                 </strong>{" "}
// //                 caractères.
// //               </p>
// //             )}
// //           </div>
// //           <a href="/subscriptions" className="btn btn-sm btn-primary mt-2">
// //             Gérer mon abonnement
// //           </a>
// //         </div>
// //       </div>
// //       <button
// //         className="btn btn-ghost btn-sm"
// //         onClick={() => setDismissed(true)}
// //       >
// //         <X className="w-4 h-4" />
// //       </button>
// //     </div>
// //   );
// // }

// import { useState, useEffect } from "react";
// import { AlertTriangle, X, Crown } from "lucide-react";

// export default function SubscriptionAlert() {
//   const [subscription, setSubscription] = useState(null);
//   const [dismissed, setDismissed] = useState(
//     localStorage.getItem("alertDismissed") === "true"
//   );
//   const token = localStorage.getItem("token");
//   const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

//   useEffect(() => {
//     const fetchSubscriptionStatus = async () => {
//       try {
//         const response = await fetch(`${apiUrl}/api/subscriptions/status`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const data = await response.json();
//         if (response.ok) {
//           setSubscription(data);
//         }
//       } catch (error) {
//         console.error("Erreur lors de la récupération du statut:", error);
//       }
//     };

//     fetchSubscriptionStatus();
//     const interval = setInterval(fetchSubscriptionStatus, 6 * 60 * 60 * 1000); // Vérifier toutes les 6 heures
//     return () => clearInterval(interval);
//   }, [token, apiUrl]);

//   const handleDismiss = () => {
//     setDismissed(true);
//     localStorage.setItem("alertDismissed", "true");
//     // Reset le dismiss après 24h
//     const tomorrow = new Date();
//     tomorrow.setHours(0, 0, 0, 0);
//     tomorrow.setDate(tomorrow.getDate() + 1);

//     const timeUntilTomorrow = tomorrow.getTime() - Date.now();

//     setTimeout(() => {
//       localStorage.removeItem("alertDismissed");
//       setDismissed(false);
//     }, timeUntilTomorrow);
//   };

//   if (!subscription || dismissed) {
//     return null;
//   }

//   // Alerte pour le plan gratuit (quotidienne)
//   if (subscription.plan === "free") {
//     return (
//       <div className="alert alert-info shadow-lg flex justify-between items-start">
//         <div className="flex items-start gap-4">
//           <Crown className="w-6 h-6 text-primary" />
//           <div>
//             <h3 className="font-bold">Passez à la vitesse supérieure !</h3>
//             <div className="text-sm">
//               <p>
//                 Découvrez les avantages des plans premium :
//                 <ul className="list-disc ml-4 mt-1">
//                   <li>Plus de modèles IA (GPT-4, Claude)</li>
//                   <li>Traductions plus longues</li>
//                   <li>Support prioritaire</li>
//                   <li>Pas de limitation quotidienne</li>
//                 </ul>
//               </p>
//             </div>
//             <a href="/subscriptions" className="btn btn-sm btn-primary mt-2">
//               Découvrir les plans premium
//             </a>
//           </div>
//         </div>
//         <button className="btn btn-ghost btn-sm" onClick={handleDismiss}>
//           <X className="w-4 h-4" />
//         </button>
//       </div>
//     );
//   }

//   // Alerte pour les plans payants (uniquement si proche du renouvellement)
//   if (subscription.daysUntilRenewal && subscription.daysUntilRenewal <= 7) {
//     return (
//       <div className="alert alert-warning shadow-lg flex justify-between items-start">
//         <div className="flex items-start gap-4">
//           <AlertTriangle className="w-6 h-6 text-warning" />
//           <div>
//             <h3 className="font-bold">Renouvellement proche</h3>
//             <div className="text-sm">
//               <p>
//                 Votre abonnement <strong>{subscription.plan}</strong> sera
//                 renouvelé dans <strong>{subscription.daysUntilRenewal}</strong>{" "}
//                 jour{subscription.daysUntilRenewal > 1 ? "s" : ""}.
//               </p>
//               {subscription.currentMonthUsage && subscription.limits && (
//                 <p className="mt-2">
//                   Utilisation ce mois-ci :{" "}
//                   <strong>
//                     {subscription.currentMonthUsage.translations.toLocaleString()}
//                   </strong>{" "}
//                   traductions et{" "}
//                   <strong>
//                     {subscription.currentMonthUsage.characters.toLocaleString()}
//                   </strong>{" "}
//                   caractères.
//                 </p>
//               )}
//             </div>
//             <a href="/subscriptions" className="btn btn-sm btn-primary mt-2">
//               Gérer mon abonnement
//             </a>
//           </div>
//         </div>
//         <button className="btn btn-ghost btn-sm" onClick={handleDismiss}>
//           <X className="w-4 h-4" />
//         </button>
//       </div>
//     );
//   }

//   return null;
// }

import { useState, useEffect } from "react";
import { AlertTriangle, X, Crown } from "lucide-react";

export default function SubscriptionAlert() {
  const [subscription, setSubscription] = useState(null);
  const [dismissed, setDismissed] = useState(false);
  const token = localStorage.getItem("token");
  const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/subscriptions/status`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        if (response.ok) {
          setSubscription(data);
          // Reset le dismissed à chaque nouvelle session pour les utilisateurs gratuits
          if (data.plan === "free") {
            setDismissed(false);
          }
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du statut:", error);
      }
    };

    fetchSubscriptionStatus();
    const interval = setInterval(fetchSubscriptionStatus, 6 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [token, apiUrl]);

  if (!subscription || dismissed) {
    return null;
  }

  // Alerte pour le plan gratuit (à chaque connexion)
  if (subscription.plan === "free") {
    return (
      <div className="alert alert-info shadow-lg flex justify-between items-start">
        <div className="flex items-start gap-4">
          <Crown className="w-6 h-6 text-primary" />
          <div>
            <h3 className="font-bold">Améliorez votre expérience !</h3>
            <div className="text-sm">
              <p>
                Débloquez tous les avantages avec un plan premium :
                <ul className="list-disc ml-4 mt-1">
                  <li>Accès à tous les modèles IA (GPT-4, Claude)</li>
                  <li>Traductions illimitées</li>
                  <li>Support prioritaire 24/7</li>
                  <li>Fonctionnalités avancées</li>
                </ul>
              </p>
            </div>
            <div className="flex gap-2 mt-2">
              <a href="/subscriptions" className="btn btn-sm btn-primary">
                Voir les plans premium
              </a>
            </div>
          </div>
        </div>
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => setDismissed(true)}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  // Alerte pour les plans payants (uniquement si proche du renouvellement)
  if (subscription.daysUntilRenewal && subscription.daysUntilRenewal <= 7) {
    return (
      <div className="alert alert-warning shadow-lg flex justify-between items-start">
        <div className="flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-warning" />
          <div>
            <h3 className="font-bold">Renouvellement proche</h3>
            <div className="text-sm">
              <p>
                Votre abonnement <strong>{subscription.plan}</strong> sera
                renouvelé dans <strong>{subscription.daysUntilRenewal}</strong>{" "}
                jour{subscription.daysUntilRenewal > 1 ? "s" : ""}.
              </p>
              {subscription.currentMonthUsage && subscription.limits && (
                <p className="mt-2">
                  Utilisation ce mois-ci :{" "}
                  <strong>
                    {subscription.currentMonthUsage.translations.toLocaleString()}
                  </strong>{" "}
                  traductions et{" "}
                  <strong>
                    {subscription.currentMonthUsage.characters.toLocaleString()}
                  </strong>{" "}
                  caractères.
                </p>
              )}
            </div>
            <a href="/subscriptions" className="btn btn-sm btn-primary mt-2">
              Gérer mon abonnement
            </a>
          </div>
        </div>
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => setDismissed(true)}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return null;
}
