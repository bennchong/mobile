import React from "react";
import { Constants } from "expo";
import { StyleSheet, View, Button } from "react-native";
import * as Permissions from "expo-permissions";
import BarcodeScannerExample from "../../components/BarcodeScannerExample";
import TitleBar from "../../components/TitleBar";
import AppContext from "../../components/AppStore";
import QRHandler from "../../components/QRHandler";
import CertStore from "../../components/CertStore";
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

  handler = new QRHandler("STORE;https://api-ropsten.opencerts.io/storage/get;/e2d21afb-0f38-4cb6-8cef-1dd4f2c26ae1;d42ffe7b31b18d1633117531353bb0c5e7805e42c240e49241f01364d8bba2e5");
  //Links Appstore with this component
  static contextType = AppContext;

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
    this.CertStorer = new CertStore();

    //Checks if there is already a cert stored on the phone
    let res = await this.CertStorer.checkStoredCertificateExistsFS();
    if (res.exists) {
      //Change to profile page immediately if cert exist
      console.log(res);
      this.context.changeTestState();
      let cert = await this.CertStorer.getStoredCertificateFS();
      cert = JSON.parse(cert);
      this.context.storeCertificate(cert);
      NavigationService.navigate("Profile", {});
    }
  }

  render() {
    return (
      <View style={styles.page}>
        <AppContext.Consumer>
          {({ changeTestState }) => (
            <BarcodeScannerExample changeTestState={changeTestState} />
          )}
        </AppContext.Consumer>
        <View style={styles.titleBarContainer}>
          <TitleBar style={styles.titleBar}>SCAN QR</TitleBar>
        </View>
        <Button
          title={"Tap to Get Cert"}
          color="black"
          onPress={() => console.log(this.handler.GetEncryptedCert())}
        />
        <Button
          title={"Tap to Store Cert"}
          color="black"
          onPress={async () => {
            //MOCK CERTIFICATE
            let res = await this.CertStorer.storeCertificateFS(JSON.stringify(SampleCert));
            if (  res === CERT_STORAGE.SUCCESS) {
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
            let res = await this.CertStorer.getStoredCertificateFS();
            if (  res !== CERT_STORAGE.FAILURE ) {
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
            let res = await this.CertStorer.deleteStoredCertificateFS();
            if (  res === CERT_STORAGE.SUCCESS ) {
              console.log("Deleting Works");
              console.log(res); 
            } else {
              console.log("Deleting failed");
            }
          }}
        />
        <View style={{ flex: 14 }} />
      </View>
    );
  }
}
