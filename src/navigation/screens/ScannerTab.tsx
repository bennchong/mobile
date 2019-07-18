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

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
    this.Storage = new Storage();

    // Checks if there is already a cert stored on the phone
    const res = await this.Storage.checkStoredCertificateExistsFS();
    if (res.exists) {
      // Change to profile page immediately if cert exist
      console.log(res);
      this.context.changeAppProfileState();
      let cert = await this.Storage.getStoredCertificateFS();
      cert = JSON.parse(cert);
      this.context.storeCertificate(cert);
      NavigationService.navigate("Profile", {});
    }
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
        <Button
          title={"Tap to Store Cert"}
          color="black"
          onPress={async () => {
            // MOCK CERTIFICATE
            const res = await this.Storage.storeCertificateFS(
              JSON.stringify(SampleCert)
            );
            if (res === CERT_STORAGE.SUCCESS) {
              console.log("Storing Works");
            } else {
              console.log("Storing failed");
            }
          }}
        />
        <Button
          title={"Tap to Retrieve Cert"}
          color="black"
          onPress={async () => {
            const res = await this.Storage.getStoredCertificateFS();
            if (res !== CERT_STORAGE.FAILURE) {
              console.log("Retrieving Works");
              console.log(res);
            } else {
              console.log("Retrieving failed");
            }
          }}
        />
        <Button
          title={"Tap to Delete Cert"}
          color="black"
          onPress={async () => {
            const res = await this.Storage.deleteStoredCertificateFS();
            if (res === CERT_STORAGE.SUCCESS) {
              console.log("Deleting Works");
              console.log(res);
            } else {
              console.log("Deleting failed");
            }
          }}
        />
        <Button
          title={"Tap to Open Modal"}
          color="black"
          onPress={() => {
            NavigationService.navigate("Modal", { certificate: SampleCert });
          }}
        />
        <View style={{ flex: 14 }} />
      </View>
    );
  }
}
