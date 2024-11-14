// screens/RegisteredEvents.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { firestore } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getCurrentUserId } from "../services/AuthService";

export default function RegisteredEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const userId = getCurrentUserId(); // Obtener el ID del usuario actual
        const eventsQuery = query(
          collection(firestore, "registeredEvents"),
          where("id_usuario", "==", userId)
        );
        const querySnapshot = await getDocs(eventsQuery);
        const eventsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(eventsList);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <Text style={styles.loadingText}>Cargando...</Text>;
  if (error)
    return (
      <Text style={styles.errorText}>
        Error fetching registered events: {error.message}
      </Text>
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.eventName}>{item.name}</Text>
            <Text style={styles.eventDetails}>{item.location}</Text>
            <Text style={styles.eventDetails}>{item.date}</Text>
            <Text style={styles.eventDescription}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 10,
  },
  loadingText: {
    fontSize: 18,
    color: "#6200EE",
    textAlign: "center",
    marginTop: 20,
  },
  errorText: {
    fontSize: 18,
    color: "#D32F2F",
    textAlign: "center",
    marginTop: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  eventName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 5,
  },
  eventDetails: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 5,
  },
  eventDescription: {
    fontSize: 14,
    color: "#888888",
    marginTop: 5,
  },
});
