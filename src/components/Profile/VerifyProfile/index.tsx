import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useStateValue } from "../../../state";
import { getCurrentDateAndTime } from "../../../services/date/date";
import { storeTimeAccepted } from "../../../services/fileSystem";
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
  const [
    { workpassAcceptedBooleanArray, timeAcceptedArray },
    dispatch
  ] = useStateValue();

  const handleWorkpassConfirmation = async () => {
    const newTimeAccepted = [...timeAcceptedArray];
    handleShowModal();
    newTimeAccepted[profileSelected] = getCurrentDateAndTime();
    await storeTimeAccepted(newTimeAccepted);
    workpassAcceptedBooleanArray[profileSelected] = true;
    dispatch({
      type: "SET_WORKPASS_ACCEPTED",
      workpassAcceptedBooleanArray
    });
    dispatch({
      type: "SET_WORKPASS_TIME_ACCEPTED_ARRAY",
      timeAcceptedArray: newTimeAccepted
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
