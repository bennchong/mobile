import { Text, View } from "react-native";
import React from "react";
import { styles } from "../../styles";

const NoProfile = () => (
  <View style={styles.container}>
    <Text style={{ color: "red" }}>Please acquire a profile page</Text>
  </View>
);

export { NoProfile };
