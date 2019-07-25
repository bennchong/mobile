import { View } from "react-native";
import React from "react";
import { ValidationBar } from "../VerifyingBar";
import { styles } from "../../styles";
import { ProfileSection } from "./ProfileSection";

interface ProfileProps {
  workpass: object;
}

const Profile = (props: ProfileProps) => {
  return (
    <View style={styles.contentScreen}>
      <ValidationBar workpass={props.workpass} />
      <ProfileSection isPreview={false} workpass={props.workpass} />
    </View>
  );
};

export { Profile };
