/* eslint-disable no-unused-vars */
import {
  NavigationScreenProp,
  NavigationParams,
  NavigationRoute
} from "react-navigation";
/* eslint-enable no-unused-vars */

type StateParams = NavigationRoute<NavigationParams>;

export type Navigation = NavigationScreenProp<StateParams>;
