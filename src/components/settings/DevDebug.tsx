import React from "react";
import { ScrollView, Button } from "react-native";
import { withNavigation } from "react-navigation";
import PropTypes from "prop-types";
import Constants from "expo-constants";
import { DevDeleteWorkpass } from "./DevDebugSection/DevDeleteWorkpass";
import { DevStoreWorkPass } from "./DevDebugSection/DevStoreWorkPass";

const DevDebug = props => {
  return (
    <ScrollView
      contentContainerStyle={{ marginTop: Constants.statusBarHeight }}
    >
      <DevStoreWorkPass source="filesystem" />
      <DevDeleteWorkpass source="filesystem" />
      <DevStoreWorkPass source="state" />
      <DevDeleteWorkpass source="state" />
      <Button
        title="Go Back to Settings Page"
        onPress={() => props.navigation.goBack()}
      />
    </ScrollView>
  );
};

export default withNavigation(DevDebug);

DevDebug.propTypes = {
  navigation: PropTypes.any
};
