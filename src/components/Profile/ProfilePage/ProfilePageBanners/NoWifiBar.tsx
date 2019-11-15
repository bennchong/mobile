import React from "react";
import { View, Text } from "react-native";
import { styles } from "./BarStyles";

export const NoWifiBar = () => {
  return (
    <View style={[styles.baseBar, styles.verify]}>
      <Text style={styles.verifyText}>No Internet Connection</Text>
    </View>
  );
};
