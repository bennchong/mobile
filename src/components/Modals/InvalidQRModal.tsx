import React from "react";
import { Image, View, Text, TouchableOpacity, Modal } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import PropTypes from "prop-types";
import { styles } from "./modalStyles";

const imageSource = require("../../assets/blur.jpg");

export const InvalidQRModal = ({ handleCloseModal, showModal }) => {
  return (
    <>
      <Image
        source={imageSource}
        style={{ resizeMode: "cover", height: "100%" }}
      />
      <Modal visible={showModal} transparent={true} animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              <AntDesign name="closecircle" size={69} color="#D52D2D" />
              <Text style={styles.modalText}>Invalid QR Code Detected</Text>
              <Text style={styles.modalSecondaryText}>
                Ensure you are scanning a MOM work pass ID QR code
              </Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => handleCloseModal()}
              >
                <Text style={styles.closeModalText}>Try Again</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

InvalidQRModal.propTypes = {
  handleCloseModal: PropTypes.func,
  showModal: PropTypes.bool
};
