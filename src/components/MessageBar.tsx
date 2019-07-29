import React from "react";
import { View, Text } from "react-native";
import { styles } from "./BarStyles";

export const MessageBar = () => {
  return (
    <View style={[styles.baseBar, styles.verify]}>
      <Text style={styles.verifyText}>
        Please verify your ID and accept it below
      </Text>
    </View>
  );
};
