import React from "react";
import { StyleSheet, View } from "react-native";
import BarcodeScannerExample from "../../components/BarcodeScannerExample";
import AppContext from "../../components/AppStore";

const ScannerTab = () => (
  <View style={[StyleSheet.absoluteFillObject]}>
    <AppContext.Consumer>
      {({ test, certificate, changeTestState, storeCertificate}) => (
        <BarcodeScannerExample test={test} certificate={certificate} changeTestState={changeTestState} storeCertificate={storeCertificate}/>
      )}
    </AppContext.Consumer>
  </View>
);

export default ScannerTab;
