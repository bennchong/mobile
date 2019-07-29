import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { QrCodeGenerator } from "../QrGenerator";
import { AntDesign } from "@expo/vector-icons";
import metrics from "../../config/metrics";

const styles = StyleSheet.create({
  textContainer: {
    paddingTop: metrics.RADIUS + 5,
    backgroundColor: "#fff",
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  fin: {
    fontWeight: "bold",
    fontSize: 20
  },
  name: {
    fontSize: 15
  },
  shareContainer: {
    marginTop: 5,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5"
  },
  shareText: { marginLeft: 5, fontWeight: "bold", color: "#808080" },
  previewContainer: { alignItems: "center", marginTop: 10 },
  previewText: { fontSize: 30, color: "#DAA520", fontWeight: "bold" },
  previewButton: {
    flexDirection: "row",
    backgroundColor: "#DAA520",
    height: 40,
    borderRadius: 30,
    paddingHorizontal: 10,
    justifyContent: "space-around",
    alignItems: "center"
  },
  previewButtonText: { marginLeft: 5 }
});

const ProfileName = ({ fin, name, navigation, isPreview }) => {
  const [isDialogVisible, setVisible] = useState(false);

  const handleCancel = () => {
    setVisible(!isDialogVisible);
  };

  return (
    <View style={styles.textContainer}>
      <Text style={styles.fin}>{fin}</Text>
      <Text style={styles.name}>{name}</Text>
      {isPreview ? ( // Is Preview Section
        <View style={styles.previewContainer}>
          <Text style={styles.previewText}>Preview Only</Text>
          <TouchableOpacity
            style={styles.previewButton}
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="back" size={15} />
            <Text style={styles.previewButtonText}>Go back to QR scanner</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Not Preview Section
        <TouchableOpacity
          style={styles.shareContainer}
          onPress={() => setVisible(!isDialogVisible)}
        >
          <AntDesign name="qrcode" size={15} color="#808080" />
          <Text style={styles.shareText}>SHARE ID</Text>
          <QrCodeGenerator
            isVisible={isDialogVisible}
            handleCancel={handleCancel}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export { ProfileName };

ProfileName.propTypes = {
  fin: PropTypes.string,
  name: PropTypes.string,
  navigation: PropTypes.any,
  isPreview: PropTypes.bool
};
