// services/AuthService.js
import { getAuth } from "firebase/auth";

// Función para obtener el ID del usuario actual
export const getCurrentUserId = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    return user.uid; // Devuelve el ID del usuario
  } else {
    throw new Error("No hay un usuario autenticado");
  }
};
