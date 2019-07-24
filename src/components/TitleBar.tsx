import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { styles } from "../styles";

export const TitleBar = ({ text }) => {
  return (
    <View style={styles.titleBarBackground}>
      <Text style={styles.titleBar}>{text}</Text>
    </View>
  );
};
