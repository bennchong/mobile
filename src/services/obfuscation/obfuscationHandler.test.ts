import { handleObfuscation } from "./obfuscationHandler";

const workpass = require("../../test/fixtures/validCert.json");

describe("handleObfuscation", () => {
  it("should obfuscate no fields", async () => {
    const { obfuscatedDoc } = handleObfuscation(
      [
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
      ],
      workpass
    );
    expect(obfuscatedDoc).toBeTruthy();
    expect(obfuscatedDoc.privacy.obfuscatedData === undefined);
  });

  it("should obfuscate two fields", async () => {
    const { obfuscatedDoc } = handleObfuscation(
      [
        "recipient.gender",
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
      ],
      workpass
    );
    expect(obfuscatedDoc).toBeTruthy();
    expect(obfuscatedDoc.privacy.obfuscatedData.length === 2);
  });
});
