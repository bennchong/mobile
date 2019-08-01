import { createSwitchNavigator } from "react-navigation";
import { SplashScreen } from "../components/Splash";
import { BottomTabNavigator } from "./BottomTabNavigator";

const AppNavigator = createSwitchNavigator(
  {
    Main: BottomTabNavigator,
    Splash: SplashScreen
  },
  { initialRouteName: "Splash" }
);

export default AppNavigator;
