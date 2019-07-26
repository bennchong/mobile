import React from "react";
import { TouchableOpacity, Alert, Text } from "react-native";
import { deleteStoredworkpass } from "../../../services/fileSystem";
import { styles } from "./styles";

const DeleteCurrentWorkPassFromFS = () => {
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
                try {
                  await deleteStoredworkpass();
                  // eslint-disable-next-line no-alert
                  Alert.alert("Dev Info","Workpass in file system is successfully deleted");
                } catch (e) {
                  // eslint-disable-next-line no-alert
                  Alert.alert("Dev Info","No workpass in file system to delete");
                }
              }
            }
          ],
          { cancelable: false }
        );
      }}
    >
      <Text style={styles.buttonText}>Delete Current workpass from file system</Text>
    </TouchableOpacity>
  );
}

export { DeleteCurrentWorkPassFromFS };