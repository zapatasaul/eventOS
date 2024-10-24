//screens/EventDetailsScreen.js
import React from "react";
import { View, Text, Button } from "react-native";
import { useEventViewModel } from "../viewModels/EventViewModel";

export default function EventDetailsScreen({ route }) {
  const { eventId } = route.params;
  const { events, registerEvent } = useEventViewModel();
  const event = events.find((e) => e.id === eventId);

  if (!event) return <Text>Evento no encontrado</Text>;

  return (
    <View>
      <Text>{event.name}</Text>
      <Text>{event.description}</Text>
      <Text>Lugar: {event.location}</Text>
      <Text>Fecha: {event.date}</Text>
      <Text>Cupos disponibles: {event.availableSpots}</Text>
      <Button
        title="Asegurar asistencia"
        onPress={() => registerEvent(eventId)}
      />
    </View>
  );
}
