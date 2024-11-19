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
      {/* Contenedor azul que cubre 3/4 de la pantalla */}
      <View style={styles.blueContainer} />

      <Image source={{ uri: event.image }} style={styles.image} />
      <Text style={styles.eventName}>{event.name}</Text>
      <Text style={styles.eventDescription}>{event.description}</Text>
      <Text style={styles.eventDetails}>Lugar: {event.location}</Text>
      <Text style={styles.eventDetails}>Fecha: {event.date}</Text>
      <Text style={styles.eventDetails}>
        Cupos disponibles: {event.availableSpots}
      </Text>
      {/* Botón con fondo azul */}
      <View style={styles.buttonContainer}>
        <Button
          title="Asegurar asistencia"
          onPress={() => registerEvent(eventId)}
          color="#fff" // Color del texto
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
    position: "relative",
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
    color: "#f15c05",
    marginBottom: 10,
  },
  eventDescription: {
    fontSize: 19,
    color: "#f29f05",
    fontWeight: "bold",
    marginBottom: 15,
  },
  eventDetails: {
    fontSize: 16,
    color: "#155e6f",
    marginBottom: 10,
  },
  blueContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    borderTopRightRadius: 100,
    width: "100%",
    height: "38%",
    backgroundColor: "#f29f05",
    zIndex: 0,
  },
  buttonContainer: {
    width: "100%",
    padding: 10,
    backgroundColor: "#155e6f",
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "center",
  },
});
