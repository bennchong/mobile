// eslint-disable-next-line no-unused-vars
import { NavigationScreenProp, NavigationState } from "react-navigation";

interface StateParams extends NavigationState {
  routeName: string;
}

export type Navigation = NavigationScreenProp<StateParams>;
