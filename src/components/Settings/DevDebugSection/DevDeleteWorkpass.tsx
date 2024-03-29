import React from "react";
import { View, TouchableOpacity, Alert, Text } from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import {
  deleteProfilesArray,
  storeProfilesArray
} from "../../../services/fileSystem";
import { styles } from "../styles";
import { useStateValue } from "../../../state";
// eslint-disable-next-line no-unused-vars
import { IProfileObject, IContextState } from "../../../state/interfaces";
import { red, black } from "../../../themeColors";

const DevDeleteWorkpasses = () => {
  const [, dispatch] = useStateValue();
  const profileObjectInit: IProfileObject = {
    workpass: null,
    timeAccepted: null,
    timeLastVerified: null,
    validityStatus: null
  };

  const initialState: IContextState = {
    profilesArray: [Object.assign({}, profileObjectInit)] // To deep clone profileObject, index 0 reserved for main pass
  };
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
                dispatch({
                  type: "DELETE_WORKPASS",
                  resetState: initialState
                });
                try {
                  await deleteProfilesArray();
                  await storeProfilesArray(initialState.profilesArray);
                } catch (e) {
                  Alert.alert("Dev Info", e);
                }
                Alert.alert("Dev Info", "Workpass is successfully deleted");
              }
            }
          ],
          { cancelable: false }
        );
      }}
    >
      <View style={styles.iconContainer}>
        <MaterialIcons name="delete-forever" size={30} color={red} />
        <View style={styles.textContainer}>
          <Text style={{ flexWrap: "wrap" }}>
            Delete all workpasses in filesystem
          </Text>
          <Text style={{ flexWrap: "wrap" }}>and reset state</Text>
        </View>
      </View>
      <AntDesign name="right" size={20} color={black} style={styles.right} />
    </TouchableOpacity>
  );
};

export { DevDeleteWorkpasses };
