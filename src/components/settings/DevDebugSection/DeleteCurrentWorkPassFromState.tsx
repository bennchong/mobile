import React from "react";
import { TouchableOpacity, Alert, Text } from "react-native";
import { StateContext } from "../../../state";
import { useContext } from "react";
import { styles } from "./styles";

const DeleteCurrentWorkPassFromState = () => {

  const context = useContext(StateContext);
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        Alert.alert(
          "Delete Profile",
          "Do you want to delete your current profile?",
          [
            {
              text: "No"
            },
            {
              text: "Yes",
              onPress: async () => {
                context[1]({ type: "DELETE_WORKPASS" });
                // eslint-disable-next-line no-alert
                Alert.alert("Dev Info","Workpass has been deleted from state!");
              }
            }
          ],
          { cancelable: false }
        );
      }}
    >
      <Text style={styles.buttonText}>Delete Current workpass from state</Text>
    </TouchableOpacity>
  );
}

export { DeleteCurrentWorkPassFromState };