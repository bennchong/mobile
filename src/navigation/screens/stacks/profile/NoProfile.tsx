import { StyleSheet, Text, View } from "react-native";
import React from "../../../../../node_modules/react";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

const NoProfile = () => (
  <View style={styles.container}>
    <Text style={{ color: "red" }}>Please acquire a profile page</Text>
  </View>
);

export default NoProfile;
