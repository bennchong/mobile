import React from '../../../node_modules/react';
import { StyleSheet, Text, View } from 'react-native';
import BarcodeScannerExample from '../../components/BarcodeScannerExample';

export default class ScannerScreen extends React.Component {
  render() {
    return (
      <View style={StyleSheet.absoluteFillObject}>
        <BarcodeScannerExample/>
      </View>
    );
  }
};