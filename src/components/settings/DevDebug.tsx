import React from "react";
import { View, ScrollView } from "react-native";
import { styles } from "./styles";
import { DeleteCurrentWorkPassFromFS } from "./DevDebugSection/DeleteCurrentWorkPassFromFS";
import { DeleteCurrentWorkPassFromState } from "./DevDebugSection/DeleteCurrentWorkPassFromState";

const DevDebug = () => {

  return (
    <ScrollView>
      <View style={styles.buttonContainer}>
        <DeleteCurrentWorkPassFromFS />
        <DeleteCurrentWorkPassFromState />
      </View>
    </ScrollView>
  );
}

export { DevDebug }; 