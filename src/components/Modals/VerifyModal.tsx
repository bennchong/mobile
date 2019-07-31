import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "./modalStyles";

interface IVerifyModalProps {
  showModal: boolean;
  handleCloseModal: () => any;
}

export const VerifyModal = ({
  handleCloseModal,
  showModal
}: IVerifyModalProps) => {
  return (
    <Modal visible={showModal} transparent={true} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <AntDesign name="checkcircle" size={50} color="#32CD32" />
            <Text style={styles.modalText}>Digital work pass saved!</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleCloseModal}
            >
              <Text>View profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
