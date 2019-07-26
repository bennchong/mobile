import { StyleSheet, Text, View, Alert } from "react-native";
import { withNavigation } from "react-navigation";
import React from "react";
import { ValidationBar } from "../VerifyingBar";
import { styles } from "../../styles";
import { ProfileSection } from "./ProfileSection";
import Constants from 'expo-constants';

const topNotch = StyleSheet.create({
  ProfileScreen: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
    marginTop: Constants.statusBarHeight + 30,
  },
});

const Profile = props => {
  return (
    <View style={topNotch.ProfileScreen}>
      <ValidationBar certificate={props.workpass} />
      <ProfileSection isPreview={false} certificate={props.workpass} />
    </View>
  );
};

export { Profile };
