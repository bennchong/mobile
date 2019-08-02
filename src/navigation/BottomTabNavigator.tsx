import { createBottomTabNavigator } from "react-navigation";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { SettingsTab, CameraTab, ProfileTab } from "./tabs";

// eslint-disable-next-line no-unused-vars
import { Navigation } from "./types";

interface getTabBarIconProps {
  navigation: Navigation;
  tintColor: string;
}

const getTabBarIcon = ({ navigation, tintColor }: getTabBarIconProps) => {
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

export const BottomTabNavigator = createBottomTabNavigator(
  {
    Settings: SettingsTab,
    Camera: CameraTab,
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