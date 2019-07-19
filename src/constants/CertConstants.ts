enum CERT_VALIDITY_STATUS {
  VALIDATING = "validating",
  VALID = "valid",
  INVALID = "invalid"
}

enum CERT_STORAGE {
  SUCCESS = "success",
  FAILURE = "failure"
}

enum CERT_FETCHING {
  NOT_OK = "return value not ok",
  IS_OK = "return value is ok",
  ERROR = "Fetching Failed"
}

export { CERT_VALIDITY_STATUS, CERT_STORAGE, CERT_FETCHING };
