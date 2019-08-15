import React from "react";
import { View, Image, Text } from "react-native";
import { ProfileName } from "../ProfileName";
import { useStateValue } from "../../../state";
import { styles } from "./ProfileImageStyles";
import { verificationStatusEnum } from "../../../services/verificationService/verificationService";

interface ProfileImageProps {
  status: number;
  recipient: any;
  isPreview: boolean;
  previewTimeVerified: string;
}

export const ProfileImage = ({
  status,
  recipient,
  isPreview,
  previewTimeVerified
}: ProfileImageProps) => {
  const [{ timeVerified, workpassAccepted }] = useStateValue();
  const { photo, fin, name } = recipient;

  let timeShown;
  switch (isPreview) {
    case true:
      timeShown = previewTimeVerified;
      break;
    default:
      timeShown = timeVerified;
  }
  const showTimeVerified =
    (!isPreview && workpassAccepted && timeShown.length !== 0) ||
    (isPreview && timeShown.length !== 0);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.background}>
          {showTimeVerified ? (
            <Text style={styles.verifiedText}>
              System last verified: {timeShown}
            </Text>
          ) : null}
        </View>
        <ProfileName
          status={status}
          photo={photo}
          fin={fin}
          name={name}
          isPreview={isPreview}
        />
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: `data:image/gif;base64,${photo}` }}
          />
        </View>
      </View>
      <View style={styles.margin} />
    </>
  );
};
