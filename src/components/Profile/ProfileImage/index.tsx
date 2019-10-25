import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { getData } from "@govtechsg/open-attestation";
import { swipeDirections } from "react-native-swipe-gestures";
import { ProfileName } from "../ProfileName";
import { useStateValue } from "../../../state";
import { styles } from "./ProfileImageStyles";
import { PageIndicator } from "../ProfilePageIndicator/PageIndicator";

interface ProfileImageProps {
  status: number;
  recipient: any;
  isPreview: boolean;
  previewTimeVerified: string;
  profileSelected: number;
  onSwipe: Function;
}

export const ProfileImage = ({
  status,
  recipient,
  isPreview,
  previewTimeVerified,
  profileSelected,
  onSwipe
}: ProfileImageProps) => {
  const [{ profilesArray, workpassAcceptedBooleanArray }] = useStateValue();
  const [{ dpWorkpassArray, workpass }] = useStateValue();
  const { photo, fin, name } = recipient;
  const { SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;

  let rightPhoto;
  let leftPhoto;

  // If there is a main pass stored in phone
  if (workpass !== null) {
    if (
      dpWorkpassArray.length > 0 &&
      profileSelected <= dpWorkpassArray.length
    ) {
      const rightIndex =
        profileSelected === dpWorkpassArray.length ? -1 : profileSelected;
      rightPhoto =
        rightIndex >= 0
          ? getData(dpWorkpassArray[rightIndex]).recipient.photo
          : null;

      const cleanWorkpass = getData(workpass);
      if (profileSelected === 1) {
        leftPhoto = cleanWorkpass.recipient.photo; // Case where left is main pass photo
      } else if (profileSelected > 1) {
        leftPhoto = getData(dpWorkpassArray[profileSelected - 2]).recipient
          .photo; // Case where left is from DP Array
      }
    }
  } else if (dpWorkpassArray.length > 1) {
    // Displaying right photo if its not the last DP in array
    if (profileSelected < dpWorkpassArray.length - 1) {
      rightPhoto = getData(dpWorkpassArray[profileSelected + 1]).recipient
        .photo;
    }
    // Displaying left photo
    if (profileSelected > 0) {
      leftPhoto = getData(dpWorkpassArray[profileSelected - 1]).recipient.photo;
    }
  }
  let timeShown;
  switch (isPreview) {
    case true:
      timeShown = previewTimeVerified;
      break;
    default:
      timeShown = profilesArray[profileSelected].timeLastVerified;
  }
  const showTimeVerified =
    (!isPreview && workpassAcceptedBooleanArray[profileSelected]) ||
    (isPreview && timeShown.length !== 0);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.background}>
          {showTimeVerified ? (
            <Text style={styles.verifiedText}>
              System last checked: {timeShown}
            </Text>
          ) : null}
          {!isPreview ? (
            <PageIndicator
              items={workpassAcceptedBooleanArray}
              profileSelected={profileSelected}
            />
          ) : null}
        </View>
        <ProfileName
          status={status}
          photo={photo}
          fin={fin}
          name={name}
          isPreview={isPreview}
          profileSelected={profileSelected}
        />
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: `data:image/gif;base64,${photo}` }}
          />

          {profileSelected > 0 ? (
            <TouchableOpacity
              style={styles.imageLeftContainer}
              onPress={() => onSwipe(SWIPE_RIGHT)}
            >
              <Image
                style={styles.imageLeft}
                source={{ uri: `data:image/gif;base64,${leftPhoto}` }}
              />
            </TouchableOpacity>
          ) : null}
          {!isPreview && profileSelected < dpWorkpassArray.length ? (
            <TouchableOpacity
              style={styles.imageRightContainer}
              onPress={() => onSwipe(SWIPE_LEFT)}
            >
              <Image
                style={styles.imageRight}
                source={{ uri: `data:image/gif;base64,${rightPhoto}` }}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      <View style={styles.margin} />
    </>
  );
};
