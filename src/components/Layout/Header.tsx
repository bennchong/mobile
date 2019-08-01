import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 60,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 999
  },
  headerText: {
    color: "white",
    fontSize: 16,
    opacity: 1,
    textAlign: "center",
    alignItems: "center",
    marginTop: 55 - Constants.statusBarHeight
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
