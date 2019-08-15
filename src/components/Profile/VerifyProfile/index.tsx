import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useStateValue } from "../../../state";
import { styles } from "./VerifyProfileStyles";

interface VerifyProfileProps {
  handleShowModal: Function;
  isPreview: boolean;
}

const VerifyProfile = ({ isPreview, handleShowModal }: VerifyProfileProps) => {
  const [{ workpassAccepted }] = useStateValue();

  if (!workpassAccepted && !isPreview) {
    return (
      <View style={styles.container}>
        <Text style={styles.acknowledgeText}>
          I acknowledge that the information above is true
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleShowModal()}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return null;
};

export { VerifyProfile };
