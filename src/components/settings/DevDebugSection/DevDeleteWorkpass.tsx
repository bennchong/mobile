import React, { useContext } from "react";
import {
  AsyncStorage,
  View,
  TouchableOpacity,
  Alert,
  Text
} from "react-native";
import { Foundation, AntDesign } from "@expo/vector-icons";
import PropTypes from "prop-types";
import { deleteStoredWorkpass } from "../../../services/fileSystem";
import { styles } from "../styles";
import { StateContext } from "../../../state";

const DevDeleteWorkpass = props => {
  const context = useContext(StateContext);

  let buttonText;
  if (props.source === "filesystem") {
    buttonText = "Delete current workpass from file system";
  } else {
    buttonText = "Delete current workpass from state";
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        if (props.source === "filesystem") {
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
                    Alert.alert(
                      "Dev Info",
                      "Workpass in the filesystem is successfully deleted"
                    );
                    await AsyncStorage.removeItem("@storedTimeAccepted");
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
        } else {
          Alert.alert(
            "Delete Profile",
            "Do you want to delete your current profile from state?",
            [
              {
                text: "No"
              },
              {
                text: "Yes",
                onPress: async () => {
                  context[1]({ type: "DELETE_WORKPASS" });
                  try {
                    // await AsyncStorage.removeItem("@storedTimeAccepted");
                    Alert.alert(
                      "Dev Info",
                      "Workpass has been deleted from state!"
                    );
                  } catch (err) {
                    Alert.alert("Dev Info", err);
                  }
                }
              }
            ],
            { cancelable: false }
          );
        }
      }}
    >
      <View style={styles.iconContainer}>
        <Foundation name="page-delete" size={30} color="red" />
        <Text style={styles.textContainer}>{buttonText}</Text>
      </View>
      <AntDesign name="right" size={20} color="black" style={styles.right} />
    </TouchableOpacity>
  );
};

export { DevDeleteWorkpass };

DevDeleteWorkpass.propTypes = {
  source: PropTypes.string
};
