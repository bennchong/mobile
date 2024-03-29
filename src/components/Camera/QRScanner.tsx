import * as React from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
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
  previewService,
  fetchDocument,
  getActionFromQR
} from "../../services/qrHandler/qrHandler";
import { decryptFromPayload } from "../../services/crypto/crypto";
import { profileTypeEnum } from "../Profile/profileTypeEnum";

interface QRScannerProps {
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
    const [{ profilesArray }] = this.context;
    const setProcessingQr = () => this.setState({ isProcessingQr: false });

    if (profilesArray[0].workpass) {
      await pushService(profilesArray[0].workpass, payload, setProcessingQr);
    } else {
      Alert.alert("Cannot find a main pass to send to access control");
      setProcessingQr();
    }
  };

  handleProfileShared = async payload => {
    const { uri, key, type } = JSON.parse(payload);
    const encryptedDocument = await fetchDocument(uri);
    const [, dispatch] = this.context;

    let workpass;
    if (!type && !key) {
      workpass = encryptedDocument;
    } else {
      workpass = decryptFromPayload(encryptedDocument, { key, type });
    }
    this.setState({ isProcessingQr: false }, () => {
      dispatch({
        type: "SCANNED_PASS",
        tempPass: workpass
      });
      NavigationService.navigate("ProfilePreview", {
        profileType: profileTypeEnum.SHARED
      });
    });
  };

  handleProfilePreviewToStore = async payload => {
    // const setProcessingQr = () => this.setState({ isProcessingQr: false });
    const [, dispatch] = this.context;

    await previewService(payload, dispatch);

    this.setState({ isProcessingQr: false }, () => {
      NavigationService.navigate("ProfilePreview", {
        profileType: profileTypeEnum.PREVIEW
      });
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
      const { action, payload } = getActionFromQR(data);
      switch (action) {
        case "STORE":
          await this.handleProfilePreviewToStore(payload);
          break;
        case "VIEW":
          await this.handleProfileShared(payload);
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
