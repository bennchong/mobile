// eslint-disable-next-line no-unused-vars
import { IProfileObject, IContextState } from "./interfaces";
import { verificationStatusEnum } from "../services/verificationService/verificationService";

export const profileObjectInit: IProfileObject = {
  workpass: null,
  timeAccepted: null,
  timeLastVerified: null,
  validityStatus: verificationStatusEnum.VALIDATING
};

export const initialState: IContextState = {
  tempProfile: null,
  profilesArray: [Object.assign({}, profileObjectInit)] // To deep clone profileObject, index 0 reserved for main pass
};
