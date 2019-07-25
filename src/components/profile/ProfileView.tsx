import { View } from "react-native";
import React, { useState } from "react";
import { ValidationBar, statusEnum } from "../VerifyingBar";
import { styles } from "../../styles";
import { ProfileSection } from "./ProfileSection";

interface ProfileProps {
  workpass: object;
}

// smart component
// includes calling the verify API to update ValidationBar

export const Profile = (props: ProfileProps) => {
  const [validityStatus, setValidityStatus] = useState(statusEnum.VALIDATING);

  setTimeout(() => {
    setValidityStatus(statusEnum.VALID);
  }, 3000);

  return (
    <View style={styles.contentScreen}>
      <ValidationBar status={validityStatus} />
      <ProfileSection isPreview={false} workpass={props.workpass} />
    </View>
  );
};

