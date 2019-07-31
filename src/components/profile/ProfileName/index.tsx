import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { AntDesign } from "@expo/vector-icons";
import { QrCodeGenerator } from "../../QrGenerator";
import { styles } from "./ProfileNameStyles";

export const ProfileName = ({ status, photo, fin, name, isPreview }) => {
  const [isDialogVisible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!isDialogVisible);
  };

  return (
    <View style={styles.textContainer}>
      <Text style={styles.fin}>{fin}</Text>
      <Text style={styles.name}>{name}</Text>
      {!isPreview && status === 1 ? ( // Is Preview Section
        // Not Preview Section
        <TouchableOpacity
          style={styles.shareContainer}
          onPress={() => setVisible(!isDialogVisible)}
        >
          <AntDesign name="qrcode" size={15} color="#808080" />
          <Text style={styles.shareText}>SHARE ID</Text>
          <QrCodeGenerator
            photo={photo}
            name={name}
            fin={fin}
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
