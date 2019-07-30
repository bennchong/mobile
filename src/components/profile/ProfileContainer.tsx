import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, AsyncStorage } from "react-native";
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

export const ProfileContainer = ({ navigation, workpass, isPreview }) => {
  const [validityStatus, setValidityStatus] = useState(statusEnum.VALIDATING);

  setTimeout(() => {
    setValidityStatus(statusEnum.VALID);
  }, 3000);

  const context = useContext(StateContext);
  const dispatch = context[1];

  useEffect(() => {
    AsyncStorage.getItem("@storedTimeAccepted").then(storedTimeAccepted => {
      if (storedTimeAccepted) {
        dispatch({
          type: "SET_WORKPASS_ACCEPTED",
          time: storedTimeAccepted
        });
      }
    });
  }, []);

  return workpass ? (
    <View style={styles.container}>
      {context[0].workpassAccepted && <ValidationBar status={validityStatus} />}
      {!context[0].workpassAccepted && <MessageBar />}
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

ProfileContainer.propTypes = {
  navigation: PropTypes.any,
  workpass: PropTypes.object,
  isPreview: PropTypes.bool
};
