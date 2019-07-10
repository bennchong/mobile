import React from '../../../node_modules/react';
import { StyleSheet, Text, View } from 'react-native';
import Profile from "./Stacks/profile/Profile";
import NoProfile from "./Stacks/profile/NoProfile";

export default class ProfileScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    const barcodeStatus = navigation.getParam('barcode_status', 'Not Captured');

    if(barcodeStatus === 'Captured') {
      return(
        <Profile />
      );
    }
    else {
      return(
        <NoProfile />
      )
    }
    // return (
    //   <View style={styles.container}>
    //     <Text>Profile Page</Text>
    //     <Text>Have you captured QR code yet?: {JSON.stringify(barcodeStatus)}</Text>
    //   </View>
    // );
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