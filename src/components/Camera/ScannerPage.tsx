import React from "react";
import { View } from "react-native";
import QRScanner from "./QRScanner";
import { Header } from "../Layout/Header";

export const ScannerPage = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header text="Scan QR code" />
      <QRScanner />
    </View>
  );
};
