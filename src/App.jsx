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

function App() {
  return (
    <Router>
      <TopBar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              {" "}
              <HomePage />{" "}
            </PrivateRoute>
          }
        />
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
      </Routes>
    </Router>
  );
}

export default App;
