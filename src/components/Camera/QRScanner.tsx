import * as React from "react";
import { Alert, View, StyleSheet, Text } from "react-native";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import { Constants } from "expo-barcode-scanner";
import { withNavigationFocus } from "react-navigation";
import { StateContext } from "../../state";
import NavigationService from "../../navigation/NavigationService";
import { fetchDocument, getActionFromQR } from "../../services/qrHandler";
import { storeworkpass } from "../../services/fileSystem";

interface QRScannerProps {
  storeworkpass: (cert) => {};
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
    this.setState({ isProcessingQr: false });
    NavigationService.navigate("ProfilePreview", {
      workpass: { document }
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
            await storeworkpass(document);
            updateworkpass(document);
            this.setState({ isProcessingQr: false });
            // TODO, change flow if downloading, read directly from Filesytem
            NavigationService.navigate("Profile", { workpass: document });
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
      // eslint-disable-next-line no-alert
      Alert.alert("ERROR", "INVALID QR");
    }
  };
}

export default withNavigationFocus(QRScanner);
