// services/EventService.js
import { firestore } from "../firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

// Obtener todos los eventos
export const getEvents = async () => {
  try {
    const eventsCollection = collection(firestore, "events");
    const snapshot = await getDocs(eventsCollection);
    const events = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return events;
  } catch (error) {
    console.error("Error al obtener eventos de Firestore:", error);
    throw error;
  }
};

// Registrar asistencia a un evento
export const registerForEvent = async (eventId) => {
  const eventRef = doc(firestore, "events", eventId);

  try {
    const eventDoc = await getDoc(eventRef);
    const eventData = eventDoc.data();

    if (eventData && eventData.availableSpots > 0) {
      await updateDoc(eventRef, {
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
