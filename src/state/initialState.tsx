// eslint-disable-next-line no-unused-vars
import { IProfileObject, IContextState } from "./interfaces";

export const profileObjectInit: IProfileObject = {
  workpass: null,
  timeAccepted: null,
  timeLastVerified: null,
  validityStatus: null
};

export const initialState: IContextState = {
  tempProfile: null,
  profilesArray: [Object.assign({}, profileObjectInit)] // To deep clone profileObject, index 0 reserved for main pass
};
