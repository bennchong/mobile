import { StyleSheet, Text, View } from "react-native";
import React from "../../../../../node_modules/react";

export default class NoProfile extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ color: "red" }}>Please acquire a profile page</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
