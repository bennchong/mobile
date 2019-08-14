import React, { useState, useEffect } from "react";
import { View, StyleSheet, NetInfo } from "react-native";
import { ValidationBar, MessageBar, NoWifiBar } from "../TopBar";
import { ProfileSection } from "./ProfileSection";
import { NoProfile } from "./NoProfile/NoProfile";
import { NoWifiModal } from "../Modals/NoWifiModal";
import { useStateValue } from "../../state";
import { storeTimeVerified } from "../../services/fileSystem";
import { getCurrentDateAndTime } from "../../services/date/date";
import {
  verificationStatusEnum,
  verifyWorkpass
} from "../../services/verificationService/verificationService";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center"
  },
  shadow: {
    borderColor: "#fff",
    elevation: 5,
    shadowColor: "#000000",
    shadowOpacity: 0.85
  }
});

interface ProfileContainerProps {
  workpass: object;
  isPreview: boolean;
}

export const ProfileContainer = ({
  workpass,
  isPreview
}: ProfileContainerProps) => {
  const [{ workpassAccepted }, dispatch] = useStateValue();
  const [validityStatus, setValidityStatus] = useState(
    verificationStatusEnum.VALIDATING
  );
  const [previewTimeVerified, setPreviewTime] = useState("");
  const [internetConnected, setConnected] = useState(true);
  const [showModal, setShowModal] = useState(!internetConnected);

  const storeTime = async () => {
    await storeTimeVerified();
    dispatch({
      type: "SET_WORKPASS_VERIFIED",
      time: getCurrentDateAndTime()
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
    if (workpass) {
      verifyWorkpass(workpass).then(status => {
        setValidityStatus(status);
        if (status && !isPreview) {
          storeTime();
        } else if (status && isPreview) {
          setPreviewTime(getCurrentDateAndTime());
        }
      });
    }
  }, [internetConnected, workpass]);

  return workpass ? (
    <View style={[styles.container, isPreview ? styles.shadow : null]}>
      {!internetConnected && <NoWifiBar />}
      {(workpassAccepted || isPreview) && internetConnected && (
        <ValidationBar status={validityStatus} isPreview={isPreview} />
      )}
      {!workpassAccepted && !isPreview && <MessageBar />}
      <ProfileSection
        status={validityStatus}
        workpass={workpass}
        isPreview={isPreview}
        previewTimeVerified={previewTimeVerified}
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
