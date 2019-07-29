import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { ValidationBar, statusEnum } from "../VerifyingBar";
import { ProfileSection } from "./ProfileSection";
import { NoProfile } from "./NoProfile";
import { StateContext } from "../../state";
import { MessageBar } from "../MessageBar";

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

  const context = useContext(StateContext);
  const { workpassAccepted } = context[0];

  return workpass ? (
    <View style={styles.container}>
      {workpassAccepted && <ValidationBar status={validityStatus} />}
      {!workpassAccepted && <MessageBar />}
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
