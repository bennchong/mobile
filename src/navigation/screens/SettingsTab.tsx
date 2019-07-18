import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import QrCodeGenerator from "../../components/QrGenerator";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

const SettingsTab = () => (
  <View style={styles.container}>
    <Text>Settings Page</Text>
    <QrCodeGenerator/>
  </View>
);

export default SettingsTab;
