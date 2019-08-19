import React from "react";
import { Platform, View, Text, TouchableOpacity } from "react-native";
import { useStateValue } from "../../../state";
import { styles } from "./VerifyProfileStyles";
import { storeTime } from "../../../services/fileSystem";
import { getCurrentDateAndTime } from "../../../services/date/date";

interface VerifyProfileProps {
  handleShowModal: Function;
  isPreview: boolean;
}

const VerifyProfile = ({ isPreview, handleShowModal }: VerifyProfileProps) => {
  const [{ workpassAccepted }, dispatch] = useStateValue();

  const handleSave = async () => {
    if (Platform.OS === "ios") {
      await storeTime();
      dispatch({
        type: "SET_WORKPASS_ACCEPTED",
        time: getCurrentDateAndTime()
      });
    }
    handleShowModal();
  };

  if (!workpassAccepted && !isPreview) {
    return (
      <View style={styles.container}>
        <Text style={styles.acknowledgeText}>
          I acknowledge that the information above is true
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return null;
};

export { VerifyProfile };
