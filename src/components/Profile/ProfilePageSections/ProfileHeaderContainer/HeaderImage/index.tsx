import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { styles } from "./HeaderImageStyles";
import { profileTypeEnum } from "../../../profileTypeEnum";
import { swipeDirections } from "react-native-swipe-gestures";
import { useStateValue } from "../../../../../state";

export const HeaderImage = ({
  photo,
  leftPhoto,
  rightPhoto,
  workpassType,
  profileSelected,
  onSwipe
}) => {
  const { SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
  const [{ profilesArray }] = useStateValue();

  return (
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
      {workpassType === profileTypeEnum.STORED &&
      profileSelected + 1 < profilesArray.length ? (
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
  );
};
