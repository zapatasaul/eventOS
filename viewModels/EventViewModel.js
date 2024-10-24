//viewModels/EventViewModel.js
import { useState, useEffect } from "react";
import { getEvents, registerForEvent } from "../services/EventService";

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
      const confirmation = await registerForEvent(eventId);
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
