import React from "react";
import {
  AsyncStorage,
  View,
  TouchableOpacity,
  Alert,
  Text
} from "react-native";
import { Foundation, AntDesign } from "@expo/vector-icons";
import { deleteStoredworkpass } from "../../../services/fileSystem";
import { styles } from "../styles";

const DeleteWorkPassFromFS = () => {
  return (
    <TouchableOpacity
      style={styles.container}
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
                  Alert.alert(
                    "Dev Info",
                    "Workpass in file system is successfully deleted"
                  );
                  await AsyncStorage.removeItem("storedTimeVerified");
                } catch (e) {
                  // eslint-disable-next-line no-alert
                  Alert.alert(
                    "Dev Info",
                    "No workpass in file system to delete"
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
        <Foundation name="page-delete" size={30} color="red" />
        <Text style={styles.textContainer}>
          Delete Current workpass from file system
        </Text>
      </View>
      <AntDesign name="right" size={20} color="black" style={styles.right} />
    </TouchableOpacity>
  );
};

export { DeleteWorkPassFromFS };
