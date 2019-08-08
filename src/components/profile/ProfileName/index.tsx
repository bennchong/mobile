import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { AntDesign } from "@expo/vector-icons";
import { SharePageContainer } from "../../SharePage";
import { styles } from "./ProfileNameStyles";
import { useStateValue } from "../../../state";
import { verificationStatusEnum } from "../../../services/verificationService";

export const ProfileName = ({ status, photo, fin, name, isPreview }) => {
  const [isDialogVisible, setVisible] = useState(false);
  const [{ timeAccepted }] = useStateValue();

  const toggleVisibility = () => {
    setVisible(!isDialogVisible);
  };

  return (
    <View style={styles.textContainer}>
      <Text style={styles.fin}>{fin}</Text>
      <Text style={styles.name}>{name}</Text>
      {!isPreview &&
      status === verificationStatusEnum.VALID &&
      timeAccepted.length !== 0 ? (
        <TouchableOpacity
          style={styles.shareContainer}
          onPress={() => setVisible(!isDialogVisible)}
        >
          <AntDesign name="qrcode" size={15} color="#808080" />
          <Text style={styles.shareText}>SHARE ID</Text>
          <SharePageContainer
            photo={photo}
            name={name}
            isVisible={isDialogVisible}
            handleCancel={toggleVisibility}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

ProfileName.propTypes = {
  fin: PropTypes.string,
  name: PropTypes.string,
  photo: PropTypes.string,
  isPreview: PropTypes.bool,
  status: PropTypes.number
};
