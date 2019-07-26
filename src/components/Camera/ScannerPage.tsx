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
import { Header } from "../Layout/Header";
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
      //TODO: Profile will take directly from FS if its looking at stored Workpass, and from global state if its view 
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
      <View style={{ flex: 1 }}>
        <Header text="SCAN QR" />
        <View style={{ flex: 1, marginTop: 60 }}>
          <QRScanner
            storeCertificate={storeCertificate}
          />
        </View>
      </View>
    );
  }
}
