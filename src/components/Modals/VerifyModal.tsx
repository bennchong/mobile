import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "./modalStyles";
import { RegisterPassCode } from "../Profile/VerifyProfile/RegisterPassCode";

interface IVerifyModalProps {
  showModal: boolean;
  handleCloseModal: () => any;
}

/* eslint-disable no-unused-vars */
enum pageEnum {
  FINGERPRINT,
  PASSCODE,
  SUCCESS_MODAL
}
/* eslint-enable */

export const VerifyModal = ({
  handleCloseModal,
  showModal
}: IVerifyModalProps) => {
  const [page, setPage] = useState(pageEnum.PASSCODE);

  const showSuccess = () => {
    setPage(pageEnum.SUCCESS_MODAL);
  };

  const PassCode = () => (
    <>
      <AntDesign
        name="close"
        size={30}
        color="#000"
        style={styles.closeIcon}
        onPress={() => handleCloseModal()}
      />
      <RegisterPassCode showSuccess={showSuccess} />
    </>
  );

  const SuccessMessage = () => (
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
  );

  let ModalBody;
  switch (page) {
    case pageEnum.PASSCODE:
      ModalBody = PassCode;
      break;
    default:
      ModalBody = SuccessMessage;
  }

  return (
    <Modal visible={showModal} transparent={true} animationType="fade">
      <View style={styles.overlay}>
        <ModalBody />
      </View>
    </Modal>
  );
};
