import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    position: "absolute",
    top: Constants.statusBarHeight,
    height: 30,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 999,
    justifyContent: "center"
  },
  headerText: {
    color: "white",
    fontSize: 16,
    opacity: 1,
    textAlign: "center"
  }
});

interface HeaderProps {
  text: string;
}

const Header = ({ text }: HeaderProps) => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerText}>{text}</Text>
  </View>
);

export { Header };
