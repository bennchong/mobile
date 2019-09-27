import React, { useEffect } from "react";
import { View, Image } from "react-native";
import { useStateValue } from "../../state";
import {
  checkStoredWorkpassExists,
  getStoredWorkpass,
  getStoredTimeVerified,
  checkStoredDPWorkpassExists,
  getStoredDPWorkpass,
  checkNumberOfProfiles
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
    const numberOfProfiles = await checkNumberOfProfiles();
    dispatch({
      type: "SET_NUMBER_PROFILES",
      numberOfProfiles
    });
    const workpassAcceptedBooleanArray = new Array(numberOfProfiles).fill(true);
    dispatch({
      type: "SET_WORKPASS_ACCEPTED",
      workpassAcceptedBooleanArray
    });
  };

  const loadVerifiedTimeIntoContext = async () => {
    const storedTimeVerifiedString = await getStoredTimeVerified();
    let storedTimeVerified;
    try {
      storedTimeVerified = JSON.parse(storedTimeVerifiedString);
      // Exception when storeTimeVerified is null
      if (storedTimeVerified[0] === null) throw Error("I was null!");
    } catch (e) {
      const numberOfProfiles = await checkNumberOfProfiles();
      storedTimeVerified = new Array(numberOfProfiles).fill("");
    }
    dispatch({
      type: "SET_WORKPASS_TIME_VERIFIED_ARRAY",
      timeVerifiedArray: storedTimeVerified
    });
  };

  const loadWorkpassIntoContext = async () => {
    const workpassExist = await checkStoredWorkpassExists();
    const DPWorkpassExist = await checkStoredDPWorkpassExists();
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
    loadAcceptedTimeIntoContext()
      .then(loadVerifiedTimeIntoContext)
      .then(loadWorkpassIntoContext);
    // .catch(e => {Alert.alert("Loading of Data Error", e)})
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image source={imageSource} style={{ resizeMode: "center" }} />
    </View>
  );
};
