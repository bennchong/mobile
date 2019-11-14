import React, { useState } from "react";
import { useStateValue } from "../../state";
import { ProfilePage } from "./ProfilePage/ProfilePage";
import { profileTypeEnum } from "./profileTypeEnum";
import { NoProfile } from "./NoProfile/NoProfile";

//Chooses which profile to display downstream from profilesArray
const profileSelector = (
  profilesArray,
  profileSelected,
  changeProfileSelected
) => {
  // Case when there is no main pass
  if (profilesArray.length === 1 && profilesArray[0].workpass === null) {
    return null;
  }
  if (
    profilesArray.length > 1 &&
    profilesArray[0].workpass === null &&
    profileSelected === 0
  ) {
    // When there are dependent pass and no main pass
    changeProfileSelected(1);
    return profilesArray[profileSelected].workpass;
  }
  return profilesArray[profileSelected].workpass;
};

export const ProfilesState = () => {
  const [{ profilesArray }] = useStateValue();
  const [profileSelected, changeProfileSelected] = useState(0);

  // For devdebug when deleting profiles, it would not change profileSelected and if its at index > 0 it will show no profile :(
  if (profilesArray.length > 0 && profileSelected >= profilesArray.length) {
    changeProfileSelected(0);
  }

  const initiateChangeProfileSelected = type => {
    if (type === "next" && profileSelected < profilesArray.length - 1) {
      changeProfileSelected(profileSelected + 1);
    } else if (type === "prev" && profileSelected > 0) {
      changeProfileSelected(profileSelected - 1);
    }
  };

  const selectedPass = profileSelector(
    profilesArray,
    profileSelected,
    changeProfileSelected
  );
  return selectedPass ? (
    <ProfilePage
      workpassType={profileTypeEnum.STORED}
      workpass={selectedPass}
      profileSelected={profileSelected}
      changeProfileSelected={initiateChangeProfileSelected}
    />
  ) : (
    <NoProfile />
  );
};
