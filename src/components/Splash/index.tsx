import React, { useEffect } from "react";
import { View, Image } from "react-native";
import PropTypes from "prop-types";
import { useStateValue } from "../../state";
import {
  checkStoredWorkpassExists,
  getStoredWorkpass,
  getStoredTime,
  getStoredTimeVerified
} from "../../services/fileSystem";

const imageSource = require("../../assets/splash.png");

export const SplashScreen = props => {
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

  useEffect(() => {
    loadAcceptedTimeIntoContext();
    loadVerifiedTimeIntoContext();
    loadWorkpassIntoContext();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image source={imageSource} style={{ resizeMode: "center" }} />
    </View>
  );
};

SplashScreen.propTypes = {
  navigation: PropTypes.any
};
