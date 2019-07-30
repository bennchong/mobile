import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, AsyncStorage, Text } from "react-native";
import { ValidationBar, statusEnum } from "../VerifyingBar";
import { ProfileSection } from "./ProfileSection";
import { NoProfile } from "./NoProfile";
import { verifyWorkpassBoolean } from "../../services/verificationService";
import { MessageBar } from "../MessageBar";
import { useStateValue } from "../../state";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center"
  }
});

interface ProfileContainerProps {
  navigation: any;
  workpass: object;
  isPreview: boolean;
}

export const ProfileContainer = ({
  navigation,
  workpass,
  isPreview
}: ProfileContainerProps) => {
  const [validityStatus, setValidityStatus] = useState(statusEnum.VALIDATING);
  const [{ workpassAccepted }, dispatch] = useStateValue();

  useEffect(() => {
    verifyWorkpassBoolean(workpass).then(isValid => {
      setValidityStatus(isValid ? statusEnum.VALID : statusEnum.INVALID);
    });

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
