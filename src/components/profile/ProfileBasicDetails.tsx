import React from "react";
import { View } from "react-native";
import { Margin } from "../Layout/Margin";
import { TextRow } from "../Layout/TextRow";
import { formatDate } from "../../services/date";

const ProfileBasicDetails = ({ recipient }) => {
  const { country, dob } = recipient;
  return (
    <View>
      <TextRow label="Country of Residence" text={country} />
      <TextRow label="Gender" text="Female" />
      <TextRow label="Date of Birth" text={formatDate(dob)} />
      <Margin />
    </View>
  );
};

export { ProfileBasicDetails };
