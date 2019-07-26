import React from "react";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 60,
    backgroundColor: "gray",
    justifyContent: "flex-end",
    opacity: 0.8,
    display: "flex", 
  },
  headerText: {
    color: "white",
    fontSize: 24,
    opacity: 1,
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
    justifyContent: "center",
    alignItems: "center"
  }
});

const Header = ({ text }) => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerText}>{text}</Text>
  </View>
);

export { Header };
