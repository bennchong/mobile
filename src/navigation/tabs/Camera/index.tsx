import { createStackNavigator } from "react-navigation";
import { ScannerPage } from "../../../components/Camera/ScannerPage";
import ProfilePreviewPage from "../../../components/Camera/ProfilePreviewPage";

const CameraTab = createStackNavigator(
  {
    Home: ScannerPage,
    ProfilePreview: ProfilePreviewPage
  },
  {
    headerMode: "none"
  }
);

export { CameraTab };
