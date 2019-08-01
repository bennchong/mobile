import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

export const CannotScan = () => {
  return (
    <View
      style={{
        position: "absolute",
        bottom: "5%",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Text style={{ color: "#414141", fontSize: 12 }}>Can&apos;t Scan?</Text>
      <TouchableOpacity
        style={{
          marginTop: 10,
          borderRadius: 10,
          backgroundColor: "rgba(0,0,0,0.5)",
          paddingVertical: 10,
          paddingHorizontal: 15
        }}
      >
        <Text style={{ color: "#fff" }}>Use Card Serial No.</Text>
      </TouchableOpacity>
    </View>
  );
};
