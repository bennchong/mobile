import { createStackNavigator } from "react-navigation";
import { ScannerPage } from "../../../components/Camera/ScannerPage";
import ProfilePreviewPage from "../Preview";

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
