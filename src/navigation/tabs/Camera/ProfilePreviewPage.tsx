import { StyleSheet, View } from "react-native";
import { withNavigation } from "react-navigation";
import React from "react";
import { ValidationBar } from "../../../components/VerifyingBar";
import ProfilePreviewSection from "../../../components/ProfilePreviewSection";
// eslint-disable-next-line no-unused-vars
import { Navigation } from "./types";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignItems: "stretch"
  }
});

interface ProfilePreviewPageProps {
  navigation: Navigation;
}

const ProfilePreviewPage = (props: ProfilePreviewPageProps) => {
  const { navigation } = props;
  const certificate = navigation.getParam("certificate");

  return (
    <View style={styles.container}>
      <ValidationBar certificate={"sampleCert"} />
      <ProfilePreviewSection
        certificate={certificate}
        navigation={navigation}
      />
    </View>
  );
};

export default withNavigation(ProfilePreviewPage);
