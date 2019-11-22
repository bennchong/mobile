import React, { useState } from "react";
import { View, Modal, Text, TouchableOpacity, Image } from "react-native";
import { QRModal } from "./QRModal";
import { CustomFieldsModal } from "./CustomFieldsModal";
import { styles } from "./SharePageStyles";
import { useStateValue } from "../../../../../../../state";
import { ProfileSelectorModal } from "./ProfileSelectorModal";

/* eslint-disable global-require */
const imageSource = require("../../../../../../../assets/blur2.jpg");
global.Buffer = global.Buffer || require("buffer").Buffer;
/* eslint-enable global-require */

interface SharePageContainerProps {
  isVisible: boolean;
  setVisible: Function;
  photo: string;
  name: string;
  profileSelected: number;
}

/* eslint-disable no-unused-vars */
export enum pageEnum {
  PROFILE_SELECTOR,
  CUSTOM_FIELDS,
  QR_GENERATOR
}
/* eslint-enable */

export const SharePageContainer = ({
  isVisible,
  setVisible,
  photo,
  name,
  profileSelected
}: SharePageContainerProps) => {
  const [page, setPage] = useState(pageEnum.PROFILE_SELECTOR);
  const [{ profilesArray }] = useStateValue();
  const [obfuscatedWorkpass, setWorkpass] = useState(profilesArray[0].workpass);
  const selectedWorkpass = profilesArray[profileSelected].workpass;
  let ModalBody;

  const closeModal = () => {
    setVisible(false);
    setPage(pageEnum.PROFILE_SELECTOR);
  };

  const showQR = profile => {
    setWorkpass(profile);
    setPage(pageEnum.QR_GENERATOR);
  };

  const QrAsModal = () => <QRModal obfuscatedWorkpass={obfuscatedWorkpass} />;
  const CustomFieldsAsModal = () => (
    <CustomFieldsModal showQR={showQR} workpass={selectedWorkpass} />
  );
  const ProfileSelectorAsModal = () => (
    <ProfileSelectorModal
      showQR={showQR}
      setPage={setPage}
      selectedWorkpass={selectedWorkpass}
    />
  );

  switch (page) {
    case pageEnum.QR_GENERATOR:
      ModalBody = QrAsModal;
      break;
    case pageEnum.CUSTOM_FIELDS:
      ModalBody = CustomFieldsAsModal;
      break;
    default:
      ModalBody = ProfileSelectorAsModal;
  }

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <Image source={imageSource} style={styles.overlay} />
      <Text style={styles.text}>Ask requestor to scan QR code</Text>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: `data:image/gif;base64,${photo}` }}
        />
      </View>
      <TouchableOpacity onPress={closeModal} style={styles.touchable}>
        <View style={styles.box}>
          <View style={styles.textContainer}>
            <Text style={styles.name}>{name}</Text>
          </View>
          <ModalBody />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};
