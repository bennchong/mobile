import React from "react";
import { TouchableOpacity, Alert, Text } from "react-native";
import { storeworkpass } from "../../../services/fileSystem";
import { styles } from "./styles";
import { fetchDocument } from "../../../services/qrHandler";

const StoreWorkPassIntoFS = () => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        Alert.alert(
          "Store Valid Profile",
          "Do you want to store a valid profile into file system",
          [
            {
              text: "No"
            },
            {
              text: "Yes",
              onPress: async () => {
                try {
                  let workpass = await fetchDocument("https://raw.githubusercontent.com/sgworkpass/demo/master/cert_valid.json", "key");
                  await storeworkpass(workpass);
                  // eslint-disable-next-line no-alert
                  Alert.alert("Dev Info","Workpass in file system has been successfully stored");
                } catch (e) {
                  // eslint-disable-next-line no-alert
                  Alert.alert("Dev Info",e);
                }
              }
            }
          ],
          { cancelable: false }
        );
      }}
    >
      <Text style={styles.buttonText}>Store valid workpass into the file system</Text>
    </TouchableOpacity>
  );
}

export { StoreWorkPassIntoFS };