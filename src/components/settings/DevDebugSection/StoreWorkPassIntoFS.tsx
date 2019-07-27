import React from "react";
import { View, TouchableOpacity, Alert, Text } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { storeworkpass } from "../../../services/fileSystem";
import { styles } from "../styles";
import { fetchDocument } from "../../../services/qrHandler";

const StoreWorkPassIntoFS = () => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        Alert.alert(
          "Store Valid Profile",
          "Do you want to store a valid profile into file system",
          [
            {
              text: "No"
            },
            {
              text: "Yes",
              onPress: async () => {
                try {
                  let workpass = await fetchDocument(
                    "https://raw.githubusercontent.com/sgworkpass/demo/master/cert_valid.json",
                    "key"
                  );
                  await storeworkpass(workpass);
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
        <MaterialIcons name="sd-storage" size={30} color="red" />
        <Text style={styles.textContainer}>
          Store valid workpass into the file system
        </Text>
      </View>
      <AntDesign name="right" size={20} color="black" style={styles.right} />
    </TouchableOpacity>
  );
};

export { StoreWorkPassIntoFS };
