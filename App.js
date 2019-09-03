import { createStackNavigator, createAppContainer } from 'react-navigation';
import WelcomeScreen from './src/screens/WelcomeScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import LoginScreen from './src/screens/LoginScreen';
import flags from 'react-native-phone-input/lib/resources/flags';

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
      headerMode: 'none',
      header: null,
      navigationOptions: {
        header: null
      }
    }
  }
);

export default createAppContainer(navigator);


