import React, { useContext } from "react";
import { View, TouchableOpacity, Alert, Text } from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import {
  deleteStoredWorkpass,
  deleteStoredTime,
  deleteStoredTimeVerified
} from "../../../services/fileSystem";
import { styles } from "../styles";
import { StateContext } from "../../../state";

const DevDeleteWorkpass = () => {
  const context = useContext(StateContext);
  const dispatch = context[1];

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        Alert.alert(
          "Delete Profile",
          "Do you want to delete your current profile from the filesystem?",
          [
            {
              text: "No"
            },
            {
              text: "Yes",
              onPress: async () => {
                try {
                  await deleteStoredWorkpass();
                  await deleteStoredTime();
                  await deleteStoredTimeVerified();
                  dispatch({ type: "DELETE_WORKPASS" });
                  Alert.alert("Dev Info", "Workpass is successfully deleted");
                } catch (e) {
                  Alert.alert(
                    "Dev Info",
                    "No workpass in the filesystem to delete"
                  );
                }
              }
            }
          ],
          { cancelable: false }
        );
      }}
    >
      <View style={styles.iconContainer}>
        <MaterialIcons name="delete-forever" size={30} color="red" />
        <Text style={styles.textContainer}>Delete current workpass</Text>
      </View>
      <AntDesign name="right" size={20} color="black" style={styles.right} />
    </TouchableOpacity>
  );
};

export { DevDeleteWorkpass };
