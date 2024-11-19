// screens/RegisteredEvents.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { firestore } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getCurrentUserId } from "../services/AuthService";
import QRCode from "react-native-qrcode-svg";
import moment from "moment";

export default function RegisteredEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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

  const handleEventPress = (event) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const currentDate = moment().format("YYYY-MM-DD");
  const upcomingEvents = events.filter((event) => event.date >= currentDate);
  const pastEvents = events.filter((event) => event.date < currentDate);

  if (loading) return <Text style={styles.loadingText}>Cargando...</Text>;
  if (error)
    return (
      <Text style={styles.errorText}>
        Error fetching registered events: {error.message}
      </Text>
    );

  return (
    <View style={styles.container}>
      <View style={styles.blueContainer} />
      <Text style={styles.sectionTitle}>Eventos Próximos</Text>
      <FlatList
        data={upcomingEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleEventPress(item)}>
            <View style={styles.card}>
              <Text style={styles.eventName}>{item.name}</Text>
              <Text style={styles.eventDetails}>{item.location}</Text>
              <Text style={styles.eventDetails}>{item.date}</Text>
              <Text style={styles.eventDescription}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <Text style={styles.sectionTitle}>Eventos Pasados</Text>
      <FlatList
        data={pastEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, styles.pastEventCard]}>
            <Text style={[styles.eventName, styles.pastEventName]}>
              {item.name}
            </Text>
            <Text style={styles.eventDetails}>{item.location}</Text>
            <Text style={styles.eventDetails}>{item.date}</Text>
            <Text style={styles.eventDescription}>{item.description}</Text>
          </View>
        )}
      />
      {selectedEvent && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                Código QR para {selectedEvent.name}
              </Text>
              <QRCode value={selectedEvent.id} size={200} />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f29f05",
    padding: 10,
    position: "relative",
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
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 10,
    marginTop: 20,
  },
  card: {
    backgroundColor: "#155e6f",
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
    shadowColor: "#155e6f",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  pastEventCard: {
    backgroundColor: "#E0E0E0",
    opacity: 0.8,
  },
  pastEventName: {
    color: "#155e6f",
  },
  eventName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#f29f05",
    marginBottom: 5,
  },
  eventDetails: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  eventDescription: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#f15c07",
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#6200EE",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  blueContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    borderBottomLeftRadius: 100,
    width: "200%",
    height: "50%",
    backgroundColor: "#fff",
    zIndex: 0,
  },
});
