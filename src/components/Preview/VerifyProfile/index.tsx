import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { getData } from "@govtechsg/open-attestation";
import { useStateValue } from "../../../state";
import { styles } from "./VerifyProfileStyles";

interface VerifyProfileProps {
  handleShowModal: Function;
  handleExit: Function;
}

// TO INTEGRATE SOON!!!

const VerifyProfile = ({ handleShowModal, handleExit }: VerifyProfileProps) => {
  const [{ tempProfile }, dispatch] = useStateValue();

  const handleWorkpassConfirmation = async () => {
    handleShowModal();
    const cleanWorkpass = getData(tempProfile);
    // Checks if pass is dependent
    if (cleanWorkpass.pass.sponsoringPass) {
      dispatch({
        type: "ADD_DPPASS",
        workpass: tempProfile
      });
    } else {
      // Refactored action below
      dispatch({
        type: "ADD_MAINPASS",
        workpass: tempProfile
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.acknowledgeText}>
        I accept that the information above is true
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleWorkpassConfirmation}
      >
        <Text style={styles.buttonText}>Accept to save</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonReject} onPress={handleExit}>
        <Text style={styles.buttonText}>Reject</Text>
      </TouchableOpacity>
    </View>
  );
};

export { VerifyProfile };
