import axios from "axios";
import { uploadWorkpass } from "./transferAPI";

const fetch = async url => {
  const results = await axios.get(url, { responseType: "json" });
  return results.data;
};

const validURL =
  "https://raw.githubusercontent.com/sgworkpass/demo/dpCerts/unencrypted_pass/cert_valid_ltvp copy.json";

let validFormatWorkpass;
let invalidFormatWorkpass;

beforeAll(async () => {
  validFormatWorkpass = await fetch(validURL);
  invalidFormatWorkpass = {
    invalid: true
  };
});

describe("TransferAPI upload test", () => {
  it("Correct formatted workpass returns valid objects with proper fields", async () => {
    const result = await uploadWorkpass(validFormatWorkpass);
    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("ttl");
    expect(result).toHaveProperty("key");
    expect(result).toHaveProperty("type");
  });
  it("Incorrectly formatted workpass returns invalid ", async () => {
    try {
      uploadWorkpass(invalidFormatWorkpass);
    } catch (error) {
      expect(error.message).toBe("Request failed with status code 400");
    }
  });
});
