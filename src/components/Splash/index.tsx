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

const imageSource = require("../../assets/splash.png");

interface SplashScreenProps {
  navigation: any;
}

export const SplashScreen = (props: SplashScreenProps) => {
  const [, dispatch] = useStateValue();
  const { navigate } = props.navigation;

  // eslint-disable-next-line no-unused-vars
  // Only call this when you have to reset the entire file-system
  const clearAppMemory = () => {
    deleteProfilesArray();
  };

  const loadWorkpassIntoContext = async () => {
    // First time loading app will not have profileArray
    const profilesArrayExist = await checkProfilesArrayExists();
    if (profilesArrayExist) {
      const profilesArray = await getProfilesArray();
      // Resets verification boolean to false for each session
      // eslint-disable-next-line no-return-assign
      profilesArray.map(profile => (profile.validatedThisSession = false)); // eslint-disable-line no-param-reassign
      dispatch({
        type: "LOAD_PROFILESARRAY_FROM_FS",
        profilesArray
      });
      if ( checkIfPassExists(profilesArray) >= 0) navigate("Profile");
      else navigate("Camera");
    } else {
      await storeProfilesArray(initialState.profilesArray);
      navigate("Camera");
    }
  };
  useEffect(() => {
    loadWorkpassIntoContext().catch(e => {Alert.alert("Loading of Data Error", e)})
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image source={imageSource} style={{ resizeMode: "center" }} />
    </View>
  );
};
