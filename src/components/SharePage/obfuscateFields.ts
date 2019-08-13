export const obfuscateFields = [
  { title: "FIN", key: "recipient.fin" },
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
      { title: "Country of Residence", key: "recipient.country" },
      { title: "Date of Birth", key: "recipient.dob" },
      { title: "Address", key: "recipient.address" },
      { title: "Marital Status", key: "recipient.maritalStatus" },
      { title: "Occupation", key: "recipient.occupation" }
    ]
  },
  {
    profile: "Telco",
    detailsShown: [
      { title: "FIN", key: "recipient.fin" },
      { title: "Country of Residence", key: "recipient.country" },
      { title: "Date of Birth", key: "recipient.dob" },
      { title: "Address", key: "recipient.address" },
      { title: "Occupation", key: "recipient.occupation" }
    ]
  },
  {
    profile: "Police",
    detailsShown: [
      { title: "FIN", key: "recipient.fin" },
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
    ]
  },

  {
    profile: "Marine",
    detailsShown: [
      { title: "Pass Type", key: "pass.type" },
      { title: "Expiry Date", key: "pass.expiryDate" },
      { title: "Legal Till Date", key: "pass.legalTillDate" },
      { title: "Application Date", key: "pass.applicationDate" },
      { title: "Issue Date", key: "pass.issueDate" },
      { title: "Renewal Date", key: "pass.renewalDate" },
      { title: "Multiple Journey Visa", key: "pass.isMultipleJourney" },
      { title: "Employer's Name", key: "employer.name" },
      { title: "Employed Sector", key: "employer.sector" }
    ]
  }
];
