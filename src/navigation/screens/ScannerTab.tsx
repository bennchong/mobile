import React from "react";
import { Constants } from "expo";
import { StyleSheet, View, Button } from "react-native";
import * as Permissions from "expo-permissions";
import BarcodeScannerExample from "../../components/BarcodeScannerExample";
import TitleBar from "../../components/TitleBar";
import AppContext from "../../components/AppStore";
import Storage from "../../components/Storage";
import { CERT_STORAGE } from "../../constants/CertConstants";
import NavigationService from "../NavigationService";

const SampleCert = require("../../constants/SampleCert.json");

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
  },
  titleBarContainer: {
    flex: 1,
    backgroundColor: "gray",
    justifyContent: "center",
    opacity: 0.8
  }
});

export default class ScannerTab extends React.Component {
  state = {
    hasCameraPermission: null
  };

  // Links Appstore with this component
  static contextType = AppContext;

  async componentWillMount() {
    this.Storage = new Storage();

    // Checks if there is already a cert stored on the phone
    const res = await this.Storage.checkStoredCertificateExistsFS();
    if (res.exists) {
      // Change to profile page immediately if cert exist
      this.context.changeAppProfileState();
      let cert = await this.Storage.getStoredCertificateFS();
      cert = JSON.parse(cert);
      this.context.storeCertificate(cert);
      NavigationService.navigate("Profile", {});
    }
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  render() {
    return (
      <View style={styles.page}>
        <AppContext.Consumer>
          {({ changeAppProfileState, storeCertificate }) => (
            <BarcodeScannerExample
              changeAppProfileState={changeAppProfileState}
              storeCertificate={storeCertificate}
            />
          )}
        </AppContext.Consumer>
        <View style={styles.titleBarContainer}>
          <TitleBar style={styles.titleBar}>SCAN QR</TitleBar>
        </View>
        <View style={{ flex: 14 }} />
      </View>
    );
  }
}
