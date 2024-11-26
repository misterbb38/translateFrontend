import TranslationPage from "./TranslationPage";

// src/pages/HomePage.jsx
export default function HomePage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">
        Bienvenue sur l'application de traduction
      </h1>
      <p className="mt-4">
        Cette application vous permet de traduire du texte en utilisant des
        glossaires personnalisés.
      </p>
      <TranslationPage />
    </div>
  );
}
