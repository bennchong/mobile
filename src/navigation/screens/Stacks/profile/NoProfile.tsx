import React from '../../../../../node_modules/react';
import { StyleSheet, Text, View } from 'react-native';

export default class NoProfile extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{color: 'red'}}>Please acquire a profile page</Text>
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