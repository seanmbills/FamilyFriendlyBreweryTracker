import React from 'react'

import {
    createAppContainer, 
    createStackNavigator,
    createBottomTabNavigator,
    createSwitchNavigator,
} from 'react-navigation'
import WelcomeScreen from './src/screens/WelcomeScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import LoginScreen from './src/screens/LoginScreen';
import BreweryListScreen from './src/screens/BreweryListScreen'
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';

import {Provider as AuthProvider} from './src/context/AuthContext'
import {setNavigator} from './src/navigationRef'

const switchNavigator = createSwitchNavigator({
    loginFlow: createStackNavigator({
        Welcome: WelcomeScreen,
        Registration: RegistrationScreen,
        Login: LoginScreen,
        ForgotPassword: ForgotPasswordScreen
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
    }),
    loggedInFlow: createBottomTabNavigator({
        breweryListFlow: createStackNavigator({
            BreweryList: BreweryListScreen,
        })
    })
})

const App = createAppContainer(switchNavigator)

export default () => {
    return (
        <AuthProvider>
            <App ref={(navigator) => {setNavigator(navigator)}}/>
        </AuthProvider>
    )
}

// const navigator = createStackNavigator(
//   { //Route Object                                                                       
//     Welcome: WelcomeScreen,
//     Registration: RegistrationScreen,
//     Login: LoginScreen,
//     BreweryList: BreweryListScreen,
//     // ForgotPassword: ForgotPasswordScreen
//   },
  
// );

// export default createAppContainer(navigator);


