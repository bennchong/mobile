import React from '../../../node_modules/react';
import { StyleSheet, Text, View } from 'react-native';
import BarcodeScannerExample from '../../components/BarcodeScannerExample';
import StateContext from '../../components/AppContext';

export default class ScannerScreen extends React.Component {
  render() {
    return (
      <View style={StyleSheet.absoluteFillObject}>
        <StateContext.Consumer>
          {({test, changeTestState}) => (<BarcodeScannerExample test={test} changeTestState={changeTestState}/>)}
        </StateContext.Consumer>
        
      </View>
    );
  }
};