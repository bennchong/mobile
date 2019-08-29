import React from "react";
import { View, StyleSheet } from "react-native";
import { white } from "../../themeColors";

const styles = StyleSheet.create({
  margin: {
    marginHorizontal: 26,
    height: 45,
    backgroundColor: white,
    width: "100%"
  }
});

const Margin = () => {
  return <View style={styles.margin} />;
};

export { Margin };
