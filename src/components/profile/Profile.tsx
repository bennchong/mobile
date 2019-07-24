import { StyleSheet, Text, View, Alert } from "react-native";
import { withNavigation } from "react-navigation";
import React from "react";
import { ValidationBar } from "../VerifyingBar";
import { styles } from "../../styles";
import { ProfileSection } from "./ProfileSection";
import {
  CERT_VALIDITY_STATUS,
  sampleCert
} from "../../constants/CertConstants";

const Profile = props => {
  return (
    <View style={styles.contentScreen}>
      <ValidationBar certificate={sampleCert} />
      <ProfileSection isPreview={false} certificate={sampleCert} />
    </View>
  );
};

export { Profile };
