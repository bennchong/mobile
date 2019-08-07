import React from "react";
import { ScrollView, Button } from "react-native";
import { withNavigation } from "react-navigation";
import Constants from "expo-constants";
import { DevDeleteWorkpass } from "./DevDebugSection/DevDeleteWorkpass";
import { DevStoreWorkPass } from "./DevDebugSection/DevStoreWorkPass";

interface IDevDebugProps {
  navigation: any;
}

const DevDebug = (props: IDevDebugProps) => {
  const goBack = () => props.navigation.goBack();
  return (
    <ScrollView
      contentContainerStyle={{ marginTop: Constants.statusBarHeight }}
    >
      <DevStoreWorkPass />
      <DevDeleteWorkpass />
      <Button title="Go Back to Settings Page" onPress={goBack} />
    </ScrollView>
  );
};

export default withNavigation(DevDebug);
