import React, { useState, useEffect } from "react";
import { View, StyleSheet, AsyncStorage } from "react-native";
import { ValidationBar, statusEnum, MessageBar } from "../TopBar";
import { ProfileSection } from "./ProfileSection";
import { NoProfile } from "./NoProfile/NoProfile";
import { verifyWorkpassBoolean } from "../../services/verificationService";

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

const getTimeAccepted = async onGetTimeAccepted => {
  const storedTimeAccepted = await AsyncStorage.getItem("@storedTimeAccepted");
  onGetTimeAccepted(storedTimeAccepted);
};

export const ProfileContainer = ({
  navigation,
  workpass,
  isPreview
}: ProfileContainerProps) => {
  const [validityStatus, setValidityStatus] = useState(statusEnum.VALIDATING);

  const [{ workpassAccepted }, dispatch] = useStateValue();

  const onGetTimeAccepted = time => {
    if (time) {
      dispatch({
        type: "SET_WORKPASS_ACCEPTED",
        time
      });
    }
  };

  useEffect(() => {
    // verify workpass once
    verifyWorkpassBoolean(workpass).then(isValid => {
      setValidityStatus(isValid ? statusEnum.VALID : statusEnum.INVALID);
    });

    // get time accepted
    getTimeAccepted(onGetTimeAccepted);
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
