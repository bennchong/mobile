import React, { useEffect } from "react";
import { View, Image } from "react-native";
import { useStateValue } from "../../state";
import {
  checkStoredWorkpassExists,
  getStoredWorkpass,
  checkStoredDPWorkpassExists,
  getStoredDPWorkpass,
  checkProfilesArrayExists,
  getProfilesArray
} from "../../services/fileSystem";

const imageSource = require("../../assets/splash.png");

interface SplashScreenProps {
  navigation: any;
}

export const SplashScreen = (props: SplashScreenProps) => {
  const [, dispatch] = useStateValue();
  const { navigate } = props.navigation;

  const loadAcceptedTimeIntoContext = async () => {
    // const storedTimeAcceptedArrayString = await getStoredTimeAccepted();
    // let storedTimeAcceptedArray;
    // try {
    //   storedTimeAcceptedArray = JSON.parse(storedTimeAcceptedArrayString);
    // } catch (e) {
    //   storedTimeAcceptedArray = [""];
    // }
  };

  const loadWorkpassIntoContext = async () => {
    const workpassExist = await checkStoredWorkpassExists();
    const DPWorkpassExist = await checkStoredDPWorkpassExists();
    // Refactor code
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
    }
    if (!workpassExist && !DPWorkpassExist) {
      navigate("Camera");
    } else {
      if (workpassExist) {
        const workpass = await getStoredWorkpass();
        dispatch({
          type: "UPDATE_WORKPASS",
          workpass
        });
      }
      if (DPWorkpassExist) {
        const dpWorkpassArray = await getStoredDPWorkpass();
        dispatch({
          type: "UPDATE_DP_WORKPASS_ARRAY",
          dpWorkpassArray
        });
      }
      navigate("Profile");
    }
  };
  useEffect(() => {
    loadAcceptedTimeIntoContext().then(loadWorkpassIntoContext);
    // .catch(e => {Alert.alert("Loading of Data Error", e)})
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image source={imageSource} style={{ resizeMode: "center" }} />
    </View>
  );
};
