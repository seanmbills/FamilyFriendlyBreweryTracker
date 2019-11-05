import React from 'react'

import {
    createAppContainer,
    createSwitchNavigator,
} from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import WelcomeScreen from './src/screens/WelcomeScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import LoginScreen from './src/screens/LoginScreen';
import BreweryListScreen from './src/screens/BreweryListScreen'
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import BreweryDetailsScreen from './src/screens/BreweryDetailsScreen';
import WriteReviewScreen from './src/screens/WriteReviewScreen';
import ReadReviewsScreen from './src/screens/ReadReviewsScreen';


import {Provider as AuthProvider} from './src/context/AuthContext'
import {Provider as BreweryProvider} from './src/context/BreweryContext'
import {setNavigator} from './src/navigationRef'
import PasswordResetSuccessScreen from './src/screens/PasswordResetSuccessScreen';
import UpdateAccountScreen from './src/screens/UpdateAccountScreen';
import MoreScreen from './src/screens/MoreScreen';
import CreateBreweryScreen from './src/screens/CreateBreweryScreen';
import EditBreweryScreen from './src/screens/EditBreweryScreen.js';

const switchNavigator = createSwitchNavigator({
    loginFlow: createStackNavigator({
        Welcome: WelcomeScreen,
        Registration: RegistrationScreen,
        Login: LoginScreen,
        ForgotPassword: ForgotPasswordScreen,
        PasswordResetSuccess: PasswordResetSuccessScreen,
        BreweryDetails: BreweryDetailsScreen,
        ReadReviews: ReadReviewsScreen,
        WriteReview: WriteReviewScreen,
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
            UpdateAccount: UpdateAccountScreen,
            More: MoreScreen,
            CreateBrewery: CreateBreweryScreen,
            EditBrewery: EditBreweryScreen,
            WriteReview: WriteReviewScreen
        })
    })
})

const App = createAppContainer(switchNavigator)

export default () => {
    return (
        <BreweryProvider>
            <AuthProvider>
                <App ref={(navigator) => {setNavigator(navigator)}}/>
            </AuthProvider>
        </BreweryProvider>
    )
}
