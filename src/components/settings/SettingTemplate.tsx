import React, { useContext } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { deleteStoredworkpass } from "../../services/fileSystem";
import { StateContext } from "../../state";
import { Header } from "../Layout/Header";
import { styles } from "./styles";

export const SettingTemplate = () => {
  const context = useContext(StateContext);

  return (
    <View style={styles.page}>
      <Header text={"SETTINGS"} />
      <View style={{ flex: 1, marginTop: 60 }}>
        <View style={styles.buttonContainer}>
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
                        context[1]({ type: "DELETE_workpass" });
                        // eslint-disable-next-line no-alert
                        Alert.alert("workpass successfully deleted!");
                      } catch (e) {
                        // eslint-disable-next-line no-alert
                        Alert.alert("No workpass to delete");
                      }
                    }
                  }
                ],
                { cancelable: false }
              );
            }}
          >
            <Text style={styles.buttonText}>Delete Current workpass</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
