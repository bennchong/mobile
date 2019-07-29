import React, { useContext } from "react";
import { View, TouchableOpacity, Alert, Text } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { StateContext } from "../../../state";
import { styles } from "../styles";
import { fetchDocument } from "../../../services/qrHandler";

const StoreWorkPassIntoState = () => {
  const context = useContext(StateContext);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        Alert.alert(
          "Store Valid Profile",
          "Do you want to store a valid profile into state?",
          [
            {
              text: "No"
            },
            {
              text: "Yes",
              onPress: async () => {
                const workpass = await fetchDocument(
                  "https://raw.githubusercontent.com/sgworkpass/demo/master/cert_valid.json",
                  "key"
                );
                context[1]({
                  type: "UPDATE_WORKPASS",
                  workpass
                });
                // eslint-disable-next-line no-alert
                Alert.alert(
                  "Dev Info",
                  "Valid Workpass have been stored into state!"
                );
              }
            }
          ],
          { cancelable: false }
        );
      }}
    >
      <View style={styles.iconContainer}>
        <MaterialIcons name="storage" size={30} color="red" />
        <Text style={styles.textContainer}>
          Store valid workpass into state
        </Text>
      </View>
      <AntDesign name="right" size={20} color="black" style={styles.right} />
    </TouchableOpacity>
  );
};

export { StoreWorkPassIntoState };
