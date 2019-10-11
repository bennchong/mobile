export interface IContextState {
  workpass: any;
  dpWorkpassArray: any;
  workpassAcceptedBooleanArray: object;
  timeAcceptedArray: object;
  timeVerifiedArray: object;
  numberOfProfiles: number;
  sessionValidatedArray: object;
  profilesArray: object;
}

export interface IProfileObject {
  workpass: object;
  timeAccepted: string;
  timeLastVerified: string;
  validatedThisSession: boolean;
}
