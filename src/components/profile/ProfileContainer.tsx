import React from "react";
import { View, StyleSheet } from "react-native";
import { ValidationBar } from "../VerifyingBar";
import { ProfileSection } from "./ProfileSection";
import { NoProfile } from "./NoProfile";

const sampleCert = {
  test: "sample"
};
const ProfileContainer = ({ navigation, certificate, isPreview }) => {
  return certificate ? (
    <View style={styles.container}>
      <ValidationBar certificate={certificate} />
      <ProfileSection
        certificate={certificate}
        navigation={navigation}
        isPreview={isPreview}
      />
    </View>
  ) : (
    <NoProfile />
  );
};

export { ProfileContainer };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center"
  }
});
