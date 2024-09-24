import React, { useState } from "react";
import "./login.css";
// import { signIn } from "../../share/apiService";

//interface LogInProps {
//   setUser: React.Dispatch<React.SetStateAction<string[]>>;
// }

const LogIn = () => {
  const [nombre, setNombre] = useState<string>("");
  const [contraseña, setContraseña] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nombre.length < 4 || nombre.length > 10) {
      setError("El nombre de usuario debe tener entre 4 y 10 caracteres.");
      return;
    }

    const contraseñaRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{4,}$/;
    if (!contraseñaRegex.test(contraseña)) {
      setError(
        "La contraseña debe contener al menos una mayúscula, al menos un número y una longitud mínima de 4."
      );
      return;
    }
    localStorage.setItem("user", JSON.stringify({ nombre, contraseña }));
    console.log("Usuario guardado en localStorage:", { nombre, contraseña });
  };
  // const handleLogin = async (user: string) => {
  //   try {
  //     const response = await signIn({ nombre, contraseña });

  //   } catch (error) {
  //     console.error("Error signing in:", error);
  //   }
  // };

  return (
    <section className="login-section">
      <div className="login-banner">
      </div>
      <form className="login-formulario" onSubmit={handleSubmit}>
        <div className="input-container">
          <i className="icon-username"></i>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre de usuario"
          />
        </div>
        <div className="input-container">
          <i className="icon-password"></i>
          <input
            type="password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            placeholder="Contraseña"
          />
        </div>
        {/* <button onClick={() => handleLogin(nombre)}>Log In</button> */}
      </form>
      {error && <p>{error}</p>}
    </section>
  );
};

export default LogIn;