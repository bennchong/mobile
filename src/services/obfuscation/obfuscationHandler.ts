import { obfuscateDocument } from "@govtechsg/open-attestation";
import { intersectionWith, filter } from "lodash";

export const obfuscateFields = [
  { title: "FIN", key: "recipient.fin" },
  { title: "Gender", key: "recipient.gender" },
  { title: "Country of Residence", key: "recipient.country" },
  { title: "Date of Birth", key: "recipient.dob" },
  { title: "Address", key: "recipient.address" },
  { title: "Marital Status", key: "recipient.maritalStatus" },
  { title: "Occupation", key: "recipient.occupation" },
  { title: "Pass Type", key: "pass.type" },
  { title: "Expiry Date", key: "pass.expiryDate" },
  { title: "Legal Till Date", key: "pass.legalTillDate" },
  { title: "Application Date", key: "pass.applicationDate" },
  { title: "Issue Date", key: "pass.issueDate" },
  { title: "Renewal Date", key: "pass.renewalDate" },
  { title: "Multiple Journey Visa", key: "pass.isMultipleJourney" },
  { title: "Employer's Name", key: "employer.name" },
  { title: "Employed Sector", key: "employer.sector" }
];

export const profileSelector = [
  {
    profile: "Landlord",
    detailsShown: [
      "recipient.country",
      "recipient.gender",
      "recipient.dob",
      "recipient.address",
      "recipient.maritalStatus",
      "recipient.occupation",
      "pass.expiryDate",
      "pass.legalTillDate",
      "pass.applicationDate"
    ]
  },
  {
    profile: "Telco",
    detailsShown: [
      "recipient.fin",
      "recipient.gender",
      "recipient.country",
      "recipient.dob",
      "recipient.address",
      "recipient.occupation"
    ]
  },
  {
    profile: "Police",
    detailsShown: [
      "recipient.fin",
      "recipient.gender",
      "recipient.country",
      "recipient.dob",
      "recipient.address",
      "recipient.maritalStatus",
      "recipient.occupation",
      "pass.type",
      "pass.expiryDate",
      "pass.legalTillDate",
      "pass.applicationDate",
      "pass.issueDate",
      "pass.renewalDate",
      "pass.isMultipleJourney",
      "employer.name",
      "employer.sector"
    ]
  },

  {
    profile: "Marine",
    detailsShown: [
      "pass.type",
      "pass.expiryDate",
      "pass.legalTillDate",
      "pass.applicationDate",
      "pass.issueDate",
      "pass.renewalDate",
      "pass.isMultipleJourney",
      "employer.name",
      "employer.sector"
    ]
  }
];

/* Accepts detailsShown which is an array of keys to show and a workpass on which the 
 obfuscateDocument function will obfuscate fields from.

 Returns an array of titles to display on the Alert component to inform users which
 details they will be sharing; as well as a obfuscatedDoc which contains the obfuscated
 fields as hashes.
*/
export const handleObfuscation = (detailsShown, workpass) => {
  const detailsString = intersectionWith(
    obfuscateFields,
    detailsShown,
    (field, key) => field.key === key
  )
    .map(object => object.title)
    .join(", ");

  const obfuscatedDetails = filter(
    obfuscateFields,
    field => !detailsShown.includes(field.key)
  );

  let obfuscatedDoc = workpass;
  obfuscatedDetails.forEach(item => {
    obfuscatedDoc = obfuscateDocument(obfuscatedDoc, item.key);
  });

  return { obfuscatedDoc, detailsString };
};
