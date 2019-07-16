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

interface MyProps {
  test: boolean;
  changeTestState: () => {};
}

export default class BarcodeScannerExample extends React.Component<
  MyProps,
  {}
> {
  state = {
    hasCameraPermission: null,
    scanned: false
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
            <Image style={styles.qr} source={require("../assets/QR.png")} />
            <Button
              title={"Tap to Scan Again"}
              color="black"
              onPress={() => this.setState({ scanned: false })}
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
            alert(
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
