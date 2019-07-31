import React from "react";
import { Text, View, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginVertical: 10
  },
  text: { color: "#808080" }
});

const TextRow = ({ label, text }) => {
  return (
    <View style={styles.textContainer}>
      <Text style={styles.text}>{label}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export { TextRow };

TextRow.propTypes = {
  label: PropTypes.string,
  text: PropTypes.string
};
