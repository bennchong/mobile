import React from "react";
import { Text, StyleSheet, View } from "react-native";

interface DevAppStateTextPropsType {
  children: any;
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    paddingBottom: 5,
    alignContent: "center"
  },
  text: {
    fontSize: 10,
    color: "#808080"
  }
});

export const DevAppStateText = (props: DevAppStateTextPropsType) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> {props.children} </Text>
    </View>
  );
};
