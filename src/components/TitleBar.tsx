import { StyleSheet, Text, View } from "react-native";
import React from "react";

function TitleBar(props) {
  return <Text style={props.style}>{props.children}</Text>;
}

export default TitleBar;
