import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useStateValue } from "../../state";
import styles from "./AuthenticationStyles";

const source = {
  uri:
    "https://user-images.githubusercontent.com/4661784/56352614-4631a680-61d8-11e9-880d-86ecb053413d.png"
};

interface FingerprintProps {
  nextPage: any;
}

export const Fingerprint = ({ nextPage }: FingerprintProps) => {
  const [, dispatch] = useStateValue();

  return (
    <View style={styles.inputWrapper}>
      <Text style={styles.inputLabel}>Fingerprint detected</Text>
      <MaterialCommunityIcons
        name="fingerprint"
        size={80}
        color="#3557b7"
        style={styles.icon}
      />
      {/* <Image style={styles.icon} source={source} /> */}
      <Text style={styles.inputSubLabel}>
        Enable fingerprint for future authentication?
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 20
        }}
      >
        <TouchableOpacity
          onPress={() => {
            dispatch({ type: "SET_FINGERPRINT_AVAILABLE", compatible: true });
            nextPage();
          }}
          style={{
            alignItems: "center",
            backgroundColor: "#3557b7",
            width: 100,
            borderRadius: 30,
            padding: 10,
            margin: 20
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            dispatch({ type: "SET_FINGERPRINT_AVAILABLE", compatible: false });
            nextPage();
          }}
          style={{
            alignItems: "center",
            backgroundColor: "#3557b7",
            width: 100,
            borderRadius: 30,
            padding: 10,
            margin: 20
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>No</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
