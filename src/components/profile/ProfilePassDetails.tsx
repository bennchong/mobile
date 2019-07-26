import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Margin } from "../Layout/Margin";
import { TextRow } from "../Layout/TextRow";
import { formatDate } from "../../services/date";

const ProfilePassDetails = ({ pass, employer }) => {
  const {
    applicationDate,
    expiryDate,
    issueDate,
    legalTillDate,
    renewalDate,
    isMultipleJourney,
    type
  } = pass;
  const { name, sector } = employer;
  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Pass Details</Text>
      </View>
      <TextRow label="Pass Type" text={type} />
      <TextRow label="Pass Expires On" text={formatDate(expiryDate)} />
      <TextRow label="Date of Application" text={formatDate(applicationDate)} />
      <TextRow label="Issued On" text={formatDate(issueDate)} />
      <TextRow label="Employer" text={name} />
      <TextRow label="Sector" text={sector} />
      <TextRow
        label="Multiple Journey Visa"
        text={isMultipleJourney ? "Issued" : "Not Issued"}
      />
      {/* <Margin /> */}
    </View>
  );
};

export { ProfilePassDetails };

const styles = StyleSheet.create({
  headerContainer: {
    marginHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#A9A9A9"
  },
  header: { color: "#808080", fontWeight: "bold", fontSize: 15 }
});
