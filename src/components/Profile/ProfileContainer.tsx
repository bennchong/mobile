import React, { useState, useEffect } from "react";
import { View, StyleSheet, NetInfo } from "react-native";
import { ValidationBar, NoWifiBar } from "../TopBar";
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
import { profileTypeEnum } from "./profileTypeEnum";
import { MessageBar } from "../TopBar/MessageBar";

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
  workpassType: any;
  profileSelected: number;
  changeProfileSelected: Function;
}

export const ProfileContainer = ({
  workpass,
  workpassType,
  profileSelected,
  changeProfileSelected
}: ProfileContainerProps) => {
  const [{ profilesArray }, dispatch] = useStateValue();
  const [validityStatusArray, setValidityStatus] = useState(
    workpassType !== profileTypeEnum.STORED
      ? [false]
      : new Array(profilesArray.length).fill(verificationStatusEnum.VALIDATING)
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
    if (
      workpassType === profileTypeEnum.PREVIEW ||
      (workpass && !profilesArray[profileSelected].validatedThisSession)
    ) {
      const newValidityStatusArray = validityStatusArray;
      newValidityStatusArray[profileSelected] =
        verificationStatusEnum.VALIDATING;
      setValidityStatus(newValidityStatusArray);
      verifyWorkpass(workpass).then(status => {
        newValidityStatusArray[profileSelected] = status;
        setValidityStatus(newValidityStatusArray);
        if (status && workpassType === profileTypeEnum.STORED) {
          storeTime();
          // Refator action below
          dispatch({
            type: "VALIDATED_SESSION",
            profileIndex: profileSelected,
            boolean: true
          });
        } else if (status /* && isPreview IF THIS WORKS REMOVE */) {
          setPreviewTime(getCurrentDateAndTime());
        }
      });
    }
  }, [internetConnected, profileSelected, workpass]);

  return workpass ? (
    <View
      style={[
        styles.container,
        workpassType !== profileTypeEnum.STORED ? styles.shadow : null
      ]}
    >
      {!internetConnected && <NoWifiBar />}
      {internetConnected && workpassType !== profileTypeEnum.PREVIEW && (
        <ValidationBar
          status={validityStatusArray[profileSelected]}
          workpassType={workpassType}
        />
      )}
      {workpassType === profileTypeEnum.PREVIEW && <MessageBar />}
      <ProfileSection
        status={validityStatusArray[profileSelected]}
        workpass={workpass}
        workpassType={workpassType}
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
