// src/utils/auth.js
const BASE_URL = "https://se-register-api.en.tripleten-services.com/v1";

// Función para registrar usuarios
export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error("Error en el registro");
  });
};

// Función para iniciar sesión
export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error("Error en el inicio de sesión");
  });
};

// Función para verificar el token
export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error("Token inválido");
  });
};
