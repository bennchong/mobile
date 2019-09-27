import React from "react";
import { View } from "react-native";
import { DetailSection } from "./DetailSection";
import { Margin } from "../../Layout/Margin";
import { TextRow } from "../../Layout/TextRow";
import { formatDate } from "../../../services/date/date";

interface ProfileDetailsProps {
  workpass: any;
  status: number;
}

export const ProfileDetails = ({ workpass, status }: ProfileDetailsProps) => {
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
  const { country, dob, maritalStatus, address, gender } = recipient;
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

  const showPersonalDetails =
    country || dob || maritalStatus || address || gender;
  const showPassDetails =
    type ||
    expiryDate ||
    legalTillDate ||
    renewalDate ||
    name ||
    sector ||
    multipleJourney;

  const isTampered = status === 4;
  return (
    <View>
      {!isTampered ? (
        <View>
          {showPersonalDetails ? (
            <DetailSection title="Personal Particulars">
              <TextRow label="Country of Residence" text={country} />
              <TextRow label="Gender" text={gender} />
              <TextRow label="Date of Birth" text={formatDate(dob)} />
              <TextRow label="Marital Status" text={maritalStatus} />
              <TextRow
                label="Address"
                text={
                  address
                    ? `${address.streetAddress} ${address.postOfficeBoxNumber}, S${address.postalCode}`
                    : null
                }
              />
              <Margin />
            </DetailSection>
          ) : null}

          {showPassDetails ? (
            <DetailSection title="Pass Details">
              <TextRow label="Pass Type" text={type} />
              <TextRow label="Pass Expires On" text={formatDate(expiryDate)} />
              <TextRow
                label="Date of Application"
                text={formatDate(applicationDate)}
              />
              <TextRow label="Issued On" text={formatDate(issueDate)} />
              <TextRow
                label="Entry Valid Till"
                text={formatDate(legalTillDate)}
              />
              <TextRow label="Renewal Date" text={formatDate(renewalDate)} />
              <TextRow label="Employer" text={name} />
              <TextRow label="Sector" text={sector} />
              <TextRow label="Multiple Journey Visa" text={multipleJourney} />
            </DetailSection>
          ) : null}
        </View>
      ) : null}
    </View>
  );
};
