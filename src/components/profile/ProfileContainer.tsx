import React from "react";
import { View, StyleSheet } from "react-native";
import { ValidationBar, statusEnum } from "../VerifyingBar";
import { ProfileSection } from "./ProfileSection";
import { NoProfile } from "./NoProfile";

const ProfileContainer = ({ navigation, workpass, isPreview }) => {
  return workpass ? (
    <View style={styles.container}>
      <ValidationBar status={statusEnum.VALIDATING} />
      <ProfileSection
        workpass={workpass}
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
