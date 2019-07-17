const openpgp = require("openpgp");

/**
 * Sets up recommended openpgp configuration options
 * Most of these options are only relevant to passphrase mode
 */
const openpgpSetup = ({
  enableAead = false, // AEAD is recommended but has poor compatibility
  enableMaxPassphraseSecurity = true // has significant computational impact
} = {}) => {
  openpgp.config.show_comment = false;
  openpgp.config.show_version = false;
  openpgp.config.integrity_protect = true;
  openpgp.config.encryption_cipher = openpgp.enums.symmetric.aes256;
  openpgp.config.prefer_hash_algorithm = openpgp.enums.hash.sha256;
  openpgp.config.deflate_level = 9;
  if (enableMaxPassphraseSecurity) {
    openpgp.config.s2k_iteration_count_byte = 255; // Set s2k iterations to 65011712
  }
  if (enableAead) {
    openpgp.config.aead_protect = true;
    openpgp.config.aead_mode = openpgp.enums.aead.eax;
  }
};

openpgpSetup();

/**
 * Generates a random key represented as a hexadecimal string
 * @param {integer} keyLengthInBits Key length
 */
const generateEncryptionKey = async keyLengthInBits => {
  const sessionKey = await openpgp.crypto.random.getRandomBytes(
    keyLengthInBits / 8
  );
  return Buffer.from(sessionKey).toString("hex");
};

/**
 * Uses PGP aes-256 symmetric encryption (tag: 9) to encrypt a given string, generating its own Key and IV
 * Key is returned in the return object, IV is part of the encryptedString
 *
 * Zlib compression is applied
 * @param {string} document Input string to encrypt
 */
const encryptString = async document => {
  if (typeof document !== "string") {
    throw new Error("encryptString only accepts strings");
  }
  const passphrase = await generateEncryptionKey(256);
  const message = await openpgp.message.fromText(document);
  const options = {
    passwords: passphrase,
    message,
    armor: true,
    compression: openpgp.enums.compression.zlib
  };
  const encryptedMessage = await openpgp.encrypt(options);
  console.log(encryptedMessage);
  return {
    encryptedString: encryptedMessage.data,
    key: passphrase,
    type: "PGP"
  };
};

/**
 * decrypts an encrypted message given a passphrase
 * @param ciphertext
 * @param passphrase
 */
const decryptString = async (ciphertext, passphrase) => {
  const message = await openpgp.message.readArmored(ciphertext);
  const options = {
    passwords: passphrase,
    message,
    compression: openpgp.enums.compression.zip // compress the data with zip
  };
  return openpgp.decrypt(options);
};

const PGP_META_LENGTHS = {
  header: 31,
  footer: 29
};

module.exports = {
  generateEncryptionKey,
  PGP_META_LENGTHS,
  encryptString,
  decryptString
};
