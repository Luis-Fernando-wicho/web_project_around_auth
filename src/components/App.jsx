import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";

import Login from "./Login/Login.jsx";
import Register from "./Login/Register.jsx";
import ProtectedRoute from "./Login/ProtectedRoute.jsx";
import InfoTooltip from "./Login/InfoTooltip.jsx";

import * as auth from "../utils/auth.js";

import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Estados para el tooltip de información
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [tooltipStatus, setTooltipStatus] = useState("");

  const navigate = useNavigate();

  // Verificar si hay token guardado al cargar la app
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // Si hay token, verificar si es válido
      auth
        .checkToken(token)
        .then((res) => {
          // Token válido - usuario autenticado
          setIsLoggedIn(true);
          setUserEmail(res.data.email);
          navigate("/"); // Ir a la página principal
        })
        .catch((err) => {
          // Token inválido - limpiar localStorage
          console.log("Token inválido:", err);
          localStorage.removeItem("token");
        })
        .finally(() => {
          setIsLoading(false); // Terminar carga
        });
    } else {
      // No hay token - usuario no autenticado
      setIsLoading(false);
    }
  }, [navigate]);

  const handleRegister = (email, password) => {
    auth
      .register(email, password)
      .then((res) => {
        // ✅ Registro exitoso
        console.log("Usuario registrado:", res.data);
        setTooltipStatus("success");
        setIsInfoTooltipOpen(true);
        navigate("/signin"); // Redirigir al login
      })
      .catch((err) => {
        // ❌ Error en el registro
        console.log("Error en registro:", err);
        setTooltipStatus("error");
        setIsInfoTooltipOpen(true);
      });
  };

  const handleLogin = (email, password) => {
    auth
      .authorize(email, password)
      .then((res) => {
        // ✅ Login exitoso
        if (res.token) {
          // Guardar token en localStorage
          localStorage.setItem("token", res.token);

          // Actualizar estado de la aplicación
          setIsLoggedIn(true);
          setUserEmail(email);

          // Redirigir a la página principal
          navigate("/");
        }
      })
      .catch((err) => {
        // ❌ Error en el login
        console.log("Error en login:", err);
        setTooltipStatus("error");
        setIsInfoTooltipOpen(true);
      });
  };

  const handleSignOut = () => {
    // Limpiar localStorage
    localStorage.removeItem("token");

    // Actualizar estado
    setIsLoggedIn(false);
    setUserEmail("");

    // Redirigir al login
    navigate("/signin");
  };

  const handleCloseTooltip = () => {
    setIsInfoTooltipOpen(false);
  };

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => console.error(`Error al cargar usuario: ${err}`));
  }, []);

  const handleUpdateUser = (data) => {
    (async () => {
      await api.setUserInfo(data.name, data.about).then((newData) => {
        setCurrentUser(newData);
      });
    })();
  };

  const handleUpdateAvatar = (data) => {
    (async () => {
      await api.setUserAvatar(data.avatar).then((newUserData) => {
        setCurrentUser(newUserData);
      });
    })();
  };

  const handleAddPlaceSubmit = (newCardData) => {
    (async () => {
      await api.addCard(newCardData).then((newCard) => {
        setCards([newCard, ...cards]);
      });
    })();
  };

  useEffect(() => {
    api
      .getCardList()
      .then((data) => setCards(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <CurrentUserContext.Provider
        value={{
          currentUser,
          handleUpdateUser,
          handleUpdateAvatar,
          handleAddPlaceSubmit,
        }}
      >
        <Routes>
          <Route
            path="/signup"
            element={
              <Register onRegister={handleRegister} isLoading={isLoading} />
            }
          />

          <Route
            path="/signin"
            element={<Login onLogin={handleLogin} isLoading={isLoading} />}
          />

          <Route
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <div className="page">
                  <Header userEmail={userEmail} onSignOut={handleSignOut} />
                  <Main cards={cards} setCards={setCards} />
                  <Footer />
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={handleCloseTooltip}
          status={tooltipStatus}
        />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
