import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";
import { auth } from "./firebase"; // Asegúrate de tener la ruta correcta
import { signOut } from "firebase/auth";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import RegisteredEvents from "./screens/RegisteredEventsScreen";
import EventDetailsScreen from "./screens/EventDetailsScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabNavigator({ navigation }) {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.replace("LoginScreen");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      alert("Error al cerrar sesión");
    }
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Eventos Registrados") {
            iconName = "list";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          backgroundColor: "#f15c07", // Fondo de la barra
        },
        tabBarLabelStyle: {
          color: "#fff",
          fontWeight: "bold",
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#fff",
        headerRight: () => (
          <TouchableOpacity onPress={handleSignOut} style={{ marginRight: 15 }}>
            <Ionicons name="log-out-outline" size={24} color="#f15c07" />
          </TouchableOpacity>
        ),
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Inicio",
          headerTitleAlign: "center",
        }}
      />
      <Tab.Screen
        name="Eventos Registrados"
        component={RegisteredEvents}
        options={{
          headerTitleAlign: "center",
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="LoginScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen
            name="Home"
            component={BottomTabNavigator}
            options={{
              headerShown: false,
              gestureEnabled: false, // Evita que el usuario pueda volver atrás con gestos
            }}
          />
          <Stack.Screen
            name="EventDetails"
            component={EventDetailsScreen}
            options={{
              headerShown: true,
              title: "Detalles del Evento",
              headerTitleAlign: "center",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
