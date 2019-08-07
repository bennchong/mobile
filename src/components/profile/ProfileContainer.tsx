import React, { useState, useEffect } from "react";
import { View, StyleSheet, NetInfo } from "react-native";
import { ValidationBar, MessageBar, NoWifiBar, statusEnum } from "../TopBar";
import { ProfileSection } from "./ProfileSection";
import { NoProfile } from "./NoProfile/NoProfile";
import { NoWifiModal } from "../Modals/NoWifiModal";
import { verifyWorkpassBoolean } from "../../services/verificationService";
import { useStateValue } from "../../state";
import { storeTimeVerified } from "../../services/fileSystem";
import { getCurrentDateAndTime } from "../../services/date";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    borderColor: "#F5F5F5",
    elevation: 5,
    shadowColor: "#000000",
    shadowOpacity: 0.85,
    shadowRadius: 10,
    shadowOffset: {
      height: 5,
      width: 5
    }
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
  const [validityStatus, setValidityStatus] = useState(statusEnum.VALIDATING);
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
      verifyWorkpassBoolean(workpass).then(isValid => {
        setValidityStatus(isValid ? statusEnum.VALID : statusEnum.INVALID);
        if (isValid && !isPreview) {
          storeTime();
        } else if (isValid && isPreview) {
          setPreviewTime(getCurrentDateAndTime());
        }
      });
    }
  }, [internetConnected, workpass]);

  return workpass ? (
    <View style={styles.container}>
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
