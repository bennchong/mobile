import { createStackNavigator } from "react-navigation";
import SettingsTemplate from "../../../components/Settings/SettingsTemplate";
import DevDebug from "../../../components/Settings/DevDebug";

const SettingsTab = createStackNavigator(
  {
    SettingsTemplate,
    DevDebug
  },
  {
    headerMode: "none"
  }
);

export { SettingsTab };
