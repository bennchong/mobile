import { StyleSheet, Text, View, Alert } from "react-native";
import { withNavigation } from "react-navigation";
import React from "react";
import { ValidationBar } from "../VerifyingBar";
import { styles } from "../../styles";
import { ProfileSection } from "./ProfileSection";


const Profile = props => {
  return (
    <View style={styles.contentScreen}>
      <ValidationBar certificate={props.workpass} />
      <ProfileSection isPreview={false} certificate={props.workpass} />
    </View>
  );
};

export { Profile };
