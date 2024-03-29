import React, { useEffect } from "react";
import { View, Image, Alert } from "react-native";
import { useStateValue } from "../../state";
import {
  checkProfilesArrayExists,
  getProfilesArray,
  storeProfilesArray,
  deleteProfilesArray
} from "../../services/fileSystem";
import { checkIfPassExists } from "../../helpers/ProfileArray";
import { initialState } from "../../state/initialState";
import { verificationStatusEnum } from "../../services/verificationService/verificationService";

const imageSource = require("../../assets/splash.png");

interface SplashScreenProps {
  navigation: any;
}

export const SplashScreen = (props: SplashScreenProps) => {
  const [, dispatch] = useStateValue();
  const { navigate } = props.navigation;

  // Only call this when you have to reset the entire file-system
  // eslint-disable-next-line no-unused-vars
  const clearAppMemory = () => {
    deleteProfilesArray();
  };

  const loadWorkpassIntoContext = async () => {
    // First time loading app will not have profileArray
    const profilesArrayExist = await checkProfilesArrayExists();
    if (profilesArrayExist) {
      const profilesArray = await getProfilesArray();
      // Resets verification boolean to false for each session
      profilesArray.forEach(
        // eslint-disable-next-line no-return-assign, no-param-reassign
        profile => (profile.validityStatus = verificationStatusEnum.VALIDATING)
      );
      dispatch({
        type: "LOAD_PROFILESARRAY_FROM_FS",
        profilesArray
      });
      if (checkIfPassExists(profilesArray) >= 0) navigate("Profile");
      else navigate("Camera");
    } else {
      await storeProfilesArray(initialState.profilesArray);
      navigate("Camera");
    }
  };
  useEffect(() => {
    loadWorkpassIntoContext().catch(e => {
      Alert.alert("Loading of Data Error", e);
    });
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image source={imageSource} style={{ resizeMode: "center" }} />
    </View>
  );
};
