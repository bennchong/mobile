import { createBottomTabNavigator } from 'react-navigation';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import ScannerScreen from './screens/ScannerScreen';

const AppNavigator = createBottomTabNavigator({
  Settings: SettingsScreen,
  Camera: ScannerScreen,
  Profile: ProfileScreen,
  },
  {
  initialRouteName: 'Camera',
  }
);

export default AppNavigator;