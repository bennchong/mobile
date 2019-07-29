import { createStackNavigator } from "react-navigation";
import SettingsTemplate from "../../../components/settings/SettingsTemplate";
import DevDebug from "../../../components/settings/DevDebug";

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
