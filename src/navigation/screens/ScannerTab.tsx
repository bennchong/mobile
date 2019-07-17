import React from "react";
import { Constants } from "expo";
import { StyleSheet, View } from "react-native";
import * as Permissions from "expo-permissions";
import BarcodeScannerExample from "../../components/BarcodeScannerExample";
import TitleBar from "../../components/TitleBar";
import AppContext from "../../components/AppStore";

const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    marginTop: Constants.statusBarHeight
  },
  titleBar: {
    color: "white",
    fontSize: 24,
    opacity: 1,
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  camera: {
    flex: 15,
    backgroundColor: "whitesmoke"
  }
});

export default class ScannerTab extends React.Component {
  state = {
    hasCameraPermission: null
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  render() {
    return (
      <View style={styles.page}>
        <AppContext.Consumer>
          {({ changeTestState }) => (
            <BarcodeScannerExample changeTestState={changeTestState} />
          )}
        </AppContext.Consumer>
        <View
          style={{
            flex: 1,
            backgroundColor: "gray",
            justifyContent: "center",
            opacity: 0.8
          }}
        >
          <TitleBar style={styles.titleBar}>SCAN QR</TitleBar>
        </View>
        <View style={{ flex: 14 }} />
      </View>
    );
  }
}
