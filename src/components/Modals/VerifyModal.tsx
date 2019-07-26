import React from "react";
import Modal from "react-native-modal";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import metrics from "../../config/metrics";
import { AntDesign } from "@expo/vector-icons";

const VerifyModal = ({ onPress, showModal }) => {
  return (
    <Modal isVisible={showModal}>
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <AntDesign name="checkcircle" size={50} color="#32CD32" />
          <Text style={styles.modalText}>Digital work pass saved!</Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => onPress()}
          >
            <Text>View profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export { VerifyModal };

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: metrics.DEVICE_WIDTH / 2,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 50
  },
  acknowledgeText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#808080"
  },
  button: {
    backgroundColor: "#32CD32",
    borderRadius: 30,
    paddingHorizontal: 40,
    paddingVertical: 5,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  modalContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  modal: {
    width: (2 * metrics.DEVICE_WIDTH) / 3,
    height: (2 * metrics.DEVICE_WIDTH) / 3,
    borderRadius: 30,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  modalText: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
    textAlign: "center"
  },
  modalButton: {
    backgroundColor: "#f5f5f5",
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center"
  }
});
