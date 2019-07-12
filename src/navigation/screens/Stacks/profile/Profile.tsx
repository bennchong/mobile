import React from '../../../../../node_modules/react';
import { StyleSheet, Text, View } from 'react-native';
import VerifyingBar from '../components/VerifyingBar';

export default class Profile extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <VerifyingBar status='validating'/>
        <Text>Profile Page Placeholder</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: "stretch",
  },
});