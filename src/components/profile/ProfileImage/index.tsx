import React from "react";
import { View, Image, Text } from "react-native";
import PropTypes from "prop-types";
import { ProfileName } from "../ProfileName";
import { useStateValue } from "../../../state";
import { styles } from "./ProfileImageStyles";

export const ProfileImage = ({ recipient, navigation, isPreview }) => {
  const [{ timeAccepted }] = useStateValue();

  const { photo, fin, name } = recipient;
  return (
    <>
      <View style={styles.container}>
        <View style={styles.background}>
          {timeAccepted.length === 0 ? null : (
            <Text style={{ paddingTop: 5 }}>Verified on {timeAccepted}</Text>
          )}
        </View>
        <ProfileName
          fin={fin}
          name={name}
          navigation={navigation}
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
  navigation: PropTypes.object,
  isPreview: PropTypes.bool
};
