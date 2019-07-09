import { createBottomTabNavigator } from 'react-navigation';
import Profile from './Profile';
import Settings from './Settings';
import Scanner from '../BarcodeScannerExample';

const AppNavigator = createBottomTabNavigator({
  Settings: Settings,
  Profile: Profile,
  // Camera: Scanner
});

export default AppNavigator;