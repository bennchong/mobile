import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { ValidationBar, statusEnum } from "../VerifyingBar";
import { ProfileSection } from "./ProfileSection";
import { NoProfile } from "./NoProfile";
import { verifyWorkpassBoolean } from "../../services/verificationService";

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

  verifyWorkpassBoolean(workpass).then(isValid => {
    setValidityStatus(isValid ? statusEnum.VALID : statusEnum.INVALID);
  });

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
