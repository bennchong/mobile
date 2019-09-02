import { createStackNavigator } from "react-navigation";
import SettingsTemplate from "../../../components/Settings/SettingsTemplate";
import DevDebug from "../../../components/Settings/DevDebug";
import AboutPage from "../../../components/Settings/AboutPage";
import PrivacyPage from "../../../components/Settings/PrivacyPage";

const SettingsTab = createStackNavigator(
  {
    SettingsTemplate,
    DevDebug,
    AboutPage,
    PrivacyPage
  },
  {
    headerMode: "none"
  }
);

export { SettingsTab };
