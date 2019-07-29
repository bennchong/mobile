import React, { useState } from "react";
import QRCode from "react-native-qrcode-svg";

import {
  Dimensions,
  View,
  Modal,
  Text,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";

import { styles } from "./QrGeneratorStyles";

// https://github.com/dumbest/react-native-qrcode-svg-expo

interface QrGeneratorModalProps {
  isVisible: boolean;
  handleCancel: Function;
}

const QrCodeGenerator = (props: QrGeneratorModalProps) => {
  const [qrText, setQrText] = useState("VIEW");

  const handleCancel = () => {
    props.handleCancel();
  };

  const refreshQr = () => {
    setQrText(`${qrText} + "placeholder URL"`);
  };

  return (
    <Modal animationType="fade" transparent={true} visible={props.isVisible}>
      <TouchableHighlight onPress={handleCancel} style={styles.touchable}>
        <View style={styles.box}>
          <Text style={styles.text}>Share Workpass</Text>
          <TouchableOpacity onPress={refreshQr}>
            <QRCode
              value={qrText}
              size={Dimensions.get("screen").width * 0.6}
            />
          </TouchableOpacity>
          <Text style={styles.smallText}>tap the qr to refresh</Text>
          <Text style={styles.smallText}>tap anywhere to exit</Text>
        </View>
      </TouchableHighlight>
    </Modal>
  );
};

export { QrCodeGenerator };
