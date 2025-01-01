// import { useEffect } from "react";
// import { useSearchParams } from "react-router-dom";

// export default function SuccessPage() {
//   const [searchParams] = useSearchParams();

//   useEffect(() => {
//     const sessionId = searchParams.get("session_id");
//     const planId = searchParams.get("plan");

//     // Appeler votre endpoint backend pour vérifier et mettre à jour le plan
//     if (sessionId && planId) {
//       fetch(
//         `${
//           import.meta.env.VITE_APP_API_BASE_URL
//         }/api/subscriptions/verify-checkout`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//           body: JSON.stringify({ sessionId, planId }),
//         }
//       )
//         .then((res) => res.json())
//         .then((data) => {
//           console.log("Mise à jour du plan :", data);
//         })
//         .catch((err) => {
//           console.error("Erreur lors de la vérification du checkout :", err);
//         });
//     }
//   }, []);

//   return (
//     <div className="container mx-auto py-8">
//       <h1 className="text-3xl mb-4">Merci pour votre achat !</h1>
//       <p>Votre paiement a bien été effectué.</p>
//     </div>
//   );
// }

import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
// Importer l'icône CheckCircle depuis Lucide React
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    const planId = searchParams.get("plan");

    if (sessionId && planId) {
      fetch(
        `${
          import.meta.env.VITE_APP_API_BASE_URL
        }/api/subscriptions/verify-checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ sessionId, planId }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("Mise à jour du plan :", data);
          // Vous pouvez gérer un état local pour informer l'utilisateur
        })
        .catch((err) => {
          console.error("Erreur lors de la vérification du checkout :", err);
        });
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 p-4">
      <div className="card w-full max-w-md bg-base-200 shadow-xl">
        <div className="card-body">
          {/* Bannière de succès */}
          <div className="alert alert-success shadow-lg">
            <div className="flex items-center gap-2">
              {/* Icône de validation Lucide */}
              <CheckCircle className="h-6 w-6 text-success" />
              <span className="font-semibold">
                Paiement validé avec succès&nbsp;!
              </span>
            </div>
          </div>

          <h2 className="card-title mt-4 text-2xl">
            Merci pour votre achat&nbsp;!
          </h2>
          <p className="mt-2 text-base-content/70">
            Votre paiement a bien été effectué et votre abonnement est en cours
            de mise à jour.
          </p>

          <div className="card-actions justify-end mt-6">
            {/* Lien ou bouton d'action. 
                Si vous utilisez un <Link> de React Router, remplacez <a> par <Link to="/translate"> */}
            <a href="/translate" className="btn btn-primary">
              Continuer
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
