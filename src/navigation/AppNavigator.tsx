import { createBottomTabNavigator } from "react-navigation";
import React from "react";
import { View } from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { SettingsTab, CameraTab, ProfileTab } from "./tabs";

const AppNavigator = createBottomTabNavigator(
  {
    Settings: {
      screen: SettingsTab,
      navigationOptions: {
        tabBarLabel: <View />,
        tabBarIcon: ({ focused }) => (
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
        tabBarIcon: ({ focused }) => (
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
        tabBarIcon: ({ focused }) => (
          <FontAwesome
            name="user-circle"
            size={26}
            color={focused ? "#5D5D5D" : "#E2E2E2"}
          />
        )
      }
    }
  },
  {
    initialRouteName: "Camera"
  }
);

export default AppNavigator;
