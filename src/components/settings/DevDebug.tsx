import React from "react";
import { ScrollView, Button } from "react-native";
import Constants from "expo-constants";
import { DeleteWorkPassFromFS } from "./DevDebugSection/DeleteWorkPassFromFS";
import { DeleteWorkPassFromState } from "./DevDebugSection/DeleteWorkPassFromState";
import { StoreWorkPassIntoFS } from "./DevDebugSection/StoreWorkPassIntoFS";
import { StoreWorkPassIntoState } from "./DevDebugSection/StoreWorkPassIntoState";
import { withNavigation } from "react-navigation";

const DevDebug = props => {
  return (
    <ScrollView
      contentContainerStyle={{ marginTop: Constants.statusBarHeight }}
    >
      <StoreWorkPassIntoFS />
      <DeleteWorkPassFromFS />
      <StoreWorkPassIntoState />
      <DeleteWorkPassFromState />
      <Button
        title="Go Back to Settings Page"
        onPress={() => props.navigation.goBack()}
      />
    </ScrollView>
  );
};

export default withNavigation(DevDebug);
