import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { HeaderInformation } from "./HeaderInformation";
import { useStateValue } from "../../../../../state";
import { styles } from "./ProfileHeaderContainerStyles";
import { ProfileIndicator } from "./ProfileIndicator";
import { profileTypeEnum } from "../../../profileTypeEnum";
import { HeaderImage } from "./HeaderImage";
import { HeaderImageSelecter } from "./HeaderImageSelecter";

interface ProfileHeaderContainerProps {
  status: number;
  recipient: any;
  workpassType: any;
  previewTimeVerified: string;
  profileSelected: number;
  onSwipe: Function;
}

export const ProfileHeaderContainer = ({
  status,
  recipient,
  workpassType,
  previewTimeVerified,
  profileSelected,
  onSwipe
}: ProfileHeaderContainerProps) => {
  const [{ profilesArray }] = useStateValue();
  const { photo, fin, name } = recipient;
  const [rightPhoto, updateRightPhoto] = useState();
  const [leftPhoto, updateLeftPhoto] = useState();

  useEffect(() => {
    //Chooses left, right photo to display
    HeaderImageSelecter(
      profileSelected,
      profilesArray,
      updateRightPhoto,
      updateLeftPhoto
    );
  }, [profileSelected]);

  let timeShown;
  if (workpassType === profileTypeEnum.PREVIEW) {
    timeShown = previewTimeVerified;
  } else {
    timeShown = profilesArray[profileSelected].timeLastVerified;
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.background}>
          {workpassType !== profileTypeEnum.PREVIEW && (
            <Text style={styles.verifiedText}>
              System last checked: {timeShown}
            </Text>
          )}
          {workpassType === profileTypeEnum.STORED && (
            <ProfileIndicator
              items={profilesArray}
              profileSelected={profileSelected}
            />
          )}
        </View>
        <HeaderInformation
          status={status}
          photo={photo}
          fin={fin}
          name={name}
          workpassType={workpassType}
          profileSelected={profileSelected}
        />
        <HeaderImage
          photo={photo}
          leftPhoto={leftPhoto}
          rightPhoto={rightPhoto}
          workpassType={workpassType}
          profileSelected={profileSelected}
          onSwipe={onSwipe}
        />
      </View>
      <View style={styles.margin} />
    </>
  );
};
