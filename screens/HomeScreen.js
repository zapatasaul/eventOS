// screens/HomeScreen.js
import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Button,
  StyleSheet,
} from "react-native";
import { useEventViewModel } from "../viewModels/EventViewModel";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const { events, loading, error } = useEventViewModel();
  const navigation = useNavigation();

  if (loading) return <Text style={styles.loadingText}>Cargando...</Text>;
  if (error)
    return <Text style={styles.errorText}>Error: {error.message}</Text>;

  return (
    <View style={styles.container}>
      {/* Contenedor verde que cubre 3/4 de la pantalla desde abajo */}
      <View style={styles.greenContainer} />

      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("EventDetails", { eventId: item.id })
            }
          >
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.eventName}>{item.name}</Text>
              <Text style={styles.eventDetails}>
                {item.location} - {item.date}
              </Text>
              <Text style={styles.availableSpots}>
                Cupos disponibles: {item.availableSpots}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f29f05",
    padding: 10,
    position: "relative", // Para permitir la posición del contenedor verde
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
    backgroundColor: "#155e6f",
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
  },
  eventName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#f29f05",
    marginTop: 10,
  },
  eventDetails: {
    fontSize: 16,
    color: "#fff",
    marginTop: 5,
  },
  availableSpots: {
    fontSize: 14,
    color: "#f15c07",
    marginTop: 5,
    fontWeight: "bold",
  },
  greenContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    borderTopRightRadius: 100,
    width: "100%",
    height: "70%",
    backgroundColor: "#fff",
    zIndex: 0,
  },
});
