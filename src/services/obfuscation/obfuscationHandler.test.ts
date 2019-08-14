import { handleObfuscation } from "./obfuscationHandler";
import { fetchDocument } from "../qrHandler/qrHandler";

const URI =
  "https://raw.githubusercontent.com/sgworkpass/demo/master/cert_valid_new.json";

describe("handleObfuscation", () => {
  it("should obfuscate no fields", async () => {
    const workpass = await fetchDocument(URI);
    const { obfuscatedDoc } = handleObfuscation(
      [
        "recipient.fin",
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
    expect(obfuscatedDoc.privacy.obfuscatedData.length === 0);
  });

  it("should obfuscate two fields", async () => {
    const workpass = await fetchDocument(URI);
    const { obfuscatedDoc } = handleObfuscation(
      [
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
