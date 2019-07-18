import * as React from "react";
import {
  Alert,
  View,
  StyleSheet,
  Button,
  Text,
  Dimensions,
  Image
} from "react-native";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import { Constants } from "expo-barcode-scanner";
import { NavigationEvents } from "react-navigation";
import NavigationService from "../navigation/NavigationService";

import QRHandler from "./QRHandler";
import { QR_ACTIONS } from "../constants/QRValidity";

const SampleCert = require("../constants/SampleCert.json");

interface MyProps {
  test: boolean;
  changeAppProfileState: () => {};
  storeCertificate: (cert) => {};
}

export default class BarcodeScannerExample extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
    type: Camera.Constants.Type.back,
    isFocused: true
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  };

  render() {
    const { hasCameraPermission, scanned } = this.state;
    if (this.state.isFocused === false) {
      return (
        <NavigationEvents
          onWillFocus={payload => {
            this.setState({ isFocused: true });
          }}
          onDidBlur={payload => {
            this.setState({ isFocused: false });
          }}
        />
      );
    }
    if (hasCameraPermission != null && hasCameraPermission === true) {
      return (
        <Camera
          style={{ ...StyleSheet.absoluteFillObject }}
          type={this.state.type}
          barCodeScannerSettings={{
            barCodeTypes: [Constants.BarCodeType.qr]
          }}
          onBarCodeScanned={
            scanned ? () => console.log(scanned) : this.handleBarCodeScanned
          }
        >
          <NavigationEvents
            onWillFocus={payload => {
              this.setState({ isFocused: true });
            }}
            onDidBlur={payload => {
              this.setState({ isFocused: false });
            }}
          />
        </Camera>
      );
    }

    console.log("camera is null");
    return null;
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    if (QRHandler.CheckQRType(data) === QR_ACTIONS.STORE) {
      this.DownloadQr(type, data);
    } else if (QRHandler.CheckQRType(data) === QR_ACTIONS.VIEW) {
      this.setState({ scanned: false });
      NavigationService.navigate("Modal", { certificate: SampleCert });
    } else {
      Alert.alert("Invalid QR", "Please Try Again", [
        {
          text: "Yes",
          onPress: () => {
            this.setState({ scanned: false });
          }
        }
      ]);
    }
  };

  DownloadQr(type, data) {
    Alert.alert(
      "QR Code Detected",
      "Do you want download profile?",
      [
        {
          text: "No",
          onPress: () => {
            this.setState({ scanned: false });
          }
        },
        {
          text: "Yes",
          onPress: () => {
            this.handler = new QRHandler(
              "STORE;https://api-ropsten.opencerts.io/storage/get;/e2d21afb-0f38-4cb6-8cef-1dd4f2c26ae1;d42ffe7b31b18d1633117531353bb0c5e7805e42c240e49241f01364d8bba2e5"
            );
            this.props.changeAppProfileState();
            alert(
              `Bar code with type ${type} and data ${data} has been scanned!`
            );
            this.props.storeCertificate(this.handler.ReturnsDecryptedCert());
            NavigationService.navigate("Profile", {});
            this.setState({ scanned: false });
          }
        }
      ],
      { cancelable: false }
    );
  }
}

const { width } = Dimensions.get("window");
const qrSize = width * 0.7;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 1000
  },
  qr: {
    marginTop: "5%",
    marginBottom: "5%",
    width: qrSize,
    height: qrSize
  },
  description: {
    fontSize: width * 0.09,
    marginTop: "30%",
    textAlign: "center",
    width: "70%",
    color: "black"
  },
  cancel: {
    fontSize: width * 0.05,
    textAlign: "center",
    width: "70%",
    color: "white"
  }
});
