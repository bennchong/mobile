import React, { useState, useEffect } from "react";
import { View, StyleSheet, NetInfo } from "react-native";
import { ValidationBar, MessageBar, NoWifiBar } from "../TopBar";
import { ProfileSection } from "./ProfileSection";
import { NoProfile } from "./NoProfile/NoProfile";
import { NoWifiModal } from "../Modals/NoWifiModal";
import { useStateValue } from "../../state";
import { getCurrentDateAndTime } from "../../services/date/date";
import {
  verificationStatusEnum,
  verifyWorkpass
} from "../../services/verificationService/verificationService";
import { white, black } from "../../themeColors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center"
  },
  shadow: {
    borderColor: white,
    elevation: 5,
    shadowColor: black,
    shadowOpacity: 0.85
  }
});

interface ProfileContainerProps {
  workpass: object;
  isPreview: boolean;
  profileSelected: number;
  changeProfileSelected: Function;
}

export const ProfileContainer = ({
  workpass,
  isPreview,
  profileSelected,
  changeProfileSelected
}: ProfileContainerProps) => {
  const [
    { workpassAcceptedBooleanArray, sessionValidatedArray },
    dispatch
  ] = useStateValue();
  const [validityStatusArray, setValidityStatus] = useState(
    isPreview
      ? [false]
      : new Array(workpassAcceptedBooleanArray.length).fill(
          verificationStatusEnum.VALIDATING
        )
  );
  const [previewTimeVerified, setPreviewTime] = useState("");
  const [internetConnected, setConnected] = useState(true);
  const [showModal, setShowModal] = useState(!internetConnected);

  const storeTime = async () => {
    // Refactor function below
    dispatch({
      type: "SET_TIME_VERIFIED",
      profileIndex: profileSelected
    });
  };

  const handleConnectivityChange = () => {
    NetInfo.isConnected.fetch().then(isConnected => {
      setConnected(isConnected);
    });
  };

  useEffect(() => {
    // Check for internet connection
    NetInfo.isConnected.fetch().then(isConnected => {
      setConnected(isConnected);
      if (!isConnected) {
        setShowModal(true);
      }
    });
    NetInfo.addEventListener("connectionChange", handleConnectivityChange);
    // verify workpass once
    if (isPreview || (workpass && !sessionValidatedArray[profileSelected])) {
      const newValidityStatusArray = validityStatusArray;
      newValidityStatusArray[profileSelected] =
        verificationStatusEnum.VALIDATING;
      setValidityStatus(newValidityStatusArray);
      sessionValidatedArray[profileSelected] = true;
      verifyWorkpass(workpass).then(status => {
        dispatch({
          type: "UPDATE_SESSION_ARRAY",
          sessionValidatedArray
        });
        // Refator action below
        dispatch({
          type: "VALIDATED_SESSION",
          profileIndex: profileSelected
        });
        newValidityStatusArray[profileSelected] = status;
        setValidityStatus(newValidityStatusArray);
        if (status && !isPreview) {
          storeTime();
        } else if (status && isPreview) {
          setPreviewTime(getCurrentDateAndTime());
          sessionValidatedArray[profileSelected] = false;
        }
      });
    }
  }, [internetConnected, profileSelected, workpass]);

  return workpass ? (
    <View style={[styles.container, isPreview ? styles.shadow : null]}>
      {!internetConnected && <NoWifiBar />}
      {(workpassAcceptedBooleanArray[profileSelected] || isPreview) &&
        internetConnected && (
          <ValidationBar
            status={validityStatusArray[profileSelected]}
            isPreview={isPreview}
          />
        )}
      {!workpassAcceptedBooleanArray[profileSelected] && !isPreview && (
        <MessageBar />
      )}
      <ProfileSection
        status={validityStatusArray[profileSelected]}
        workpass={workpass}
        isPreview={isPreview}
        previewTimeVerified={previewTimeVerified}
        profileSelected={profileSelected}
        changeProfileSelected={changeProfileSelected}
      />
      <NoWifiModal
        handleCloseModal={() => setShowModal(false)}
        showModal={showModal}
      />
    </View>
  ) : (
    <>
      <NoProfile />
      <NoWifiModal
        handleCloseModal={() => setShowModal(false)}
        showModal={showModal}
      />
    </>
  );
};
