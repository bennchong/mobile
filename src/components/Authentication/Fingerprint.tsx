import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./AuthenticationStyles";

interface FingerprintProps {
  scanFingerprint: any;
}

export const Fingerprint = ({ scanFingerprint }: FingerprintProps) => {
  return (
    <View style={{ paddingVertical: 20 }}>
      <MaterialCommunityIcons
        name="fingerprint"
        size={80}
        color="#3557b7"
        style={styles.icon}
      />
      <TouchableOpacity style={styles.button} onPress={scanFingerprint}>
        <Text style={styles.buttonText}>
          Scan fingerprint to unlock information
        </Text>
      </TouchableOpacity>
    </View>
  );
};
