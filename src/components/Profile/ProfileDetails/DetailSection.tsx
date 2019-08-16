import React, { useState, useEffect } from "react";
import {
  Alert,
  Platform,
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import Constants from "expo-constants";
import { useStateValue } from "../../../state";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { PassCode } from "../../Authentication/PassCode";
import { FingerprintModal } from "../../Modals/FingerprintModal";
import * as LocalAuthentication from "expo-local-authentication";

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
  },

  icon: {
    alignSelf: "center"
  },
  inputSubLabel: {
    paddingTop: 30,
    color: "#000",
    textAlign: "center"
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
  const [attempts, setAttempts] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [{ workpassAccepted }] = useStateValue();

  const scanFingerprint = async () => {
    setShowModal(true);

    let { error, success } = await LocalAuthentication.authenticateAsync();

    console.log(error, success);

    if (!success && attempts < 4) {
      setAttempts(attempts + 1);
    } else if (success && attempts < 4) {
      setAttempts(4);
      setShow(true);
      setShowModal(false);
    }
  };

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
                  setAttempts(0);
                  setShow(false);
                }}
              >
                <Text style={styles.header}>{show ? "Hide" : null}</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        ) : null}
        {show || !workpassAccepted ? (
          props.children
        ) : (
          <View style={{ paddingVertical: 20 }}>
            <MaterialCommunityIcons
              name="fingerprint"
              size={80}
              color="#3557b7"
              style={styles.icon}
            />
            <TouchableOpacity onPress={scanFingerprint}>
              <Text style={styles.inputSubLabel}>
                Scan fingerprint to unlock information
              </Text>
            </TouchableOpacity>
          </View>
          // <PassCode showSuccess={() => setShow(true)} register={false} />
        )}
      </View>
    </>
  );
};
