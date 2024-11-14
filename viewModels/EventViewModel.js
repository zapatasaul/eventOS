//viewModels/EventViewModel.js
import { useState, useEffect } from "react";
import { getEvents, registerForEvent } from "../services/EventService";
import { getCurrentUserId } from "../services/AuthService"; // Asegúrate de tener una función para obtener el ID del usuario actual

export const useEventViewModel = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const registerEvent = async (eventId) => {
    try {
      const userId = getCurrentUserId(); // Obtener el ID del usuario actual
      const confirmation = await registerForEvent(eventId, userId); // Pasar el ID del usuario a la función de registro
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === eventId
            ? { ...event, availableSpots: event.availableSpots - 1 }
            : event
        )
      );
      return confirmation;
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return { events, loading, error, registerEvent };
};
