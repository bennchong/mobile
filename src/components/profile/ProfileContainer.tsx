import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { ValidationBar, statusEnum } from "../VerifyingBar";
import { ProfileSection } from "./ProfileSection";
import { NoProfile } from "./NoProfile";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center"
  }
});

const ProfileContainer = ({ navigation, workpass, isPreview }) => {
  const [validityStatus, setValidityStatus] = useState(statusEnum.VALIDATING);

  setTimeout(() => {
    setValidityStatus(statusEnum.VALID);
  }, 3000);

  return workpass ? (
    <View style={styles.container}>
      <ValidationBar status={validityStatus} />
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

ProfileContainer.propTypes = {
  navigation: PropTypes.any,
  workpass: PropTypes.object,
  isPreview: PropTypes.bool
};
