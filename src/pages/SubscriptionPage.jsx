import { useState, useEffect } from "react";
import { CreditCard, Check, AlertTriangle, Lock } from "lucide-react";
import UsageStats from "../components/UsageStats";
import { useNavigate } from "react-router-dom";

const SUBSCRIPTION_PLANS = {
  free: {
    name: "Free",
    price: "0€",
    features: [
      "Basique (Chat + Dictionnaire)",
      "Limitation sur la longueur",
      "Publicités ou watermark",
      "Support forum ou email (48h+)",
    ],
    limits: {
      translations: 50,
      characters: 50000,
      glossaries: 1,
    },
    availableModels: ["gemini"],
  },
  starter: {
    name: "Starter",
    price: "8000 FCFA",
    features: [
      "Chat + Traduction + Correction",
      "Longueur raisonnable",
      "Stats simples",
      "Support email standard (24-48h)",
    ],
    limits: {
      translations: 300,
      characters: 300000,
      glossaries: 5,
    },
    availableModels: ["gemini", "gpt"],
  },
  pro: {
    name: "Pro",
    price: "25000 FCFA",
    features: [
      "Toutes les fonctionnalités",
      "Priorité de réponse",
      "Rapports avancés",
      "Support prioritaire (sous 4h)",
    ],
    limits: {
      translations: 1000,
      characters: 1000000,
      glossaries: 20,
    },
    availableModels: ["gemini", "gpt", "claude"],
  },
  enterprise: {
    name: "Enterprise",
    price: "Sur devis",
    features: [
      "Accès illimité",
      "SLA + Contrat spécifique",
      "Personnalisation complète",
      "Support dédié (ligne directe)",
    ],
    limits: {
      translations: Infinity,
      characters: Infinity,
      glossaries: Infinity,
    },
    availableModels: ["gemini", "gpt", "claude"],
  },
};

export default function SubscriptionPage() {
  const [currentPlan, setCurrentPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;
  const navigate = useNavigate();

  const fetchSubscriptionStatus = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/subscriptions/status`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (response.ok) {
        setCurrentPlan(data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Erreur lors de la récupération du statut");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptionStatus();
  }, []);

  const handleSubscribe = async (planId) => {
    try {
      if (planId === "enterprise") {
        window.location.href =
          "mailto:support@palabresak2.com?subject=Demande plan Enterprise";
        return;
      }

      if (planId === "free" && currentPlan?.plan !== "free") {
        const confirmed = window.confirm(
          "En passant au plan gratuit, vous perdrez l'accès aux fonctionnalités premium. Continuer ?"
        );
        if (!confirmed) return;
      }

      const response = await fetch(
        `${apiUrl}/api/subscriptions/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ planId }),
        }
      );

      const data = await response.json();

      if (response.ok && data.url) {
        window.location.href = data.url;
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Erreur lors de la création de la session de paiement");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Nos Abonnements</h1>

      {error && (
        <div className="alert alert-error mb-8 shadow-lg">
          <AlertTriangle className="w-6 h-6" />
          <p>{error}</p>
        </div>
      )}

      {currentPlan && <UsageStats />}

      {currentPlan?.renewalWarning && (
        <div className="alert alert-warning mb-8 shadow-lg">
          <AlertTriangle className="w-6 h-6" />
          <p>
            Votre abonnement {currentPlan.plan} sera renouvelé dans{" "}
            {currentPlan.daysUntilRenewal} jours.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(SUBSCRIPTION_PLANS).map(([planId, plan]) => (
          <div
            key={planId}
            className={`card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 ${
              currentPlan?.plan === planId ? "border-2 border-primary" : ""
            }`}
          >
            <div className="card-body">
              <div className="flex justify-between items-center mb-4">
                <h2 className="card-title text-xl">{plan.name}</h2>
                {currentPlan?.plan === planId && (
                  <span className="badge badge-primary">Plan actuel</span>
                )}
              </div>

              <p className="text-3xl font-bold mb-2">{plan.price}</p>

              <div className="text-sm text-base-content/70 mb-4">
                <p>{plan.limits.translations} traductions/mois</p>
                <p>{plan.limits.characters.toLocaleString()} caractères/mois</p>
                <p>{plan.limits.glossaries} glossaires</p>
              </div>

              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-success flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="text-sm mb-4">
                <p className="font-semibold mb-2">Modèles disponibles :</p>
                <div className="flex flex-wrap gap-2">
                  {plan.availableModels.map((model) => (
                    <span key={model} className="badge badge-outline">
                      {model}
                    </span>
                  ))}
                </div>
              </div>

              <div className="card-actions justify-end mt-auto">
                {currentPlan?.plan === planId ? (
                  <button className="btn btn-disabled w-full">
                    Plan actuel
                  </button>
                ) : planId === "enterprise" ? (
                  <button
                    onClick={() => handleSubscribe(planId)}
                    className="btn btn-outline w-full"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Contactez-nous
                  </button>
                ) : (
                  <button
                    onClick={() => handleSubscribe(planId)}
                    className={`btn ${
                      planId === "free" ? "btn-warning" : "btn-primary"
                    } w-full ${loading ? "loading" : ""}`}
                    disabled={loading}
                  >
                    {!loading && <CreditCard className="w-4 h-4 mr-2" />}
                    {planId === "free" ? "Passer au gratuit" : "S'abonner"}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <h3 className="text-lg font-semibold mb-2">
          Besoin d'aide pour choisir ?
        </h3>
        <p className="text-base-content/70">
          Contactez notre équipe à{" "}
          <a href="mailto:support@palabresak2.com" className="text-primary">
            support@palabresak2.com
          </a>{" "}
          pour plus d'informations.
        </p>
      </div>
    </div>
  );
}
