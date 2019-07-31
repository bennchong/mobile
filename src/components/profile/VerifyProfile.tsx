import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage
} from "react-native";
import PropTypes from "prop-types";
import { useStateValue } from "../../state";
import metrics from "../../config/metrics";
import { getCurrentDateAndTime } from "../../services/date";

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: metrics.DEVICE_WIDTH / 2,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 50
  },
  acknowledgeText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#808080"
  },
  button: {
    backgroundColor: "#32CD32",
    borderRadius: 30,
    paddingHorizontal: 40,
    paddingVertical: 5,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  modalContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  modal: {
    width: (2 * metrics.DEVICE_WIDTH) / 3,
    height: (2 * metrics.DEVICE_WIDTH) / 3,
    borderRadius: 30,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  modalText: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
    textAlign: "center"
  },
  modalButton: {
    backgroundColor: "#f5f5f5",
    borderRadius: 30,
    paddingHorizontal: 40,
    paddingVertical: 5,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  modalButtonText: {
    fontWeight: "bold"
  }
});

const VerifyProfile = ({ isPreview, handleShowModal }) => {
  const [{ workpassAccepted }, dispatch] = useStateValue();

  const handleWorkpassConfirmation = async () => {
    handleShowModal();
    await AsyncStorage.setItem("@storedTimeAccepted", getCurrentDateAndTime());
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

VerifyProfile.propTypes = {
  isPreview: PropTypes.bool,
  handleShowModal: PropTypes.func
};
