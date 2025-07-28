import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./login.css";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";

const LogIn = () => {
  const { t } = useTranslation();
  const [nombre, setNombre] = useState<string>("");
  const [contraseña, setContraseña] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nombre.length < 4 || nombre.length > 10) {
      setError(t("login.usernameError"));
      return;
    }

    const contraseñaRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{4,}$/;
    if (!contraseñaRegex.test(contraseña)) {
      setError(t("login.passwordError"));
      return;
    }

    localStorage.setItem("user", JSON.stringify({ nombre, contraseña }));
    console.log("Usuario guardado en localStorage:", { nombre, contraseña });
    setError(""); // limpiar mensaje de error al hacer submit correctamente
  };

  return (
    <>
    <Header/>
      <section className="login-section">
        <div className="login-banner"></div>
        <form className="login-formulario" onSubmit={handleSubmit}>
          <div className="input-container">
            <i className="icon-username"></i>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder={t("login.usernamePlaceholder")}
            />
          </div>
          <div className="input-container">
            <i className="icon-password"></i>
            <input
              type="password"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              placeholder={t("login.passwordPlaceholder")}
            />
          </div>
          <button type="submit">{t("login.submitButton")}</button>
        </form>
        {error && <p className="login-error">{error}</p>}
      </section>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default LogIn;
