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
import QR_ACTIONS from "../constants/QRConstants";

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
    if (
      QRHandler.CheckQRType(data) === QR_ACTIONS.STORE &&
      QRHandler.CheckQRValidity(data)
    ) {
      this.DownloadQr(type, data);
    } else if (
      QRHandler.CheckQRType(data) === QR_ACTIONS.VIEW &&
      QRHandler.CheckQRValidity(data)
    ) {
      this.ViewQR(data);
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
      "Do you want download profile from the QR?",
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
            this.handler = new QRHandler(data);
            this.props.changeAppProfileState();
            // Stores in AppStore, not phone memory
            this.props.storeCertificate(this.handler.ReturnsDecryptedCert());
            NavigationService.navigate("Profile", {});
            this.setState({ scanned: false });
          }
        }
      ],
      { cancelable: false }
    );
  }

  ViewQR(data) {
    Alert.alert(
      "QR Code Detected",
      "Do you want view profile from the QR?",
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
            this.handler = new QRHandler(data);
            this.setState({ scanned: false });
            // Passing placeholder cert here
            const placeholderCert = this.handler.ReturnsDecryptedCert();
            NavigationService.navigate("Modal", {
              certificate: placeholderCert
            });
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
