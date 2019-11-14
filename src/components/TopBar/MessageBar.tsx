import React from "react";
import { View, Text } from "react-native";
import { styles } from "./BarStyles";

export const MessageBar = () => {
  return (
    <View style={[styles.baseBar, styles.verify]}>
      <Text style={styles.verifyText}>
        Please confirm your details and press the save button at the bottom of
        this screen if the details are correct
      </Text>
    </View>
  );
};
