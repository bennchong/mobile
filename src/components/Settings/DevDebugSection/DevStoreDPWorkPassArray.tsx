import React from "react";
import { View, TouchableOpacity, Alert, Text } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { styles } from "../styles";
import { fetchDocument } from "../../../services/qrHandler/qrHandler";
import { useStateValue } from "../../../state";

const DevStoreDPWorkPassArray = () => {
  const [,
    dispatch
  ] = useStateValue();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        Alert.alert(
          "Store Extra DP Workpass",
          "Do you want to store a valid DP workpass into the filesystem?",
          [
            {
              text: "No"
            },
            {
              text: "Yes",
              onPress: async () => {
                try {
                  const workpass = await fetchDocument(
                    "https://raw.githubusercontent.com/sgworkpass/demo/master/unencrypted_pass/cert_valid_dependent.json"
                  );
                  const workpass1 = await fetchDocument(
                    "https://raw.githubusercontent.com/sgworkpass/demo/master/unencrypted_pass/cert_valid_ltvp.json"
                  );
                  // Refactor action below
                  dispatch({
                    type: "ADD_DPPASS",
                    workpass
                  });
                  dispatch({
                    type: "ADD_DPPASS",
                    workpass: workpass1
                  });
                  // eslint-disable-next-line no-alert
                  Alert.alert(
                    "Dev Info",
                    "DP Workpass array in file system has been successfully stored"
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
        <Text style={styles.textContainer}>Store valid DP workpass</Text>
      </View>
      <AntDesign name="right" size={20} color="black" style={styles.right} />
    </TouchableOpacity>
  );
};

export { DevStoreDPWorkPassArray };
