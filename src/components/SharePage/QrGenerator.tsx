import React, { useState, useEffect } from "react";
import QRCode from "react-native-qrcode-svg";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions
} from "react-native";
import { styles } from "./sharePageStyles";
import { getCurrentDateAndTime } from "../../services/date";
import { uploadWorkpass } from "../../services/transferAPI";

interface QrGeneratorProps {
  obfuscatedWorkpass: object;
}

export const QrGenerator = (props: QrGeneratorProps) => {
  const [isUploading, toggleIsUploading] = useState(true);
  const [timeCreated, updateTimeCreated] = useState(getCurrentDateAndTime());
  const [qrText, setQrText] = useState("NULL");

  useEffect(() => {
    uploadWorkpass(props.obfuscatedWorkpass).then(res => {
      setQrText(
        `${"VIEW;https://api-ropsten.opencerts.io/storage/get/"}${res.id};${
          res.type
        };${res.key}`
      );
      toggleIsUploading(false);
    });
  }, []);

  const refreshQr = () => {
    toggleIsUploading(true);
    uploadWorkpass(props.obfuscatedWorkpass).then(res => {
      setQrText(
        `${"VIEW;https://api-ropsten.opencerts.io/storage/get/"}${res.id};${
          res.type
        };${res.key}`
      );
      toggleIsUploading(false);
    });
    updateTimeCreated(getCurrentDateAndTime());
  };

  return (
    <>
      <TouchableOpacity onPress={refreshQr}>
        <View style={styles.qrContainer}>
          {isUploading ? (
            <ActivityIndicator size={160} />
          ) : (
            <QRCode
              value={qrText}
              size={Dimensions.get("screen").width * 0.6}
            />
          )}
        </View>
      </TouchableOpacity>
      <Text style={styles.dateText}>Created {timeCreated}</Text>
      <Text style={styles.exitText}>Tap anywhere to exit</Text>
    </>
  );
};
