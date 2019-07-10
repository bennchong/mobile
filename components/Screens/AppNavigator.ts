import { createBottomTabNavigator } from 'react-navigation';
import ProfileScreen from './ProfileScreen';
import SettingsScreen from './SettingsScreen';
import ScannerScreen from '../BarcodeScannerExample';

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