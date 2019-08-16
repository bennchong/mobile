import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import { useStateValue } from "../../../state";
import { PassCode } from "../../Authentication/PassCode";

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
  const [{ workpassAccepted }] = useStateValue();

  return (
    <>
      <View style={{ backgroundColor: "#fff" }}>
        {props.title ? (
          <View style={styles.headerContainer}>
            <Text style={styles.header}>{props.title}</Text>
            {workpassAccepted ? (
              <TouchableOpacity
                onPress={() => {
                  setShow(!show);
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
          <PassCode showSuccess={() => setShow(true)} register={false} />
        )}
      </View>
    </>
  );
};
