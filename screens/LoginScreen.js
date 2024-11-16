// screens/LoginScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import Icon from "react-native-vector-icons/FontAwesome";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate("Home");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Decoracion Blanca*/}
      <View style={styles.whiteContainer}>
        {/* Imagen y textos centrados */}
        <Image
          source={require("../assets/logoEvent_OS.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>EVENTOS</Text>
        <Text style={styles.subtitle}>A UN TOQUE</Text>
      </View>

      {/* Contenedor del centro */}
      <View style={styles.SubContainer}>
        <View style={styles.inputWrapper}>
          <Icon name="user" size={20} color="#f15c07" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Correo"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#f15c07"
          />
        </View>

        <View style={styles.inputWrapper}>
          <Icon name="lock" size={20} color="#f15c07" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#f15c07"
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.createAccountButton]}
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            <Text style={styles.buttonText}>Crear cuenta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f15c07",
    justifyContent: "center",
    alignItems: "center",
  },
  whiteContainer: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "75%",
    backgroundColor: "#fff",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    zIndex: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 200,
  },
  logo: {
    width: 150,
    height: 100,
    marginBottom: 10,
    resizeMode: "contain",
  },
  title: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#f15c07",
    marginBottom: 1,
  },
  subtitle: {
    fontSize: 24,
    color: "#f15c07",
    marginBottom: 100,
  },
  SubContainer: {
    position: "absolute",
    top: "37.5%",
    width: "90%",
    backgroundColor: "#155e6f",
    borderRadius: 30,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 50,
    zIndex: 1,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 30,
    backgroundColor: "#89c2d9",
  },
  icon: {
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    flex: 1,
    padding: 13,
    fontSize: 16,
    color: "#f15c07",
    fontWeight: "bold",
  },
  buttonContainer: {
    width: "90%",
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: 30,
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "#f29f05",
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "center",
  },
  createAccountButton: {
    backgroundColor: "#f15c07",
    marginLeft: "15%",
    width: "70%",
    padding: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
