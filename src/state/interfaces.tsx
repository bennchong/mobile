export interface IContextState {
  tempProfile: object;
  profilesArray: object;
}

export interface IProfileObject {
  workpass: object;
  timeAccepted: string;
  timeLastVerified: string;
  validatedThisSession: boolean;
}
