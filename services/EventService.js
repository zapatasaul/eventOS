// src/services/EventService.js
import { firestore } from "../firebase";

// Obtener todos los eventos
export const getEvents = async () => {
  try {
    const snapshot = await firestore.collection("events").get();
    const events = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return events;
  } catch (error) {
    console.error("Error al obtener eventos de Firestore:", error);
    throw error;
  }
};

// Registrar asistencia a un evento
export const registerForEvent = async (eventId) => {
  const eventRef = firestore.collection("events").doc(eventId);

  try {
    const eventDoc = await eventRef.get();
    const eventData = eventDoc.data();

    if (eventData && eventData.availableSpots > 0) {
      await eventRef.update({
        availableSpots: eventData.availableSpots - 1,
      });
      return { success: true, message: "Registro exitoso" };
    } else {
      return { success: false, message: "No hay cupos disponibles" };
    }
  } catch (error) {
    console.error("Error al registrar asistencia:", error);
    throw error;
  }
};
