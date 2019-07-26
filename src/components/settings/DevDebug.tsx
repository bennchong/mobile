import React from "react";
import { View, ScrollView } from "react-native";
import { styles } from "./styles";
import { DeleteWorkPassFromFS } from "./DevDebugSection/DeleteWorkPassFromFS";
import { DeleteWorkPassFromState } from "./DevDebugSection/DeleteWorkPassFromState";
import { StoreWorkPassIntoFS } from "./DevDebugSection/StoreWorkPassIntoFS";
import { StoreWorkPassIntoState } from "./DevDebugSection/StoreWorkPassIntoState";

const DevDebug = () => {

  return (
    <ScrollView>
      <View style={styles.buttonContainer}>
        <StoreWorkPassIntoFS />
        <DeleteWorkPassFromFS />
        <StoreWorkPassIntoState />
        <DeleteWorkPassFromState />
      </View>
    </ScrollView>
  );
}

export { DevDebug }; 