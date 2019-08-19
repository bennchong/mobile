import React, { useEffect } from "react";
import { View, Image } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { useStateValue } from "../../state";
import {
  checkStoredWorkpassExists,
  getStoredWorkpass,
  getStoredTime,
  getStoredTimeVerified
} from "../../services/fileSystem";

const imageSource = require("../../assets/splash.png");

interface SplashScreenProps {
  navigation: any;
}

export const SplashScreen = (props: SplashScreenProps) => {
  const [, dispatch] = useStateValue();
  const { navigate } = props.navigation;

  const loadAcceptedTimeIntoContext = async () => {
    const storedTimeAccepted = await getStoredTime();
    if (storedTimeAccepted) {
      dispatch({
        type: "SET_WORKPASS_ACCEPTED",
        time: storedTimeAccepted
      });
    }
  };

  const loadVerifiedTimeIntoContext = async () => {
    const storedTimeVerified = await getStoredTimeVerified();
    if (storedTimeVerified) {
      dispatch({
        type: "SET_WORKPASS_VERIFIED",
        time: storedTimeVerified
      });
    }
  };

  const loadWorkpassIntoContext = async () => {
    const workpassExist = await checkStoredWorkpassExists();
    if (!workpassExist) {
      navigate("Camera");
    } else {
      const workpass = await getStoredWorkpass();
      dispatch({
        type: "UPDATE_WORKPASS",
        workpass
      });
      navigate("Profile");
    }
  };

  const checkForAuthenticationCompatibility = async () => {
    //  A value of 1 indicates Fingerprint support and 2 indicates Facial Recognition support.
    // Eg: [1,2] means the device has both types supported.
    const supportedHardware = await LocalAuthentication.supportedAuthenticationTypesAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (supportedHardware.includes(1) && isEnrolled) {
      dispatch({ type: "SET_FINGERPRINT_AVAILABLE", compatible: true });
    } else {
      dispatch({ type: "SET_FINGERPRINT_AVAILABLE", compatible: false });
    }
  };

  useEffect(() => {
    loadAcceptedTimeIntoContext();
    loadVerifiedTimeIntoContext();
    loadWorkpassIntoContext();
    checkForAuthenticationCompatibility();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image source={imageSource} style={{ resizeMode: "center" }} />
    </View>
  );
};
