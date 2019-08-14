import React from "react";
import { Image, Text, View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 26,
    marginVertical: 10,
    backgroundColor: "#fff"
  },
  label: { color: "#808080", fontSize: 13, flex: 3 },
  text: {
    color: "#808080",
    fontSize: 13,
    flex: 4,
    textAlign: "right",
    flexWrap: "wrap"
  }
});

interface TextRowProps {
  label: string;
  text: string;
}

const imageSource = require("../../assets/blurredtext.jpeg");

export const TextRow = ({ label, text }: TextRowProps) => {
  return (
    <View style={styles.textContainer}>
      <Text style={styles.label}>{label}</Text>
      {text ? (
        <Text style={styles.text}>{text}</Text>
      ) : (
        <Image source={imageSource} style={{ height: 15, width: 100 }} />
      )}
    </View>
  );
};
