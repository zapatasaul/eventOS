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
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
  },
  eventName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
    marginTop: 10,
  },
  eventDetails: {
    fontSize: 16,
    color: "#666666",
    marginTop: 5,
  },
  availableSpots: {
    fontSize: 14,
    color: "#888888",
    marginTop: 5,
  },
});
