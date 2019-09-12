import { createStackNavigator } from "react-navigation";
import SettingsTemplate from "../../../components/Settings/SettingsTemplate";
import DevDebug from "../../../components/Settings/DevDebug";
import AboutPage from "../../../components/Settings/AboutPage";
import PrivacyPage from "../../../components/Settings/PrivacyPage";
import TermsPage from "../../../components/Settings/TermsPage";

const SettingsTab = createStackNavigator(
  {
    SettingsTemplate,
    DevDebug,
    AboutPage,
    PrivacyPage,
    TermsPage
  },
  {
    headerMode: "none"
  }
);

export { SettingsTab };
