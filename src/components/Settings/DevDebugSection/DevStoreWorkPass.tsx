import React from "react";
import { View, TouchableOpacity, Alert, Text } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { styles } from "../styles";
import { fetchDocument } from "../../../services/qrHandler/qrHandler";
import { useStateValue } from "../../../state";
import { red, black } from "../../../themeColors";

const DevStoreWorkPass = () => {
  const [, dispatch] = useStateValue();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        Alert.alert(
          "Store Valid Profile",
          "Do you want to store a valid profile into the filesystem?",
          [
            {
              text: "No"
            },
            {
              text: "Yes",
              onPress: async () => {
                try {
                  const workpass = await fetchDocument(
                    "https://raw.githubusercontent.com/sgworkpass/demo/master/unencrypted_pass/cert_valid.json"
                  );
                  // Refactored action below
                  dispatch({
                    type: "ADD_MAINPASS",
                    workpass
                  });
                  // eslint-disable-next-line no-alert
                  Alert.alert(
                    "Dev Info",
                    "Workpass in file system has been successfully stored"
                  );
                } catch (e) {
                  // eslint-disable-next-line no-alert
                  Alert.alert("Dev Info", e);
                }
              }
            }
          ],
          { cancelable: false }
        );
      }}
    >
      <View style={styles.iconContainer}>
        <MaterialIcons name="sd-storage" size={30} color={red} />
        <Text style={styles.textContainer}>Store valid workpass</Text>
      </View>
      <AntDesign name="right" size={20} color={black} style={styles.right} />
    </TouchableOpacity>
  );
};

export { DevStoreWorkPass };
