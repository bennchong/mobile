import React from "react";
import { View } from "react-native";
import { Header } from "../Layout/Header";
import { styles } from "./styles";
import { DevDebug } from "./DevDebug";

export const SettingTemplate = () => {
  

  return (
    <View style={styles.page}>
      <Header text={"SETTINGS"} />
      <View style={{ flex: 1, marginTop: 60 }}>
        <DevDebug />
      </View>
    </View>
  );
};
