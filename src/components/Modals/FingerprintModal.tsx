import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "./modalStyles";

interface FingerprintModalProps {
  handleCloseModal: any;
  showModal: boolean;
}

export const FingerprintModal = ({
  handleCloseModal,
  showModal
}: FingerprintModalProps) => {
  return (
    <Modal visible={showModal} transparent={true} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <MaterialCommunityIcons
              name="fingerprint"
              size={69}
              color="#3557b7"
            />
            <Text style={styles.modalText}>Scan Fingerprint</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleCloseModal}
            >
              <Text style={styles.closeModalText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
