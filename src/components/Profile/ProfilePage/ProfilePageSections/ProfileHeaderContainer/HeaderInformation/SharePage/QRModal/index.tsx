import React, { useState, useEffect } from "react";
import QRCode from "react-native-qrcode-svg";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions
} from "react-native";
import { styles } from "../SharePageStyles";
import { getCurrentDateAndTime } from "../../../../../../../../services/date/date";
import { uploadWorkpass } from "../../../../../../../../services/transferAPI/transferAPI";
import { globalDownloadEndpoint } from "../../../../../../../../config/constants";

interface QRModalProps {
  obfuscatedWorkpass: object;
}

export const QRModal = (props: QRModalProps) => {
  const [isUploading, toggleIsUploading] = useState(true);
  const [timeCreated, updateTimeCreated] = useState(getCurrentDateAndTime());
  const [qrText, setQrText] = useState("NULL");

  useEffect(() => {
    uploadWorkpass(props.obfuscatedWorkpass).then(res => {
      const payload = {
        uri: `${globalDownloadEndpoint}/${res.id}`,
        type: res.type,
        key: res.key
      };
      setQrText(`VIEW;${JSON.stringify(payload)}`);
      toggleIsUploading(false);
    });
  }, []);

  const refreshQr = () => {
    toggleIsUploading(true);
    uploadWorkpass(props.obfuscatedWorkpass).then(res => {
      const payload = {
        uri: `${globalDownloadEndpoint}/${res.id}`,
        type: res.type,
        key: res.key
      };
      setQrText(`VIEW;${JSON.stringify(payload)}`);
      toggleIsUploading(false);
    });
    updateTimeCreated(getCurrentDateAndTime());
  };

  return (
    <>
      <TouchableOpacity onPress={refreshQr}>
        <View style={styles.qrContainer}>
          {isUploading ? (
            <ActivityIndicator size="large" />
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
