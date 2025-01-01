// // src/components/SubscriptionAlert.jsx
// import { useState, useEffect } from "react";
// import { AlertTriangle, X } from "lucide-react";

// export default function SubscriptionAlert() {
//   const [subscription, setSubscription] = useState(null);
//   const [dismissed, setDismissed] = useState(false);
//   const token = localStorage.getItem("token");
//   const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

//   useEffect(() => {
//     const fetchSubscriptionStatus = async () => {
//       try {
//         const response = await fetch(`${apiUrl}/api/subscriptions/status`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const data = await response.json();
//         console.log(data);

//         if (response.ok) {
//           setSubscription(data);
//         }
//       } catch (error) {
//         console.error("Erreur lors de la récupération du statut:", error);
//       }
//     };

//     fetchSubscriptionStatus();
//     const interval = setInterval(fetchSubscriptionStatus, 24 * 60 * 60 * 1000); // Rafraîchir toutes les 24 heures
//     return () => clearInterval(interval);
//   }, [token, apiUrl]);

//   // Ne pas afficher d'alerte si :
//   // - Pas de données d'abonnement
//   // - L'alerte a été ignorée
//   // - C'est un plan gratuit
//   // - Les limites ne sont pas atteintes et le renouvellement n'est pas proche
//   if (
//     !subscription ||
//     dismissed ||
//     subscription.plan === "free" ||
//     (!subscription.isApproachingLimit &&
//       (!subscription.daysUntilRenewal || subscription.daysUntilRenewal > 7))
//   ) {
//     return null;
//   }

//   return (
//     <div className="alert alert-warning shadow-lg flex justify-between items-start">
//       <div className="flex items-start gap-4">
//         <AlertTriangle className="w-6 h-6 text-warning" />
//         <div>
//           <h3 className="font-bold">Attention à votre abonnement !</h3>
//           <div className="text-sm">
//             {subscription.daysUntilRenewal &&
//               subscription.daysUntilRenewal <= 7 && (
//                 <p>
//                   Votre abonnement <strong>{subscription.plan}</strong> sera
//                   renouvelé dans{" "}
//                   <strong>{subscription.daysUntilRenewal}</strong> jours.
//                 </p>
//               )}
//             {subscription.isApproachingLimit &&
//               subscription.usage &&
//               subscription.limits && (
//                 <p>
//                   Vous approchez de votre limite d'utilisation mensuelle (
//                   <strong>
//                     {subscription.usage.characters.toLocaleString()}
//                   </strong>
//                   /
//                   <strong>
//                     {subscription.limits.characters.toLocaleString()}
//                   </strong>{" "}
//                   caractères).
//                 </p>
//               )}
//           </div>
//           <a href="/subscriptions" className="btn btn-sm btn-primary mt-2">
//             Gérer mon abonnement
//           </a>
//         </div>
//       </div>
//       <button
//         className="btn btn-ghost btn-sm"
//         onClick={() => setDismissed(true)}
//       >
//         <X className="w-4 h-4" />
//       </button>
//     </div>
//   );
// }

// src/components/SubscriptionAlert.jsx
import { useState, useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";

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
        console.log("Subscription Data:", data);

        if (response.ok) {
          setSubscription(data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du statut:", error);
      }
    };

    fetchSubscriptionStatus();
    const interval = setInterval(fetchSubscriptionStatus, 24 * 60 * 60 * 1000); // Rafraîchir toutes les 24 heures
    return () => clearInterval(interval);
  }, [token, apiUrl]);

  // Pour les tests : afficher l'alerte même si les limites ne sont pas atteintes et le renouvellement n'est pas proche
  if (!subscription || dismissed || subscription.plan === "free") {
    return null;
  }

  return (
    <div className="alert alert-warning shadow-lg flex justify-between items-start">
      <div className="flex items-start gap-4">
        <AlertTriangle className="w-6 h-6 text-warning" />
        <div>
          <h3 className="font-bold">Attention à votre abonnement !</h3>
          <div className="text-sm">
            {subscription.daysUntilRenewal && (
              <p>
                Votre abonnement <strong>{subscription.plan}</strong> sera
                renouvelé dans <strong>{subscription.daysUntilRenewal}</strong>{" "}
                jours.
              </p>
            )}
            {subscription.usage && subscription.limits && (
              <p>
                Vous avez effectué{" "}
                <strong>
                  {subscription.usage.translations.toLocaleString()}
                </strong>{" "}
                traductions ce mois-ci. Vous avez utilisé{" "}
                <strong>
                  {subscription.usage.characters.toLocaleString()}
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
