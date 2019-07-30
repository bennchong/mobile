import React, { useState } from "react";
import QRCode from "react-native-qrcode-svg";
import {
  View,
  Modal,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Image
} from "react-native";

import { styles } from "./QrGeneratorStyles";
import metrics from "../config/metrics";
import { getCurrentDateAndTime } from "../services/date";

// https://github.com/dumbest/react-native-qrcode-svg-expo

interface QrGeneratorModalProps {
  isVisible: boolean;
  handleCancel: Function;
  photo: string;
  name: string;
  fin: string;
}

export const QrCodeGenerator = (props: QrGeneratorModalProps) => {
  const [qrText, setQrText] = useState("VIEW");

  const handleCancel = () => {
    props.handleCancel();
  };

  const refreshQr = () => {
    setQrText(`${qrText} + "placeholder URL"`);
  };

  return (
    <Modal animationType="fade" transparent={true} visible={props.isVisible}>
      <Text style={styles.text}>Ask requestor to scan QR code</Text>

      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: `data:image/gif;base64,${props.photo}` }}
        />
      </View>

      <TouchableHighlight onPress={handleCancel} style={styles.touchable}>
        <View style={styles.box}>
          <View style={styles.textContainer}>
            <Text style={styles.fin}>{props.fin}</Text>
            <Text style={styles.name}>{props.name}</Text>
          </View>
          <TouchableOpacity onPress={refreshQr}>
            <View style={styles.qrContainer}>
              <QRCode value={qrText} size={metrics.MODAL_QR} />
            </View>
          </TouchableOpacity>
          <Text style={styles.dateText}>Created {getCurrentDateAndTime()}</Text>
          <Text style={styles.exitText}>Tap anywhere to exit</Text>
        </View>
      </TouchableHighlight>
    </Modal>
  );
};
