import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BarcodeScannerExample from '../BarcodeScannerExample';

export default class ScannerScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <BarcodeScannerExample/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});