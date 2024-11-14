// AppNavigator.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import RegisteredEvents from "./screens/RegisteredEventsScreen";
import EventDetailsScreen from "./screens/EventDetailsScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="RegisteredEvents" component={RegisteredEvents} />
        <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
