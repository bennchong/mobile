import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import PropTypes from "prop-types";
import { styles } from "./modalStyles";

export const VerifyModal = ({ handleCloseModal, showModal }) => {
  return (
    <Modal visible={showModal} transparent={true} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <AntDesign name="checkcircle" size={69} color="#5FC660" />
            <Text style={styles.modalText}>Digital work pass saved!</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleCloseModal()}
            >
              <Text style={styles.closeModalText}>View profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

VerifyModal.propTypes = {
  handleCloseModal: PropTypes.func,
  showModal: PropTypes.bool
};
