import { Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "./Styles/NoProfileStyles";

export const NoProfile = () => (
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
