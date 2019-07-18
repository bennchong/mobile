import React from "react";

import { StyleSheet, Text, View, TextInput } from "react-native";
import QrCodeGenerator from "../../components/QrGenerator";
import {styles} from "./styles"
import TitleBar from "../../components/TitleBar";


const SettingsTab = () => (
      <View style={styles.page}>
        <View style={{...StyleSheet.absoluteFillObject, justifyContent:"center"}}>
          <QrCodeGenerator/>
        </View>
        <View style={[styles.titleBarBackground]}>
          <TitleBar style={styles.titleBar}>QR CODE TESTING</TitleBar>
        </View>
        <View style={[styles.contentScreen, {zIndex:0}]}>

        </View>
      </View>

);

export default SettingsTab;
