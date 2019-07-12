import React from 'react';
import { StyleSheet, View } from 'react-native';
import BarcodeScannerExample from '../../components/BarcodeScannerExample';
import StateContext from '../../components/AppContext';

export default class ScannerTab extends React.Component {
  render() {
    return (
      <View style={[StyleSheet.absoluteFillObject]}>
        <StateContext.Consumer>
          {({test, changeTestState}) => (<BarcodeScannerExample test={test} changeTestState={changeTestState}/>)}
        </StateContext.Consumer>       
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});