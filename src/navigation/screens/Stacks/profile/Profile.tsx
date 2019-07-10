import React from '../../../../../node_modules/react';
import { StyleSheet, Text, View } from 'react-native';

export default class Profile extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Profile Page Placeholder</Text>
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