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
import { withNavigationFocus } from "react-navigation";
import { StateContext } from "../state";
import NavigationService from "../navigation/NavigationService";
import { fetchDocument, getActionFromQR } from "../services/qrHandler";
import { storeCertificate } from "../services/fileSystem";

interface QRScannerProps {
  changeAppProfileState: () => {};
  storeCertificate: (cert) => {};
  navigation: any;
}

class QRScanner extends React.Component<QRScannerProps> {
  static contextType = StateContext;

  state = {
    hasCameraPermission: null,
    isProcessingQr: false,
    type: Camera.Constants.Type.back
  };

  componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  };

  handleProfileView = document => {
    NavigationService.navigate("ProfilePreview", {
      certificate: { document }
    });
  };

  handleProfileStorage = document => {
    const [, dispatch] = this.context;
    const updateCertificate = certificate => {
      dispatch({
        type: "UPDATE_WORKPASS",
        certificate
      });
    };

    Alert.alert(
      "Profile detected",
      "Do you want to overwrite your current profile?",
      [
        {
          text: "No"
        },
        {
          text: "Yes",
          onPress: async () => {
            await storeCertificate(document);
            updateCertificate(document);
            NavigationService.navigate("Profile", {});
          }
        }
      ],
      { cancelable: false }
    );
  };

  render() {
    const { hasCameraPermission } = this.state;
    const isFocused = this.props.navigation.isFocused();

    if (hasCameraPermission && isFocused) {
      return (
        <Camera
          style={{ ...StyleSheet.absoluteFillObject }}
          type={this.state.type}
          barCodeScannerSettings={{
            barCodeTypes: [Constants.BarCodeType.qr]
          }}
          onBarCodeScanned={this.handleBarCodeScanned}
        ></Camera>
      );
    }
    return (
      <View>
        <Text>Please enable camera permissions</Text>
      </View>
    );
  }

  handleBarCodeScanned = async ({ type, data }) => {
    const { isProcessingQr } = this.state;

    if (isProcessingQr) return;
    this.setState({ isProcessingQr: true });

    try {
      const { action, uri, key } = await getActionFromQR(data);
      const document = await fetchDocument(uri);

      // TODO NEED TO VERIFY DOCUMENT

      if (action === "STORE") {
        this.handleProfileStorage(document);
      } else {
        this.handleProfileView(document);
      }
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert("Invalid QR");
    }
    this.setState({ isProcessingQr: false });
  };
}

export default withNavigationFocus(QRScanner);
