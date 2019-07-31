import React, { useEffect } from "react";
import { View } from "react-native";
import QRScanner from "./QRScanner";
import {
  getStoredWorkpass,
  checkStoredWorkpassExists
} from "../../services/fileSystem";
import NavigationService from "../../navigation/NavigationService";
import { useStateValue } from "../../state";
import { Header } from "../Layout/Header";

const checkForStoredWorkpass = async onResult => {
  if (await checkStoredWorkpassExists()) {
    const workpass = await getStoredWorkpass();
    if (workpass) onResult(workpass);
  }
};

export const ScannerPage = () => {
  const [, dispatch] = useStateValue();

  const updateWorkpassDispatch = workpass => {
    dispatch({
      type: "UPDATE_WORKPASS",
      workpass
    });
  };

  const onWorkpassFetch = workpass => {
    updateWorkpassDispatch(workpass);
    NavigationService.navigate("Profile", {});
  };

  useEffect(() => {
    checkForStoredWorkpass(onWorkpassFetch);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header text="SCAN QR" />
      <View style={{ flex: 1, marginTop: 60 }}>
        <QRScanner storeWorkpass={updateWorkpassDispatch} />
      </View>
    </View>
  );
};
