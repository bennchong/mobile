import { createBottomTabNavigator } from 'react-navigation';
import ProfileTab from './screens/ProfileTab';
import SettingsTab from './screens/SettingsTab';
import ScannerTab from './screens/ScannerTab';

const AppNavigator = createBottomTabNavigator({
  Settings: SettingsTab,
  Camera: ScannerTab,
  Profile: ProfileTab,
  },
  {
  initialRouteName: 'Camera',
  }
);

export default AppNavigator;