import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { styles } from "../styles";

function TitleBar({ text }) {
  return (
    <View style={styles.titleBarBackground}>
      <Text style={styles.titleBar}>{text}</Text>
    </View>
  );
}

export { TitleBar };
