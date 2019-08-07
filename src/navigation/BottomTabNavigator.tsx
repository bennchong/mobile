import { createBottomTabNavigator } from "react-navigation";
import React from "react";
import { View } from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { SettingsTab, CameraTab, ProfileTab } from "./tabs";

interface tabBarIconProps {
  focused: any;
}

export const BottomTabNavigator = createBottomTabNavigator(
  {
    Settings: {
      screen: SettingsTab,
      navigationOptions: {
        tabBarLabel: <View />,
        // eslint-disable-next-line react/display-name
        tabBarIcon: ({ focused }: tabBarIconProps) => (
          <Feather
            name="menu"
            size={26}
            color={focused ? "#5D5D5D" : "#E2E2E2"}
          />
        )
      }
    },
    Camera: {
      screen: CameraTab,
      navigationOptions: {
        tabBarLabel: <View />,
        // eslint-disable-next-line react/display-name
        tabBarIcon: ({ focused }: tabBarIconProps) => (
          <FontAwesome
            name="camera"
            size={26}
            color={focused ? "#5D5D5D" : "#E2E2E2"}
          />
        )
      }
    },
    Profile: {
      screen: ProfileTab,
      navigationOptions: {
        tabBarLabel: <View />,
        // eslint-disable-next-line react/display-name
        tabBarIcon: ({ focused }: tabBarIconProps) => (
          <FontAwesome
            name="user-circle"
            size={26}
            color={focused ? "#5D5D5D" : "#E2E2E2"}
          />
        )
      }
    }
  },
  { initialRouteName: "Camera" }
);
