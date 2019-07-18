import React, { Component } from 'react';
import QRCode from 'react-native-qrcode-svg';

import { StyleSheet, View, TextInput } from 'react-native';

// https://github.com/dumbest/react-native-qrcode-svg-expo

export default class QrCodeGenerator extends Component {
  state = {
    text: 'http://facebook.github.io/react-native/',
  };

  render() {
    return (
      <View style={styles.container}>
        <QRCode
          value={this.state.text}
          size={300 }/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'red',
      alignItems: 'center',
      justifyContent: 'center'
    },

    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        borderRadius: 5,
        padding: 5,
    },

    qrCode :{
        backgroundColor:"red",
        borderColor:"black",
        borderWidth:20,
    }
});