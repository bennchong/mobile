import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { darkGrey, white } from "../../themeColors";

const styles = StyleSheet.create({
  view: {
    position: "absolute",
    bottom: "5%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 99
  },
  message: { color: darkGrey, fontSize: 12 },
  button: {
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  buttonText: { color: white }
});

export const CannotScan = () => {
  return (
    <View style={styles.view}>
      <Text style={styles.message}>Can&apos;t Scan?</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Use Card Serial No.</Text>
      </TouchableOpacity>
    </View>
  );
};
