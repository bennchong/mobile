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
  const [{ profilesArray }] = useStateValue();
  const { photo, fin, name } = recipient;
  const { SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;

  let rightPhoto;
  let leftPhoto;

  // If there is a main pass stored in phone
  if (profilesArray[0].workpass !== null) {
    // More than one pass in phone
    if (
      profilesArray.length > 0 &&
      profileSelected <= profilesArray.length - 1
    ) {
      // rightIndex to check whether its last profile selected
      const rightIndex =
        profileSelected + 1 === profilesArray.length ? -1 : profileSelected + 1;
      rightPhoto =
        rightIndex >= 0
          ? getData(profilesArray[rightIndex].workpass).recipient.photo
          : null;

      const cleanWorkpass = getData(profilesArray[0].workpass);
      // Case where left is main pass photo
      if (profileSelected === 1) {
        leftPhoto = cleanWorkpass.recipient.photo;
      } else if (profileSelected > 1) {
        // Case where left not main pass photo
        leftPhoto = getData(profilesArray[profileSelected - 1].workpass)
          .recipient.photo;
      }
    }
  } else if (profilesArray.length > 2) {
    // If no main pass
    // Displaying right photo if its not the last pass in array
    if (profileSelected < profilesArray.length - 1) {
      rightPhoto = getData(profilesArray[profileSelected + 1].workpass)
        .recipient.photo;
    }
    // Displaying left photo
    if (profileSelected > 1) {
      leftPhoto = getData(profilesArray[profileSelected - 1].workpass).recipient
        .photo;
    }
  }

  let timeShown;
  if (isPreview) {
    timeShown = previewTimeVerified;
  } else {
    timeShown = profilesArray[profileSelected].timeLastVerified;
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.background}>
          <Text style={styles.verifiedText}>
            System last checked: {timeShown}
          </Text>
          {!isPreview ? (
            <PageIndicator
              items={profilesArray}
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
          {!isPreview && profileSelected + 1 < profilesArray.length ? (
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
