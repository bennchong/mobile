import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import metrics from "../../config/metrics";
import { AntDesign } from "@expo/vector-icons";

const ProfileName = ({ fin, name, navigation, isPreview }) => {
  return (
    <View style={styles.textContainer}>
      <Text style={styles.fin}>{fin}</Text>
      <Text style={styles.name}>{name}</Text>
      {isPreview ? (
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
        <TouchableOpacity style={styles.shareContainer}>
          <AntDesign name="qrcode" size={15} color="#808080" />
          <Text style={styles.shareText}>SHARE ID</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export { ProfileName };

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
