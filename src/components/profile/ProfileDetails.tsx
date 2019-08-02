import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { DetailSection } from "./DetailSection";
import { Margin } from "../Layout/Margin";
import { TextRow } from "../Layout/TextRow";
import { formatDate } from "../../services/date";

export const ProfileDetails = ({ workpass }) => {
  const { pass, recipient, employer } = workpass;
  const {
    applicationDate,
    expiryDate,
    issueDate,
    legalTillDate,
    renewalDate,
    isMultipleJourney,
    type
  } = pass;
  const { country, dob, maritalStatus, address } = recipient;
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
        <TextRow label="Country of Residence" text={country} />
        <TextRow label="Gender" text="Female" />
        <TextRow label="Date of Birth" text={formatDate(dob)} />
        <TextRow label="Marital Status" text={maritalStatus} />
        <TextRow
          label="Address"
          text={`${address.streetAddress} ${address.postOfficeBoxNumber}, S${address.postalCode}`}
        />
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
        <TextRow label="Entry Valid Till" text={formatDate(legalTillDate)} />
        <TextRow label="Renewal Date" text={formatDate(renewalDate)} />
        <TextRow label="Employer" text={name} />
        <TextRow label="Sector" text={sector} />
        <TextRow label="Multiple Journey Visa" text={multipleJourney} />
      </DetailSection>
    </View>
  );
};

ProfileDetails.propTypes = {
  workpass: PropTypes.object
};
