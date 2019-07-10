import { createBottomTabNavigator } from 'react-navigation';
import Profile from './Profile';
import Settings from './Settings';
import Scanner from '../BarcodeScannerExample';

const AppNavigator = createBottomTabNavigator({
  Settings: Settings,
  Camera: Scanner,
  Profile: Profile,
  },
  {
  initialRouteName: 'Camera',
  }
);

export default AppNavigator;