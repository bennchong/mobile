import React, { useState, useEffect } from "react";
import { View, StyleSheet, NetInfo } from "react-native";
import { ProfilePageSections } from "./ProfilePageSections/ProfilePageSections";
import { NoWifiModal } from "../../Modals/NoWifiModal";
import { useStateValue } from "../../../state";
import { getCurrentDateAndTime } from "../../../services/date/date";
import {
  verificationStatusEnum,
  verifyWorkpass
} from "../../../services/verificationService/verificationService";
import { white, black } from "../../../themeColors";
import { profileTypeEnum } from "../profileTypeEnum";
import { ProfilePageBanner } from "./ProfilePageBanner";

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

export const ProfilePage = ({
  workpass,
  workpassType,
  profileSelected,
  changeProfileSelected
}: ProfileContainerProps) => {
  const [{ profilesArray }, dispatch] = useStateValue();
  const [previewTimeVerified, setPreviewTime] = useState("");
  const [internetConnected, setConnected] = useState(true);
  const [showModal, setShowModal] = useState(!internetConnected);
  const [currentProfileStatus, setCurrentProfileStatus] = useState(
    verificationStatusEnum.VALIDATING
  );

  const storeTime = () => {
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
    // Verify sharedProfile
    if (workpassType === profileTypeEnum.SHARED) {
      verifyWorkpass(workpass).then(status => {
        setCurrentProfileStatus(status);
        setPreviewTime(getCurrentDateAndTime());
      });
    } else if (
      //Verifies stored profiles only for one time
      profilesArray[profileSelected].validityStatus ===
      verificationStatusEnum.VALIDATING
    ) {
      setCurrentProfileStatus(profilesArray[profileSelected].validityStatus);
      verifyWorkpass(workpass).then(status => {
        dispatch({
          type: "UPDATE_VALIDITY",
          profileIndex: profileSelected,
          status: status
        });
        if (status && workpassType === profileTypeEnum.STORED) {
          storeTime();
        }
        setCurrentProfileStatus(status);
      });
    } else {
      //For alreaady verified profiles, when switching around profileSelected
      setCurrentProfileStatus(profilesArray[profileSelected].validityStatus);
    }
  }, [internetConnected, profileSelected, workpass]);

  return (
    <View
      style={[
        styles.container,
        workpassType !== profileTypeEnum.STORED ? styles.shadow : null
      ]}
    >
      <ProfilePageBanner
        internetConnected={internetConnected}
        workpassType={workpassType}
        status={currentProfileStatus}
      />
      <ProfilePageSections
        status={currentProfileStatus}
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
  );
};
