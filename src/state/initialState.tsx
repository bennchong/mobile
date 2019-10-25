// eslint-disable-next-line no-unused-vars
import { IProfileObject, IContextState } from "./interfaces";

export const profileObjectInit: IProfileObject = {
  workpass: null,
  timeAccepted: null,
  timeLastVerified: null,
  validatedThisSession: null
};

export const initialState: IContextState = {
  workpass: null,
  dpWorkpassArray: [],
  workpassAcceptedBooleanArray: [],
  timeAcceptedArray: [],
  numberOfProfiles: 0,
  sessionValidatedArray: [],
  profilesArray: [Object.assign({}, profileObjectInit)] // To deep clone profileObject, index 0 reserved for main pass
};
