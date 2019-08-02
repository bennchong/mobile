import React, { useContext } from "react";
import { View, TouchableOpacity, Alert, Text } from "react-native";
import { Foundation, AntDesign } from "@expo/vector-icons";
import PropTypes from "prop-types";
import {
  deleteStoredWorkpass,
  deleteStoredTime,
  deleteStoredTimeVerified
} from "../../../services/fileSystem";
import { styles } from "../styles";
import { StateContext } from "../../../state";

const DevDeleteWorkpass = props => {
  const context = useContext(StateContext);
  const dispatch = context[1];

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
                    await deleteStoredTime();
                    await deleteStoredTimeVerified();
                    Alert.alert(
                      "Dev Info",
                      "Workpass in the filesystem is successfully deleted"
                    );
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
                  dispatch({ type: "DELETE_WORKPASS" });
                  try {
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