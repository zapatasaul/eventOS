// services/EventService.js
import { firestore } from "../firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  setDoc,
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
export const registerForEvent = async (eventId, userId) => {
  const eventRef = doc(firestore, "events", eventId);
  const registeredEventRef = doc(
    firestore,
    "registeredEvents",
    `${eventId}_${userId}`
  );

  try {
    const eventDoc = await getDoc(eventRef);
    const eventData = eventDoc.data();

    if (eventData && eventData.availableSpots > 0) {
      // Actualizar el número de cupos disponibles en la colección de eventos
      await updateDoc(eventRef, {
        availableSpots: eventData.availableSpots - 1,
      });

      // Registrar el evento en la colección registeredEvents con el ID del usuario
      await setDoc(registeredEventRef, {
        date: eventData.date,
        description: eventData.description,
        id_usuario: userId,
        location: eventData.location,
        name: eventData.name,
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
