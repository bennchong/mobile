import React, { useContext } from "react";
import { View, Image, Text } from "react-native";
import { ProfileName } from "./ProfileName";
import { StateContext } from "../../state";
import { styles } from "./Styles/ProfileImageStyles";

export const ProfileImage = ({ recipient, navigation, isPreview }) => {
  const context = useContext(StateContext);
  const data = context[0];
  const { photo, fin, name } = recipient;
  return (
    <>
      <View style={styles.container}>
        <View style={styles.background}>
          {data.timeAccepted.length === 0 ? null : (
            <Text style={{ paddingTop: 5 }}>
              Verified on {data.timeAccepted}
            </Text>
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
