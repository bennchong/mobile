import React, { useState } from "react";
import {
  Alert,
  Platform,
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import Constants from "expo-constants";
import { useStateValue } from "../../../state";
import { Fingerprint } from "../../Authentication/Fingerprint";
import { PassCode } from "../../Authentication/PassCode";
import { FingerprintModal } from "../../Modals/FingerprintModal";

const styles = StyleSheet.create({
  headerContainer: {
    marginHorizontal: 26,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#A9A9A9",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  header: { color: "#808080", fontWeight: "bold", fontSize: 13 },
  closeIcon: {
    position: "absolute",
    top: Constants.statusBarHeight,
    right: 20,
    zIndex: 1000
  }
});

interface DetailSectionProps {
  title: string;
  children: any;
}

interface DetailSectionSecretProps {
  title: string;
  children: any;
}

export const DetailSection = (props: DetailSectionProps) => {
  return (
    <View style={{ backgroundColor: "#fff" }}>
      {props.title ? (
        <View style={styles.headerContainer}>
          <Text style={styles.header}>{props.title}</Text>
        </View>
      ) : null}
      {props.children}
    </View>
  );
};

export const DetailSectionSecret = (props: DetailSectionSecretProps) => {
  const [show, setShow] = useState(false);
  const [showPassCode, setShowPassCode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [{ workpassAccepted, fingerprintAvailable }] = useStateValue();

  const scanFingerprint = async () => {
    setShowModal(true);

    const { error, success } = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate"
    });

    // eslint-disable-next-line no-console
    console.log(error, success);
    // eslint-enable-next-line no-console

    if (error === "lockout") {
      setShowModal(false);
      return Alert.alert(
        "Locked out",
        "Use passcode instead",
        [{ text: "Use passcode", onPress: () => setShowPassCode(true) }],
        { cancelable: false }
      );
    }
    if (!success) {
      return setShowModal(false);
    }
    setShow(true);
    return setShowModal(false);
  };

  const ScanFingerprint = () => (
    <Fingerprint scanFingerprint={scanFingerprint} />
  );

  const PassCodeAndroid = () => (
    <PassCode showSuccess={() => setShow(true)} register={false} />
  );

  let AuthBody;
  if (!showPassCode && fingerprintAvailable) {
    AuthBody = ScanFingerprint;
  } else {
    AuthBody = PassCodeAndroid;
  }

  return (
    <>
      {Platform.OS === "android" ? (
        <FingerprintModal
          handleCloseModal={() => setShowModal(false)}
          showModal={showModal}
        />
      ) : null}
      <View style={{ backgroundColor: "#fff" }}>
        {props.title ? (
          <View style={styles.headerContainer}>
            <Text style={styles.header}>{props.title}</Text>
            {workpassAccepted ? (
              <TouchableOpacity
                onPress={() => {
                  setShow(false);
                }}
              >
                <Text style={styles.header}>{show ? "Hide" : null}</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        ) : null}
        {show || !workpassAccepted ? props.children : <AuthBody />}
      </View>
    </>
  );
};
