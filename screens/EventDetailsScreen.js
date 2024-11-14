// screens/EventDetailsScreen.js
import React from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import { useEventViewModel } from "../viewModels/EventViewModel";

export default function EventDetailsScreen({ route }) {
  const { eventId } = route.params;
  const { events, registerEvent } = useEventViewModel();
  const event = events.find((e) => e.id === eventId);

  if (!event) return <Text style={styles.errorText}>Evento no encontrado</Text>;

  return (
    <View style={styles.container}>
      <Image source={{ uri: event.image }} style={styles.image} />
      <Text style={styles.eventName}>{event.name}</Text>
      <Text style={styles.eventDescription}>{event.description}</Text>
      <Text style={styles.eventDetails}>Lugar: {event.location}</Text>
      <Text style={styles.eventDetails}>Fecha: {event.date}</Text>
      <Text style={styles.eventDetails}>
        Cupos disponibles: {event.availableSpots}
      </Text>
      <Button
        title="Asegurar asistencia"
        onPress={() => registerEvent(eventId)}
        color="#6200EE"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: "#D32F2F",
    textAlign: "center",
    marginTop: 20,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
  eventName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 10,
  },
  eventDescription: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 20,
  },
  eventDetails: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 10,
  },
});
