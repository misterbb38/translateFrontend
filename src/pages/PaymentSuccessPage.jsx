// src/pages/PaymentSuccessPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function PaymentSuccessPage() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirection automatique après 5 secondes
    const timer = setTimeout(() => {
      navigate("/translate");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <CheckCircle className="w-16 h-16 text-success mb-4" />
          <h2 className="card-title">Paiement réussi !</h2>
          <p>Votre abonnement a été activé avec succès.</p>
          <p className="text-sm mt-4">Redirection automatique...</p>
        </div>
      </div>
    </div>
  );
}
