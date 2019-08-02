import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
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
  workpass: object;
  isPreview: boolean;
}

export const ProfileContainer = ({
  workpass,
  isPreview
}: ProfileContainerProps) => {
  const [validityStatus, setValidityStatus] = useState(statusEnum.VALIDATING);

  const [{ workpassAccepted }] = useStateValue();

  useEffect(() => {
    // verify workpass once
    if (workpass) {
      verifyWorkpassBoolean(workpass).then(isValid => {
        setValidityStatus(isValid ? statusEnum.VALID : statusEnum.INVALID);
      });
    }
  }, []);

  return workpass ? (
    <View style={styles.container}>
      {(workpassAccepted || isPreview) && (
        <ValidationBar status={validityStatus} isPreview={isPreview} />
      )}
      {!workpassAccepted && !isPreview && <MessageBar />}
      <ProfileSection
        status={validityStatus}
        workpass={workpass}
        isPreview={isPreview}
      />
    </View>
  ) : (
    <NoProfile />
  );
};
