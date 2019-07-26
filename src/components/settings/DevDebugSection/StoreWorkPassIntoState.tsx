import React from "react";
import { TouchableOpacity, Alert, Text } from "react-native";
import { StateContext } from "../../../state";
import { useContext } from "react";
import { styles } from "./styles";
import { fetchDocument } from "../../../services/qrHandler";

const StoreWorkPassIntoState = () => {

  const context = useContext(StateContext);

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        Alert.alert(
          "Store Valid Profile",
          "Do you want to store a valid profile into state?",
          [
            {
              text: "No"
            },
            {
              text: "Yes",
              onPress: async () => {
                let workpass = await fetchDocument("https://raw.githubusercontent.com/sgworkpass/demo/master/cert_valid.json", "key");
                context[1]({ 
                  type: "UPDATE_WORKPASS",
                  workpass 
                });
                // eslint-disable-next-line no-alert
                Alert.alert("Dev Info","Valid Workpass have been stored into state!");
              }
            }
          ],
          { cancelable: false }
        );
      }}
    >
      <Text style={styles.buttonText}>Store valid workpass into state</Text>
    </TouchableOpacity>
  );
}

export { StoreWorkPassIntoState };