import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { Margin } from "../Layout/Margin";
import { TextRow } from "../Layout/TextRow";
import { formatDate } from "../../services/date";

export const ProfileBasicDetails = ({ recipient }) => {
  return (
    <View style={{ backgroundColor: "#fff" }}>
      <TextRow label="Country of Residence" text={recipient.country} />
      <TextRow label="Gender" text="Female" />
      <TextRow label="Date of Birth" text={formatDate(recipient.dob)} />
      <Margin />
    </View>
  );
};

ProfileBasicDetails.propTypes = {
  recipient: PropTypes.object
};
