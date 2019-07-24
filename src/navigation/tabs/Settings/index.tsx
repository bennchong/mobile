import React from "react";
import { View, Text } from "react-native";
import { useStateValue } from "../../../state";
import { styles } from "../../../styles";
import { TitleBar } from "../../../components/TitleBar";

const SettingsTab = () => {
  const [{ certificate }] = useStateValue();
  return (
    <View style={styles.page}>
      <TitleBar text="SETTINGS" />
      <View style={{ flex: 14 }}>
        <Text> SETTINGS PAGE </Text>
      </View>
    </View>
  );
};

export { SettingsTab };
