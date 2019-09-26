import React from "react";
import { ScrollView, Button, Text, View } from "react-native";
import { withNavigation } from "react-navigation";
import Constants from "expo-constants";
import { DevDeleteWorkpass } from "./DevDebugSection/DevDeleteWorkpass";
import { DevStoreWorkPass } from "./DevDebugSection/DevStoreWorkPass";
import { VERSION } from "../../config";

interface IDevDebugProps {
  navigation: any;
}

const DevDebug = (props: IDevDebugProps) => {
  const goBack = () => props.navigation.goBack();
  return (
    <ScrollView
      contentContainerStyle={{ marginTop: Constants.statusBarHeight }}
    >
      <View style={{ padding: 20 }}>
        <Text>Version: {JSON.stringify(VERSION.revisionId)}</Text>
        <Text> {JSON.stringify(VERSION.publishedTime)} </Text>
      </View>
      <DevStoreWorkPass />
      <DevDeleteWorkpass />
      <Button title="Go Back to Settings Page" onPress={goBack} />
    </ScrollView>
  );
};

export default withNavigation(DevDebug);
