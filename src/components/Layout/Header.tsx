import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    height: Constants.statusBarHeight * 2 + 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 999
  },
  headerText: {
    color: "white",
    fontSize: 16,
    opacity: 1,
    textAlign: "center",
    marginTop: Constants.statusBarHeight + 5
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
