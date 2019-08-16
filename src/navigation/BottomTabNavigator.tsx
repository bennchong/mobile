import { createBottomTabNavigator } from "react-navigation";
import React from "react";
import { View } from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { SettingsTab, CameraTab, ProfileTab } from "./tabs";

interface tabBarIconProps {
  focused: any;
}

const MenuIcon = ({ focused }: tabBarIconProps) => (
  <Feather name="menu" size={26} color={focused ? "#5D5D5D" : "#E2E2E2"} />
);

const CameraIcon = ({ focused }: tabBarIconProps) => (
  <FontAwesome
    name="camera"
    size={26}
    color={focused ? "#5D5D5D" : "#E2E2E2"}
  />
);

const ProfileIcon = ({ focused }: tabBarIconProps) => (
  <FontAwesome
    name="user-circle"
    size={26}
    color={focused ? "#5D5D5D" : "#E2E2E2"}
  />
);

export const BottomTabNavigator = createBottomTabNavigator(
  {
    Settings: {
      screen: SettingsTab,
      navigationOptions: {
        tabBarLabel: <View />,
        tabBarIcon: MenuIcon
      }
    },
    Camera: {
      screen: CameraTab,
      navigationOptions: {
        tabBarLabel: <View />,
        tabBarIcon: CameraIcon
      }
    },
    Profile: {
      screen: ProfileTab,
      navigationOptions: {
        tabBarLabel: <View />,
        tabBarIcon: ProfileIcon
      }
    }
  },
  { initialRouteName: "Camera" }
);
