import React from "react";
import { StyleSheet, Text, View } from "react-native";

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
  </View>
);

export default SettingsTab;
