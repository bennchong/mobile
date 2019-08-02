import React from "react";
import { View, Image, Text } from "react-native";
import PropTypes from "prop-types";
import { ProfileName } from "../ProfileName";
import { useStateValue } from "../../../state";
import { styles } from "./ProfileImageStyles";

export const ProfileImage = ({
  status,
  recipient,
  isPreview,
  previewTimeVerified
}) => {
  const [{ timeVerified }] = useStateValue();
  const { photo, fin, name } = recipient;

  let timeShown;
  switch (isPreview) {
    case true:
      timeShown = previewTimeVerified;
      break;
    default:
      timeShown = timeVerified;
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.background}>
          {timeShown.length === 0 ? null : (
            <Text style={styles.verifiedText}>Last verified {timeShown}</Text>
          )}
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

ProfileImage.propTypes = {
  recipient: PropTypes.object,
  isPreview: PropTypes.bool,
  status: PropTypes.number,
  previewTimeVerified: PropTypes.string
};
