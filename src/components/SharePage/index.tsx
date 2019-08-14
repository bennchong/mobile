import React, { useState } from "react";
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  Image,
  Alert
} from "react-native";
import { obfuscateDocument } from "@govtechsg/open-attestation";
import { QrGenerator } from "./QrGenerator";
import { CustomFields } from "./CustomFields";
import { styles } from "./sharePageStyles";
import { obfuscateFields, profileSelector } from "./obfuscateFields";
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
}

export const SharePageContainer = ({
  isVisible,
  handleCancel,
  photo,
  name
}: SharePageContainerProps) => {
  const [page, setPage] = useState(0); // Profile Selector: 0, Custom: 1, QR: 2
  const [{ workpass }] = useStateValue();
  const [obfuscatedWorkpass, setWorkpass] = useState(workpass);
  let ModalBody;

  const closeModal = () => {
    handleCancel();
    setPage(0);
  };

  const showQR = doc => {
    setWorkpass(doc);
    setPage(2);
  };

  const handleObfuscation = (profile, detailsShown) => {
    const obfuscatedDetails = obfuscateFields.filter(o => {
      return !detailsShown.some(o2 => o.key === o2);
    });

    const details = [];
    obfuscateFields.forEach(o => {
      detailsShown.forEach(o2 => {
        if (o.key === o2) {
          details.push(o.title);
        }
      });
    });
    const detailsString = details.join(", ");

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
            let obfuscatedDoc = workpass;
            obfuscatedDetails.forEach(item => {
              obfuscatedDoc = obfuscateDocument(obfuscatedDoc, item.key);
            });

            showQR(obfuscatedDoc);
          }
        }
      ],
      { cancelable: false }
    );
  };

  switch (page) {
    case 2:
      ModalBody = () => <QrGenerator obfuscatedWorkpass={obfuscatedWorkpass} />;
      break;
    case 1:
      ModalBody = () => <CustomFields showQR={showQR} workpass={workpass} />;
      break;
    default:
      ModalBody = () => (
        <>
          <Text style={styles.infoText}>Select profile to share with</Text>
          <View style={{ padding: 16 }}>
            {profileSelector.map(item => (
              <TouchableOpacity
                key={item.profile}
                style={styles.profileSelector}
                onPress={() => {
                  handleObfuscation(item.profile, item.detailsShown);
                }}
              >
                <Text style={styles.profileSelectorText}>{item.profile}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.profileSelector}
              onPress={() => setPage(1)}
            >
              <Text style={styles.profileSelectorText}>Custom</Text>
            </TouchableOpacity>
          </View>
        </>
      );
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
