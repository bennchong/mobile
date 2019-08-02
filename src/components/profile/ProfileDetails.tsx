import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { DetailSection } from "./DetailSection";
import { Margin } from "../Layout/Margin";
import { TextRow } from "../Layout/TextRow";
import { formatDate } from "../../services/date";

export const ProfileDetails = ({ cleanDocument }) => {
  const { pass, recipient, employer } = cleanDocument;
  const {
    applicationDate,
    expiryDate,
    issueDate,
    isMultipleJourney,
    type
  } = pass;
  const { name, sector } = employer;

  let multipleJourney;
  switch (isMultipleJourney) {
    case true:
      multipleJourney = "Issued";
      break;
    case false:
      multipleJourney = "Not Issued";
      break;
    default:
      multipleJourney = null;
  }

  return (
    <View>
      <DetailSection title="Personal Particulars">
        <TextRow label="Country of Residence" text={recipient.country} />
        <TextRow label="Gender" text="Female" />
        <TextRow label="Date of Birth" text={formatDate(recipient.dob)} />
        <Margin />
      </DetailSection>

      <DetailSection title="Pass Details">
        <TextRow label="Pass Type" text={type} />
        <TextRow label="Pass Expires On" text={formatDate(expiryDate)} />
        <TextRow
          label="Date of Application"
          text={formatDate(applicationDate)}
        />
        <TextRow label="Issued On" text={formatDate(issueDate)} />
        <TextRow label="Employer" text={name} />
        <TextRow label="Sector" text={sector} />
        <TextRow label="Multiple Journey Visa" text={multipleJourney} />
      </DetailSection>
    </View>
  );
};

ProfileDetails.propTypes = {
  cleanDocument: PropTypes.object
};
