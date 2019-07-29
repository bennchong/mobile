import React from "react";
import {
  AsyncStorage,
  View,
  TouchableOpacity,
  Alert,
  Text
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { StateContext } from "../../../state";
import { useContext } from "react";
import { styles } from "../styles";

const DeleteWorkPassFromState = () => {
  const context = useContext(StateContext);
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
                context[1]({ type: "DELETE_WORKPASS" });
                await AsyncStorage.removeItem("@storedTimeAccepted");
                // eslint-disable-next-line no-alert
                Alert.alert(
                  "Dev Info",
                  "Workpass has been deleted from state!"
                );
              }
            }
          ],
          { cancelable: false }
        );
      }}
    >
      <View style={styles.iconContainer}>
        <AntDesign name="delete" size={30} color="red" />
        <Text style={styles.textContainer}>
          Delete Current workpass from state
        </Text>
      </View>
      <AntDesign name="right" size={20} color="black" style={styles.right} />
    </TouchableOpacity>
  );
};

export { DeleteWorkPassFromState };
