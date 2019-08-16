import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "./modalStyles";
import { PassCode } from "../Authentication/PassCode";
import { Fingerprint } from "../Authentication/Fingerprint";

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

  // const checkForAuthenticationCompatibility = async () => {
  //   //  A value of 1 indicates Fingerprint support and 2 indicates Facial Recognition support.
  //   // Eg: [1,2] means the device has both types supported.
  //   const supportedHardware = await LocalAuthentication.supportedAuthenticationTypesAsync();
  //   const isEnrolled = await LocalAuthentication.isEnrolledAsync();
  //   if (supportedHardware.includes(1) && isEnrolled) {
  //     setPage(pageEnum.FINGERPRINT);
  //   }
  // };

  // useEffect(() => {
  //   checkForAuthenticationCompatibility();
  // }, []);

  const showSuccess = () => {
    setPage(pageEnum.SUCCESS_MODAL);
  };

  const EnableFingerprint = () => (
    <>
      <AntDesign
        name="close"
        size={30}
        color="#000"
        style={styles.closeIcon}
        onPress={() => handleCloseModal()}
      />
      <Fingerprint nextPage={() => setPage(pageEnum.PASSCODE)} />
    </>
  );

  const EnterPassCode = () => (
    <>
      <AntDesign
        name="close"
        size={30}
        color="#000"
        style={styles.closeIcon}
        onPress={() => handleCloseModal()}
      />
      <PassCode showSuccess={showSuccess} register={true} />
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
      ModalBody = EnterPassCode;
      break;
    case pageEnum.FINGERPRINT:
      ModalBody = EnableFingerprint;
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
