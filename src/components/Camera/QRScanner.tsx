import * as React from "react";
import { Alert, View, StyleSheet, Text } from "react-native";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import { Constants } from "expo-barcode-scanner";
import { withNavigationFocus } from "react-navigation";
import { StateContext } from "../../state";
import { InvalidQRModal } from "../Modals/InvalidQRModal";
import { ScanArea } from "./ScanArea";
import NavigationService from "../../navigation/NavigationService";
import { fetchDocument, getActionFromQR } from "../../services/qrHandler";
import { storeWorkpass } from "../../services/fileSystem";

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

  handleProfileView = workpass => {
    this.setState({ isProcessingQr: false });
    NavigationService.navigate("ProfilePreview", {
      workpass
    });
  };

  handleProfileStorage = document => {
    const [, dispatch] = this.context;
    const updateworkpass = workpass => {
      dispatch({
        type: "UPDATE_WORKPASS",
        workpass
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
            await storeWorkpass(document);
            updateworkpass(document);
            this.setState({ isProcessingQr: false });
            // TODO, change flow if downloading, read directly from Filesytem
            NavigationService.navigate("Profile");
          }
        }
      ],
      { cancelable: false }
    );
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
        <Camera
          style={{
            ...StyleSheet.absoluteFillObject
          }}
          type={this.state.type}
          barCodeScannerSettings={{
            barCodeTypes: [Constants.BarCodeType.qr]
          }}
          onBarCodeScanned={this.handleBarCodeScanned}
        >
          <ScanArea />
        </Camera>
      );
    }
    return (
      <View>
        <Text>Please enable camera permissions</Text>
      </View>
    );
  }

  handleBarCodeScanned = async ({ data }) => {
    const { isProcessingQr } = this.state;

    if (isProcessingQr) return;
    this.setState({ isProcessingQr: true });

    try {
      const { action, uri, key } = await getActionFromQR(data);
      const document = await fetchDocument(uri, key);

      // TODO NEED TO VERIFY DOCUMENT

      if (action === "STORE") {
        this.handleProfileStorage(document);
      } else {
        this.handleProfileView(document);
      }
    } catch (e) {
      this.setState({ invalidQR: true, isProcessingQr: false });
    }
  };
}

export default withNavigationFocus(QRScanner);
