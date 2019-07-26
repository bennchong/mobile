import React from "react";
import { useStateValue } from "../../../state";
import "../../../components/profile/ProfileContainer";
import { ProfileContainer } from "../../../components/profile/ProfileContainer";

const ProfileTab = () => {
  const [{ workpass }] = useStateValue();
  return (
    <ProfileContainer isPreview={false} workpass={workpass} navigation={null} />
  );
};

export { ProfileTab };
