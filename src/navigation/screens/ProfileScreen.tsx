import React from "react";
import { StyleSheet, Text, View, Alert } from "react-native";

import Profile from "./stacks/profile/Profile";
import NoProfile from "./stacks/profile/NoProfile";
import AppContext from "../../components/AppStore";

export default class ProfileScreen extends React.Component<{}, {}> {
  // Read up on context, it links to AppStore Class apparently, and this.context would allow us to acess AppStore methods and variables
  static contextType = AppContext;

  render() {
    return <Text> asd</Text>;
    // if (this.context.test) {
    //   return <Profile />;
    // }

    // return <NoProfile />;
  }
}
