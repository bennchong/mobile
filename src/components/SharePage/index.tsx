import React, { useState } from "react";
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  Image,
  Alert
} from "react-native";
import { QrGenerator } from "./QrGenerator";
import { CustomFields } from "./CustomFields";
import { styles } from "./SharePageStyles";
import {
  handleObfuscation,
  profileSelector
} from "../../services/obfuscation/obfuscationHandler";
import { useStateValue } from "../../state";

/* eslint-disable global-require */
const imageSource = require("../../assets/blur2.jpg");
global.Buffer = global.Buffer || require("buffer").Buffer;
/* eslint-enable global-require */

interface SharePageContainerProps {
  isVisible: boolean;
  handleCancel: Function;
  photo: string;
  name: string;
  profileSelected: number;
}

/* eslint-disable no-unused-vars */
enum pageEnum {
  PROFILE_SELECTOR,
  CUSTOM_FIELDS,
  QR_GENERATOR
}
/* eslint-enable */

export const SharePageContainer = ({
  isVisible,
  handleCancel,
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
    handleCancel();
    setPage(pageEnum.PROFILE_SELECTOR);
  };

  const showQR = doc => {
    setWorkpass(doc);
    setPage(pageEnum.QR_GENERATOR);
  };

  const handleProfileSelector = (profile, detailsShown) => {
    const { obfuscatedDoc, detailsString } = handleObfuscation(
      detailsShown,
      selectedWorkpass
    );

    Alert.alert(
      `Share the following details with ${profile}`,
      `${detailsString}`,
      [
        {
          text: "No"
        },
        {
          text: "Yes",
          onPress: () => {
            showQR(obfuscatedDoc);
          }
        }
      ],
      { cancelable: false }
    );
  };

  const QrAsModal = () => (
    <QrGenerator obfuscatedWorkpass={obfuscatedWorkpass} />
  );
  const CustomFieldsAsModal = () => (
    <CustomFields showQR={showQR} workpass={selectedWorkpass} />
  );
  const ProfileSelectorAsModal = () => (
    <>
      <Text style={styles.infoText}>Select profile to share with</Text>
      <View style={{ padding: 16 }}>
        {profileSelector.map(item => (
          <TouchableOpacity
            key={item.profile}
            style={styles.profileSelector}
            onPress={() => {
              handleProfileSelector(item.profile, item.detailsShown);
            }}
          >
            <Text style={styles.profileSelectorText}>{item.profile}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.profileSelector}
          onPress={() => setPage(pageEnum.CUSTOM_FIELDS)}
        >
          <Text style={styles.profileSelectorText}>
            Select customized field
          </Text>
        </TouchableOpacity>
      </View>
    </>
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
