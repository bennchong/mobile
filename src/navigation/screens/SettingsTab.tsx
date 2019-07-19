import React, { Component } from "react";

import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import QrCodeGenerator from "../../components/QrGenerator";
import styles from "./styles";
import TitleBar from "../../components/TitleBar";

export default class SettingsTab extends Component {
  state = {
    isDialogVisible: false
  };

  showQrDialog = () => {
    this.setState({ isDialogVisible: true });
  };

  render() {
    return (
      <View style={styles.page}>
        <View style={[styles.titleBarBackground]}>
          <TitleBar style={styles.titleBar}>QR CODE TESTING</TitleBar>
        </View>
        <View style={[styles.contentScreen]}>
          <Button title="show qr" onPress={this.showQrDialog} />
          <QrCodeGenerator isVisible={this.state.isDialogVisible} />
        </View>
      </View>
    );
  }
}
