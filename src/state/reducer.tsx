import cloneDeep from "lodash/cloneDeep";
import { profileObjectInit } from "./initialState";
import { getCurrentDateAndTime } from "../services/date/date";
import { storeProfilesArray } from "../services/fileSystem";

export const reducer = (state, action) => {
  let newMain;
  let newDPPass;
  let newProfileObject;
  const modifiedProfileArray = cloneDeep(state.profilesArray); // Deep clones only profilesArray within state
  switch (action.type) {
    // Refactor section - adhering to be a pure function
    case "ADD_MAINPASS":
      newMain = action.workpass;
      modifiedProfileArray[0].workpass = newMain;
      storeProfilesArray(modifiedProfileArray);
      return { ...state, profilesArray: modifiedProfileArray };
    case "ADD_DPPASS":
      newDPPass = action.workpass;
      newProfileObject = Object.assign({}, profileObjectInit);
      newProfileObject.workpass = newDPPass;
      modifiedProfileArray.push(newProfileObject);
      storeProfilesArray(modifiedProfileArray);
      return { ...state, profilesArray: modifiedProfileArray };
    case "VALIDATED_SESSION":
      newProfileObject = cloneDeep(state.profilesArray[action.profileIndex]); // Access correct profile index
      newProfileObject.validatedThisSession = action.boolean;
      modifiedProfileArray[action.profileIndex] = newProfileObject;
      storeProfilesArray(modifiedProfileArray);
      return { ...state, profilesArray: modifiedProfileArray };
    case "SET_TIME_ACCEPTED":
      newProfileObject = cloneDeep(state.profilesArray[action.profileIndex]);
      newProfileObject.timeAccepted = getCurrentDateAndTime();
      modifiedProfileArray[action.profileIndex] = newProfileObject;
      storeProfilesArray(modifiedProfileArray);
      return { ...state, profilesArray: modifiedProfileArray };
    case "SET_TIME_VERIFIED":
      newProfileObject = cloneDeep(state.profilesArray[action.profileIndex]);
      newProfileObject.timeLastVerified = getCurrentDateAndTime();
      modifiedProfileArray[action.profileIndex] = newProfileObject;
      storeProfilesArray(modifiedProfileArray);
      return { ...state, profilesArray: modifiedProfileArray };
    case "LOAD_PROFILESARRAY_FROM_FS":
      return { ...state, profilesArray: action.profilesArray };
    case "DELETE_WORKPASS":
      return { ...action.resetState };
    case "SCANNED_PASS":
      return { ...state, tempProfile: action.tempPass };
    default:
      return state;
  }
};
