import React from "react";
import { StyleSheet, View } from "react-native";
import BarcodeScannerExample from "../../components/BarcodeScannerExample";
import AppContext from "../../components/AppStore";

export default class ScannerTab extends React.Component {
  render() {
    return (
      <View style={[StyleSheet.absoluteFillObject]}>
        <AppContext.Consumer>
          {({ test, changeTestState }) => (
            <BarcodeScannerExample
              test={test}
              changeTestState={changeTestState}
            />
          )}
        </AppContext.Consumer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  }
});
