import { StyleSheet, Text, View, Alert } from "react-native";
import { withNavigation } from "react-navigation";
import React from "react";
import { ValidationBar } from "../VerifyingBar";
import { styles } from "../../styles";
import { ProfileSection } from "./ProfileSection";

const sampleCert = {
  test: "sample"
};
const Profile = props => {
  return (
    <View style={styles.contentScreen}>
      <ValidationBar certificate={sampleCert} />
      <ProfileSection isPreview={false} certificate={sampleCert} />
    </View>
  );
};

export { Profile };
