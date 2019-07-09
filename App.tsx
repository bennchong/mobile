import React from "react";
import { StyleSheet, Text, View } from "react-native";
import BarcodeScannerExample from "./components/BarcodeScannerExample";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {/* <BarcodeScannerExample /> */}
      </View>
    );
  }
}
