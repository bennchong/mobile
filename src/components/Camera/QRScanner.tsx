import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import { BarCodeScanner } from "expo-barcode-scanner";
import { withNavigationFocus } from "react-navigation";
import { StateContext } from "../../state";
import { InvalidQRModal } from "../Modals/InvalidQRModal";
import { ScanArea } from "./ScanArea";
import { CannotScan } from "./CannotScan";
import NavigationService from "../../navigation/NavigationService";
import {
  pushService,
  storeService,
  fetchDocument,
  getActionFromQR
} from "../../services/qrHandler";
import { decryptFromPayload } from "../../services/crypto";

interface QRScannerProps {
  storeWorkpass: (cert) => {};
  navigation: any;
}

class QRScanner extends React.Component<QRScannerProps> {
  static contextType = StateContext;

  state = {
    hasCameraPermission: null,
    isProcessingQr: false,
    type: Camera.Constants.Type.back,
    invalidQR: false
  };

  componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  };

  handleProfilePush = async payload => {
    const [{ workpass }] = this.context;
    const setProcessingQr = () => this.setState({ isProcessingQr: false });

    if (workpass) {
      await pushService(workpass, payload, setProcessingQr);
    }
  };

  handleProfileView = async payload => {
    const { uri, key, type } = JSON.parse(payload);
    const encryptedDocument = await fetchDocument(uri);
    const decryptedDocument = decryptFromPayload(encryptedDocument, {
      key,
      type
    });
    this.setState({ isProcessingQr: false }, () => {
      NavigationService.navigate("ProfilePreview", {
        workpass: decryptedDocument
      });
    });
  };

  handleProfileStorage = async payload => {
    const setProcessingQr = () => this.setState({ isProcessingQr: false });
    const navigateToProfile = () =>
      this.setState({ isProcessingQr: false }, () => {
        NavigationService.navigate("Profile", {});
      });
    const [, dispatch] = this.context;

    await storeService({
      payload,
      dispatch,
      setProcessingQr,
      navigateToProfile
    });
  };

  render() {
    const { hasCameraPermission, invalidQR } = this.state;
    const isFocused = this.props.navigation.isFocused();

    if (invalidQR) {
      return (
        <InvalidQRModal
          handleCloseModal={() => this.setState({ invalidQR: false })}
          showModal={invalidQR}
        />
      );
    }

    if (hasCameraPermission && isFocused) {
      return (
        <>
          <Camera
            style={{
              ...StyleSheet.absoluteFillObject
            }}
            type={this.state.type}
            barCodeScannerSettings={{
              barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr]
            }}
            onBarCodeScanned={this.handleBarCodeScanned}
          >
            <ScanArea />
          </Camera>
          <CannotScan />
        </>
      );
    }
    return (
      <View>
        <Text>Please enable camera permissions</Text>
      </View>
    );
  }

  setStateAsync = newState => {
    return new Promise(resolve => this.setState(newState, resolve));
  };

  handleBarCodeScanned = async ({ data }) => {
    const { isProcessingQr } = this.state;
    if (isProcessingQr) return;
    // Need to wait for isProcessingQr to be set to true before executing the rest of the functions,
    // otherwise it might be set to false, then true preventing QR codes from being scanned.
    await this.setStateAsync({ isProcessingQr: true });
    try {
      const { action, payload } = await getActionFromQR(data);

      switch (action) {
        case "STORE":
          await this.handleProfileStorage(payload);
          break;
        case "VIEW":
          await this.handleProfileView(payload);
          break;
        default:
          await this.handleProfilePush(payload);
      }
    } catch (e) {
      this.setState({ invalidQR: true, isProcessingQr: false });
    }
  };
}

export default withNavigationFocus(QRScanner);
