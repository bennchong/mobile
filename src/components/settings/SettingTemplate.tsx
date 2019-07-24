import React, { useContext } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { deleteStoredCertificate } from "../../services/fileSystem";
import { StateContext } from "../../state";
import { Header } from "../Layout/Header";

const SettingTemplate = () => {
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
                        await deleteStoredCertificate();
                        context[1]({ type: "DELETE_CERTIFICATE" });
                        alert("Certificate successfully deleted!");
                      } catch (e) {
                        alert("No certificate to delete");
                      }
                    }
                  }
                ],
                { cancelable: false }
              );
            }}
          >
            <Text style={styles.buttonText}>Delete Current Certificate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export { SettingTemplate };

const styles = StyleSheet.create({
  page: { flex: 1 },
  buttonContainer: {
    width: "100%",
    backgroundColor: "#2cae",
    height: 60,
    justifyContent: "center",
    alignItems: "center"
  },
  button: { width: "100%" },
  buttonText: { marginLeft: 16, color: "#fff" }
});
