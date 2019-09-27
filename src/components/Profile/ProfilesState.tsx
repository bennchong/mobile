import React, { useState } from "react";
import { useStateValue } from "../../state";
import { ProfileContainer } from "./ProfileContainer";

const profileSelector = (
  workpass,
  dpWorkpassArray,
  profileSelected,
  numberOfProfiles
) => {
  // Case when only dependent-pass is stored without main-pass
  if (workpass === null && numberOfProfiles > 0) {
    return dpWorkpassArray[profileSelected];
  } // Case when app has workpass and dependent passes
  if (workpass !== null && numberOfProfiles > 0 && profileSelected > 0) {
    return dpWorkpassArray[profileSelected - 1];
  }
  return workpass;
};

export const ProfilesState = () => {
  const [{ workpass, dpWorkpassArray, numberOfProfiles }] = useStateValue();
  const [profileSelected, changeProfileSelected] = useState(0);

  // For devdebug when deleting profiles, it would not change profileSelected and if its at index > 0 it will show no profile :(
  if (numberOfProfiles > 0 && profileSelected >= numberOfProfiles) {
    changeProfileSelected(0);
  }

  const selectedPass = profileSelector(
    workpass,
    dpWorkpassArray,
    profileSelected,
    numberOfProfiles
  );
  return (
    <ProfileContainer
      isPreview={false}
      workpass={selectedPass}
      profileSelected={profileSelected}
      changeProfileSelected={changeProfileSelected}
    />
  );
};
