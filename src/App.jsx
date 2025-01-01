// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopBar from "./components/TopBar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import GlossaryPage from "./pages/GlossaryPage";
import TranslationPage from "./pages/TranslationPage";
import AddEditGlossaryPage from "./pages/AddEditGlossaryPage";
import PrivateRoute from "./components/PrivateRoute";
import SubscriptionPage from "./pages/SubscriptionPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import SubscriptionAlert from "./components/SubscriptionAlert";
import SuccessPage from "./pages/SuccessPage";

function App() {
  return (
    <Router>
      <TopBar />
      <SubscriptionAlert />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/payment/success" element={<SuccessPage />} />
        <Route path="/alert" element={<SubscriptionAlert />} />
        <Route
          path="/translate"
          element={
            <PrivateRoute>
              <TranslationPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/glossaries"
          element={
            <PrivateRoute>
              <GlossaryPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/glossaries/add"
          element={
            <PrivateRoute>
              <AddEditGlossaryPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/glossaries/edit/:id"
          element={
            <PrivateRoute>
              <AddEditGlossaryPage />
            </PrivateRoute>
          }
        />

        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/subscriptions"
          element={
            <PrivateRoute>
              <SubscriptionPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/payment/success"
          element={
            <PrivateRoute>
              <PaymentSuccessPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
