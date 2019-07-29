import React from "react";
import { View } from "react-native";
import * as Permissions from "expo-permissions";
import QRScanner from "./QRScanner";
import {
  checkStoredWorkpassExists,
  getStoredWorkpass
} from "../../services/fileSystem";
import NavigationService from "../../navigation/NavigationService";
import { StateContext } from "../../state";
import { Header } from "../Layout/Header";

export class ScannerPage extends React.Component {
  state = {
    hasCameraPermission: null
  };

  static contextType = StateContext;

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });

    const [, dispatch] = this.context;

    // Checks if there is already a cert stored on the phone
<<<<<<< HEAD
    const workpassExist = await checkStoredworkpassExists();
=======
    const workpassExist = await checkStoredWorkpassExists();
>>>>>>> 9cae180737711c9afb0a10801ee289efd061ec19

    if (workpassExist) {
      // TODO: Profile will take directly from FS if its looking at stored Workpass, and from global state if its view
      dispatch({
        type: "UPDATE_WORKPASS",
        workpass: await getStoredWorkpass()
      });
      NavigationService.navigate("Profile", {});
    }
  }

  render() {
    const [, dispatch] = this.context;
    const storeWorkpass = workpass =>
      dispatch({
        type: "UPDATE_WORKPASS",
        workpass
      });
    return (
      <View style={{ flex: 1 }}>
        <Header text="SCAN QR" />
        <View style={{ flex: 1, marginTop: 60 }}>
          <QRScanner storeWorkpass={storeWorkpass} />
        </View>
      </View>
    );
  }
}
