import React from "react";
import { View } from "react-native";
import { useStateValue } from "../../../state";
import "../../../components/profile/ProfileContainer";
import { ProfileContainer } from "../../../components/profile/ProfileContainer";

const ProfileTab = () => {
  const [{ certificate }] = useStateValue();
  return (
    <ProfileContainer
      isPreview={false}
      certificate={certificate}
      navigation={null}
    />
  );
};

export { ProfileTab };
