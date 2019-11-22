import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { swipeDirections } from "react-native-swipe-gestures";
import { styles } from "./HeaderImageStyles";
import { profileTypeEnum } from "../../../../profileTypeEnum";
import { useStateValue } from "../../../../../../state";

interface HeaderImageProps {
  photo: string;
  leftPhoto: string;
  rightPhoto: string;
  workpassType: object;
  profileSelected: number;
  onSwipe: object;
}

export const HeaderImage = ({
  photo,
  leftPhoto,
  rightPhoto,
  workpassType,
  profileSelected,
  onSwipe
}: HeaderImageProps) => {
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
