import { Text, View, StyleSheet } from "react-native";
import React from "react";
import metrics from "../../config/metrics";
import { AntDesign } from "@expo/vector-icons";

const NoProfile = () => (
  <View style={styles.container}>
    <View style={styles.warningContainer}>
      <AntDesign name="exclamationcircle" size={50} color="red" />
      <Text style={styles.mainText}>No Profile Detected</Text>
      <Text style={styles.sideText}>
        Scan a valid Ministry of Manpower QR code to download your digital work
        pass!
      </Text>
    </View>
  </View>
);

export { NoProfile };

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  warningContainer: {
    width: (2 * metrics.DEVICE_WIDTH) / 3,
    height: (2 * metrics.DEVICE_WIDTH) / 3,
    backgroundColor: "#f5f5f5",
    borderRadius: 30,
    padding: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  mainText: {
    color: "red",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10
  },
  sideText: {
    fontSize: 15,
    marginTop: 10,
    textAlign: "center"
  }
});
