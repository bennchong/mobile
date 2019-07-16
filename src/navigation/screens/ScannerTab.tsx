import React from "react";
import { StyleSheet, View } from "react-native";
import BarcodeScannerExample from "../../components/BarcodeScannerExample";
import AppContext from "../../components/AppStore";

const ScannerTab = () => (
  <View style={[StyleSheet.absoluteFillObject]}>
    <AppContext.Consumer>
      {({ test, changeTestState }) => (
        <BarcodeScannerExample test={test} changeTestState={changeTestState} />
      )}
    </AppContext.Consumer>
  </View>
);

export default ScannerTab;
