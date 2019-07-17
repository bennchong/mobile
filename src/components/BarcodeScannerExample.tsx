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

import { BarCodeScanner } from "expo-barcode-scanner";
import NavigationService from "../navigation/NavigationService";

import QRHandler from "./QRHandler";

interface MyProps {
  test: boolean;
  changeTestState: () => {};
}

const { width } = Dimensions.get("window");
const qrSize = width * 0.7;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
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

export default class BarcodeScannerExample extends React.Component<
  MyProps,
  {}
> {
  constructor(props) {
    super(props);
    this.QRBorder = require("../assets/QR.png");
  }

  state = {
    hasCameraPermission: null,
    scanned: false
  };

  async componentDidMount() {
    this.getPermissionsAsync();
    this.test = new QRHandler("STORE;https://api-ropsten.opencerts.io/storage/get;/1113ec7f-ea30-459b-83b6-2e51339f8dd2;723906c739fb0aafdd215242808c6f5598b82860f3573933a18e795557c7e6da");
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  };

  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission != null && hasCameraPermission === true) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignContent: "center"
          }}
        >
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            style={[StyleSheet.absoluteFill, styles.container]}
          >
            <Text style={styles.description}>Scan your QR code</Text>
            <Image style={styles.qr} source={this.QRBorder} />
            <Button
              title={"Tap to Scan Again"}
              color="black"
              onPress={() => {this.setState({ scanned: false });console.log(this.test.get_encrypted_cert())}}
            />
            <Text>
              {" "}
              {this.props.test.toString()} hello {typeof this.props.test}
            </Text>
          </BarCodeScanner>
        </View>
      );
    }

    return null;
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    Alert.alert(
      "QR Code Detected",
      "Do you want to accept this QR Code?",
      [
        { text: "No", onPress: () => {} },
        {
          text: "Yes",
          onPress: () => {
            this.props.changeTestState();
            Alert.alert(
              `Bar code with type ${type} and data ${data} has been scanned!`
            );
            NavigationService.navigate("Profile", {});
          }
        }
      ],
      { cancelable: false }
    );
  };
}
