import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { Feather } from "@expo/vector-icons";
import PropTypes from "prop-types";
import { styles } from "./modalStyles";
import { white, midDarkGrey } from "../../themeColors";

export const NoWifiModal = ({ handleCloseModal, showModal }) => {
  return (
    <Modal visible={showModal} transparent={true} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Feather name="wifi-off" size={77} color="#4E4C4C" />
            <Text style={styles.modalText}>No Internet Connection</Text>
            <Text style={styles.modalSecondaryText}>
              Can&apos;t update pass status.{"\n"} Check your connection and
              refresh.
            </Text>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: midDarkGrey }]}
              onPress={() => handleCloseModal()}
            >
              <Text style={[styles.closeModalText, { color: white }]}>
                View Offline
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

NoWifiModal.propTypes = {
  handleCloseModal: PropTypes.func,
  showModal: PropTypes.bool
};
