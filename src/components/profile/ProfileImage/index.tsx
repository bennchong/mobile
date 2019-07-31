import React, { useContext } from "react";
import { View, Image, Text } from "react-native";
import PropTypes from "prop-types";
import { ProfileName } from "../ProfileName";
import { StateContext } from "../../../state";
import { styles } from "./ProfileImageStyles";

export const ProfileImage = ({ status, recipient, isPreview }) => {
  const context = useContext(StateContext);
  const data = context[0];
  const { photo, fin, name } = recipient;
  return (
    <>
      <View style={styles.container}>
        <View style={styles.background}>
          {data.timeAccepted.length === 0 ? null : (
            <Text style={styles.verifiedText}>
              Verified on {data.timeAccepted}
            </Text>
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
  status: PropTypes.number
};
