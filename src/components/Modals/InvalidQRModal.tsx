import React from "react";
import { Image, View, Text, TouchableOpacity, Modal } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "./modalStyles";
import { darkRed } from "../../themeColors";

const imageSource = require("../../assets/blur.jpg");

interface InvalidQRModalProps {
  handleCloseModal: Function;
  showModal: boolean;
}

export const InvalidQRModal = ({
  handleCloseModal,
  showModal
}: InvalidQRModalProps) => {
  return (
    <>
      <Image source={imageSource} style={styles.image} />
      <Modal visible={showModal} transparent={true} animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              <AntDesign name="closecircle" size={69} color={darkRed} />
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
