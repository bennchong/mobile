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
import { Camera } from "expo-camera";
import { Constants } from "expo-barcode-scanner";
import { NavigationEvents } from "react-navigation";
import NavigationService from "../navigation/NavigationService";
const crypto = require("..//helpers/Crypto")

export default class QrCodeGenerator extends React.Component{

    async componentDidMount(){
        // encryptString("aaaaa").then( data => {
        //     return decryptString(data.encryptedString)
        // }).then( res => {
        //     this.setState({result: res});
        // });
    }
    render(){

        return(
            <Text> {crypto.PGP_META_LENGTHS} </Text>
        );
    }
}