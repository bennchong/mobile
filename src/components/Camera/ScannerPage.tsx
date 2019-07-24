import React from "react";
import { View } from "react-native";
import * as Permissions from "expo-permissions";
import QRScanner from "./QRScanner";
import { TitleBar } from "../TitleBar";
import {
  checkStoredCertificateExists,
  getStoredCertificate
} from "../../services/fileSystem";
import NavigationService from "../../navigation/NavigationService";
import { StateContext } from "../../state";
import styles from "./ScannerPageStyleSheet";


export class ScannerPage extends React.Component {
  state = {
    hasCameraPermission: null
  };

  static contextType = StateContext;

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });

    const [, dispatch] = this.context;

    // Checks if there is already a cert stored on the phone
    const res = await checkStoredCertificateExists();
    if (res) {
      //Take Cert directly from FileSystem 
      dispatch({ type: "UPDATE_WORKPASS", certificate: await getStoredCertificate() });
      NavigationService.navigate("Profile", {});
    }
  }

  render() {
    const [, dispatch] = this.context;
    const storeCertificate = certificate =>
      dispatch({
        type: "UPDATE_WORKPASS",
        certificate
      });
    return (
      <View style={styles.page}>
        <QRScanner
          storeCertificate={storeCertificate}
        />
        <View style={styles.titleBarContainer}>
          <TitleBar text="SCAN QR" />
        </View>
        <View style={{ flex: 14 }} />
      </View>
    );
  }
}
