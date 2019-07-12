import React from '../../../node_modules/react';
import { StyleSheet, Text, View } from 'react-native';
import Profile from "./Stacks/profile/Profile";
import NoProfile from "./Stacks/profile/NoProfile";

interface MyProps{
  testState: boolean
}

export default class ProfileScreen extends React.Component<MyProps,{}> {
  
  render() {
    if(this.props.testState) {
      return(
        <Profile />
      );
    }
    else {
      return(
        <NoProfile />
      )
    }
  }
}