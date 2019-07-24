import { createStackNavigator } from "react-navigation";
import { ScannerPage } from "./ScannerPage";
import ProfilePreviewPage from "./ProfilePreviewPage";

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
