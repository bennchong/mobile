import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import ProfileTab from "./screens/ProfileTab";
import SettingsTab from "./screens/SettingsTab";
import ScannerTab from "./screens/ScannerTab";
import ProfileModal from "./screens/stacks/scanner/ProfileModal";

const getTabBarIcon = ({ navigation, tintColor }) => {
  const { routeName } = navigation.state;
  let iconName;
  if (routeName === "Camera") {
    iconName = `ios-qr-scanner`;
    // Sometimes we want to add badges to some icons.
    // You can check the implementation below.
    // IconComponent = HomeIconWithBadge;
  } else if (routeName === "Settings") {
    iconName = `ios-settings`;
  } else if (routeName === "Profile") {
    iconName = `ios-person`;
  }
  // You can return any component that you like here!
  return <Ionicons name={iconName} size={25} color={tintColor} />;
};

const HomeStack = createStackNavigator(
  {
    Home: ScannerTab,
    Modal: ProfileModal
  },
  {
    headerMode: "none"
  }
);

const AppNavigator = createBottomTabNavigator(
  {
    Settings: SettingsTab,
    Camera: HomeStack,
    Profile: ProfileTab
  },
  {
    initialRouteName: "Camera",

    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => getTabBarIcon({ navigation, tintColor })
    }),

    tabBarOptions: {
      activeTintColor: "tomato",
      inactiveTintColor: "gray"
    }
  }
);

export default AppNavigator;
