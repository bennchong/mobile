import React from "react";
import { View, ScrollView, Button } from "react-native";
import { styles } from "./styles";
import { DeleteWorkPassFromFS } from "./DevDebugSection/DeleteWorkPassFromFS";
import { DeleteWorkPassFromState } from "./DevDebugSection/DeleteWorkPassFromState";
import { StoreWorkPassIntoFS } from "./DevDebugSection/StoreWorkPassIntoFS";
import { StoreWorkPassIntoState } from "./DevDebugSection/StoreWorkPassIntoState";
import { withNavigation } from "react-navigation";

const DevDebug = (props) => {

  return (
    <ScrollView>
      <View style={styles.buttonContainer}>
        <StoreWorkPassIntoFS />
        <DeleteWorkPassFromFS />
        <StoreWorkPassIntoState />
        <DeleteWorkPassFromState />
        <Button title="Go Back to Settings Page" onPress={() =>  props.navigation.goBack()} />
      </View>
    </ScrollView>
  );
}

export default withNavigation(DevDebug);