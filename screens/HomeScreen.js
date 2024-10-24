//screens/HomeScreen.js
import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { useEventViewModel } from "../viewModels/EventViewModel";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const { events, loading, error } = useEventViewModel();
  const navigation = useNavigation();

  if (loading) return <Text>Cargando...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("EventDetails", { eventId: item.id })
            }
          >
            <View style={{ padding: 10 }}>
              <Image
                source={{ uri: item.image }}
                style={{ width: "100%", height: 150 }}
              />
              <Text>{item.name}</Text>
              <Text>
                {item.location} - {item.date}
              </Text>
              <Text>Cupos disponibles: {item.availableSpots}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
