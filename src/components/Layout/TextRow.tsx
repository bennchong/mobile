import React from "react";
import { Image, Text, View, StyleSheet } from "react-native";
import PropTypes from "prop-types";

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

const imageSource = require("../../assets/blurredtext.jpeg");

const TextRow = ({ label, text }) => {
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

export { TextRow };

TextRow.propTypes = {
  label: PropTypes.string,
  text: PropTypes.string
};
