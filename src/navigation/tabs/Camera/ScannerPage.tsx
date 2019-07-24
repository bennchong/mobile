import React from "react";
import { Constants } from "expo";
import { StyleSheet, View, Button } from "react-native";
import * as Permissions from "expo-permissions";
import QRScanner from "../../../components/QRScanner";
import { TitleBar } from "../../../components/TitleBar";
import {
  checkStoredCertificateExists,
  getStoredCertificate
} from "../../../services/FileSystem";
import NavigationService from "../../NavigationService";
import { StateContext } from "../../../state";

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

export class ScannerPage extends React.Component {
  state = {
    hasCameraPermission: null
  };

  static contextType = StateContext;

  async componentWillMount() {
    const [, dispatch] = this.context;

    // Checks if there is already a cert stored on the phone
    const res = await checkStoredCertificateExists();
    if (res.exists) {
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
      <View style={styles.page}>
        <QRScanner
          changeAppProfileState={changeAppProfileState}
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
