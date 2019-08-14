import axios from "axios";
import {
  verificationStatusEnum,
  verifyWorkpass,
  verifyWorkpassBoolean
} from "./verificationService";

const fetch = async url => {
  const results = await axios.get(url, { responseType: "json" });
  return results.data;
};

const validURL =
  "https://raw.githubusercontent.com/sgworkpass/demo/master/cert_valid.json";
const tamperedURL =
  "https://raw.githubusercontent.com/sgworkpass/demo/master/cert_tampered.json";
const revokedURL =
  "https://raw.githubusercontent.com/sgworkpass/demo/master/cert_revoked.json";
const expiredURL =
  "https://raw.githubusercontent.com/sgworkpass/demo/master/cert_expired.json";

let validDocument;
let expiredDocument;
let tamperedDocument;
let revokedDocument;
beforeAll(async () => {
  validDocument = await fetch(validURL);
  expiredDocument = await fetch(expiredURL);
  tamperedDocument = await fetch(tamperedURL);
  revokedDocument = await fetch(revokedURL);
});

describe("verificationService", () => {
  it("should return valid for a valid cert", async () => {
    const result = await verifyWorkpass(validDocument);
    expect(result).toBe(verificationStatusEnum.VALID);
  });

  it("should return expired for an expired cert", async () => {
    const result = await verifyWorkpass(expiredDocument);
    expect(result).toBe(verificationStatusEnum.EXPIRED);
  });

  it("should return tampered for a tampered cert", async () => {
    const result = await verifyWorkpass(tamperedDocument);
    expect(result).toBe(verificationStatusEnum.TAMPERED);
  });

  it("should return revoked for a revoked cert", async () => {
    const result = await verifyWorkpass(revokedDocument);
    expect(result).toBe(verificationStatusEnum.REVOKED);
  });

  it("should return invalid for anything else", async () => {
    const result = await verifyWorkpass("anything else");
    expect(result).toBe(verificationStatusEnum.INVALID);
  });
});

describe("verifyWorkpassBoolean", () => {
  it("should return true for a valid cert", async () => {
    const result = await verifyWorkpassBoolean(validDocument);
    expect(result).toBe(true);
  });

  it("should return false for an expired cert", async () => {
    const result = await verifyWorkpassBoolean(expiredDocument);
    expect(result).toBe(false);
  });

  it("should return false for a tampered cert", async () => {
    const result = await verifyWorkpassBoolean(tamperedDocument);
    expect(result).toBe(false);
  });

  it("should return false for a revoked cert", async () => {
    const result = await verifyWorkpassBoolean(revokedDocument);
    expect(result).toBe(false);
  });

  it("should return false for anything else", async () => {
    const result = await verifyWorkpassBoolean("anything else");
    expect(result).toBe(false);
  });
});

// TODO: write tests for invalid issuer identity, after generating the certs
