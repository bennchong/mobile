import React from '../../../../../node_modules/react';
import { StyleSheet, Text, View } from 'react-native';
import VerifyingBar from '../components/VerifyingBar';

export default class Profile extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <VerifyingBar status='validated'/>
        <Text>Profile Page Placeholder</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
});