import React from "react";
import { Constants } from "expo";
import { StyleSheet, View } from "react-native";
import * as Permissions from "expo-permissions";
import QRScanner from "../../../components/QRScanner";
import { Header } from "../../../components/Layout/Header";
import {
  checkStoredCertificateExists,
  getStoredCertificate
} from "../../../services/fileSystem";
import NavigationService from "../../NavigationService";
import { StateContext } from "../../../state";

export class ScannerPage extends React.Component {
  state = {
    hasCameraPermission: null
  };

  static contextType = StateContext;

  // eslint-disable-next-line react/no-deprecated
  async componentWillMount() {
    const [, dispatch] = this.context;

    // Checks if there is already a cert stored on the phone
    const res = await checkStoredCertificateExists();
    if (res) {
      // Change to profile page immediately if cert exist
      let cert = await getStoredCertificate();
      cert = JSON.parse(cert);
      dispatch({ type: "UPDATE_WORKPASS", certificate: cert });
      NavigationService.navigate("Profile", {});
    }
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  render() {
    const [, dispatch] = this.context;
    const storeCertificate = certificate =>
      dispatch({
        type: "UPDATE_WORKPASS",
        certificate
      });
    const changeAppProfileState = () =>
      dispatch({
        type: "TOGGLE_TEST_FLAG"
      });
    return (
      <View style={{ flex: 1 }}>
        <Header text="SCAN QR" />
        <View style={{ flex: 1, marginTop: 60 }}>
          <QRScanner
            changeAppProfileState={changeAppProfileState}
            storeCertificate={storeCertificate}
          />
        </View>
      </View>
    );
  }
}
