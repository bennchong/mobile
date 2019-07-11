import * as React from 'react';
import { Alert, View, StyleSheet, Button, Text } from 'react-native';
import * as Permissions from 'expo-permissions';

import { BarCodeScanner } from 'expo-barcode-scanner';
import NavigationService from '../navigation/NavigationService';

export default class BarcodeScannerExample extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };

  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission != null && hasCameraPermission === true) {
      return (
        <View
          style={{
            flex: 1, 
            justifyContent: "flex-end",
          }}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFill}
          />
          <Button title={'Tap to Scan Again'} onPress={() => this.setState({ scanned: false })} />
          <Text> {this.props.test.toString()} hello {typeof(this.props.test)}</Text>
        </View>
      );
    }
    else {
      return null
    }
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    Alert.alert(
      'QR Code Detected',
      'Do you want to accept this QR Code?',
      [
        {text: 'No', onPress: () => {
        }},
        {text: 'Yes', onPress: () => {
          this.props.changeTestState(); 
          alert(`Bar code with type ${type} and data ${data} has been scanned!`);
          NavigationService.navigate('Profile', {}); 
        }},
      ], 
      {cancelable: false},
    );
  };
}