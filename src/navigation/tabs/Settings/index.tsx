import React from "react";
import  SettingsTemplate  from "../../../components/settings/SettingsTemplate";
import  DevDebug  from "../../../components/settings/DevDebug";
import { createStackNavigator } from "react-navigation";

const SettingsTab = createStackNavigator(
  {
    SettingsHome: SettingsTemplate,
    DevDebug: DevDebug
  },
  {
    headerMode: "none"
  }
); 

export { SettingsTab };
