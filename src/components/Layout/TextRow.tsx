import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { white, midGrey } from "../../themeColors";

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 26,
    marginVertical: 10,
    backgroundColor: white
  },
  label: { color: midGrey, fontSize: 13, flex: 3 },
  text: {
    color: midGrey,
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

export const TextRow = ({ label, text }: TextRowProps) => {
  return text ? (
    <View style={styles.textContainer}>
      <Text style={styles.label}>{label}</Text>

      <Text style={styles.text}>{text}</Text>
    </View>
  ) : null;
};
