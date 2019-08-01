import React from "react";
import QRCode from "react-native-qrcode-svg";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./sharePageStyles";
import metrics from "../../config/metrics";

interface QrGeneratorProps {
  refreshQr: any;
  qrText: string;
  timeCreated: string;
}

export const QrGenerator = (props: QrGeneratorProps) => {
  return (
    <>
      <TouchableOpacity onPress={props.refreshQr}>
        <View style={styles.qrContainer}>
          <QRCode value={props.qrText} size={metrics.MODAL_QR} />
        </View>
      </TouchableOpacity>
      <Text style={styles.dateText}>Created {props.timeCreated}</Text>
      <Text style={styles.exitText}>Tap anywhere to exit</Text>
    </>
  );
};
