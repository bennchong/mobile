import { createBottomTabNavigator } from 'react-navigation';
import ProfileTab from './screens/ProfileTab';
import SettingsScreen from './screens/SettingsScreen';
import ScannerScreen from './screens/ScannerScreen';

const AppNavigator = createBottomTabNavigator({
  Settings: SettingsScreen,
  Camera: ScannerScreen,
  Profile: ProfileTab,
  },
  {
  initialRouteName: 'Camera',
  }
);

export default AppNavigator;