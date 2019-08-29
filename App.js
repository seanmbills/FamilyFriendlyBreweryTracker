import { createStackNavigator, createAppContainer } from 'react-navigation';
import WelcomeScreen from './src/screens/WelcomeScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import LoginScreen from './src/screens/LoginScreen';

const navigator = createStackNavigator(
  { //Route Object                                                                       
    Welcome: WelcomeScreen,
    Registration: RegistrationScreen,
    Login: LoginScreen
  },
  {
    initialRouteName: 'Welcome',
    defaultNavigationOptions: {
      title: '',
    }
  }
);

export default createAppContainer(navigator);


