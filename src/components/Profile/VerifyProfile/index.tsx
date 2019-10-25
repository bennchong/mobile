import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useStateValue } from "../../../state";
import { styles } from "./VerifyProfileStyles";

interface VerifyProfileProps {
  handleShowModal: Function;
  isPreview: boolean;
  profileSelected: number;
}

const VerifyProfile = ({
  isPreview,
  handleShowModal,
  profileSelected
}: VerifyProfileProps) => {
  const [{ workpassAcceptedBooleanArray }, dispatch] = useStateValue();

  const handleWorkpassConfirmation = async () => {
    handleShowModal();
    workpassAcceptedBooleanArray[profileSelected] = true;
    dispatch({
      type: "SET_WORKPASS_ACCEPTED",
      workpassAcceptedBooleanArray
    });
    // Refactor action below
    dispatch({
      type: "SET_TIME_ACCEPTED",
      profileSelected
    });
  };

  if (!workpassAcceptedBooleanArray[profileSelected] && !isPreview) {
    return (
      <View style={styles.container}>
        <Text style={styles.acknowledgeText}>
          I acknowledge that the information above is true
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={handleWorkpassConfirmation}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return null;
};

export { VerifyProfile };
