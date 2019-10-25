export interface IContextState {
  workpass: any;
  dpWorkpassArray: any;
  workpassAcceptedBooleanArray: object;
  timeAcceptedArray: object;
  numberOfProfiles: number;
  profilesArray: object;
}

export interface IProfileObject {
  workpass: object;
  timeAccepted: string;
  timeLastVerified: string;
  validatedThisSession: boolean;
}
