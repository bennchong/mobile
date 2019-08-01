import React from "react";
import { useStateValue } from "../../../state";
import { ProfileContainer } from "../../../components/profile/ProfileContainer";

const ProfileTab = () => {
  const [{ workpass }] = useStateValue();
  return <ProfileContainer isPreview={false} workpass={workpass} />;
};

export { ProfileTab };
