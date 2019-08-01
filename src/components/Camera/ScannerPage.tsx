import React from "react";
import { View } from "react-native";
import QRScanner from "./QRScanner";
import { Header } from "../Layout/Header";
import { useStateValue } from "../../state";
import { CannotScan } from "./CannotScan";

export const ScannerPage = () => {
  const [, dispatch] = useStateValue();

  const updateWorkpassDispatch = workpass => {
    dispatch({
      type: "UPDATE_WORKPASS",
      workpass
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Header text="Scan QR code" />
      <QRScanner storeWorkpass={updateWorkpassDispatch} />
      <CannotScan />
    </View>
  );
};
