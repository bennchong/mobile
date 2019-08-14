import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useStateValue } from "../../../state";
import { getCurrentDateAndTime } from "../../../services/date/date";
import { storeTime } from "../../../services/fileSystem";
import { styles } from "./VerifyProfileStyles";

interface VerifyProfileProps {
  handleShowModal: Function;
  isPreview: boolean;
}

const VerifyProfile = ({ isPreview, handleShowModal }: VerifyProfileProps) => {
  const [{ workpassAccepted }, dispatch] = useStateValue();

  const handleWorkpassConfirmation = async () => {
    handleShowModal();
    await storeTime();
    dispatch({
      type: "SET_WORKPASS_ACCEPTED",
      time: getCurrentDateAndTime()
    });
  };

  if (!workpassAccepted && !isPreview) {
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
