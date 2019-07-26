import React from "react";
import { View, Text, Button } from "react-native";
import { Header } from "../Layout/Header";
import { styles } from "./styles";
import { withNavigation } from "react-navigation";

const SettingsTemplate = (props) => {
  return (
    <View style={styles.page}>
      <Header text={"SETTINGS"} />
      <View style={styles.buttonContainer}>
        {/* <Button title="Open Information Page"onPress={() =>  props.navigation.navigate("DevDebug")} /> */}
        <Button title="Open Dev Debug Page"onPress={() =>  props.navigation.navigate("DevDebug")} />
      </View>
    </View>
  );
};

export default withNavigation(SettingsTemplate);
