import React from 'react'

import {
    createAppContainer, 
    createSwitchNavigator,
} from 'react-navigation'

import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import WelcomeScreen from './src/screens/WelcomeScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import LoginScreen from './src/screens/LoginScreen';
import BreweryListScreen from './src/screens/BreweryListScreen'
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import BreweryDetailsScreen from './src/screens/BreweryDetailsScreen';

import {Provider as AuthProvider} from './src/context/AuthContext'
import {Provider as BreweryProvider} from './src/context/BreweryContext'
import {setNavigator} from './src/navigationRef'
import PasswordResetSuccessScreen from './src/screens/PasswordResetSuccessScreen';
import UpdateAccountScreen from './src/screens/UpdateAccountScreen';
import MoreScreen from './src/screens/MoreScreen';
import CreateBreweryScreen from './src/screens/CreateBreweryScreen';
import EditBreweryScreen from './src/screens/EditBreweryScreen.js';

import NavigationButton from './src/components/NavigationButton'

const switchNavigator = createSwitchNavigator({
    loginFlow: createStackNavigator({
        Welcome: WelcomeScreen,
        Registration: RegistrationScreen,
        Login: LoginScreen,
        ForgotPassword: ForgotPasswordScreen,
        PasswordResetSuccess: PasswordResetSuccessScreen,
        BreweryDetails: BreweryDetailsScreen,
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
        
        UpdateAccount: UpdateAccountScreen,

        BreweryList: BreweryListScreen,

        optionsFlow: createStackNavigator({
            More: MoreScreen,
            CreateBrewery: CreateBreweryScreen,
            EditBrewery: EditBreweryScreen
        })
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let screenName;
                if (routeName === 'optionsFlow') {
                    screenName = "More"
                    onPress= () => {navigation.navigate({routeName})}
                } else if (routeName === 'BreweryList') {
                    screenName = "Search"
                    onPress= () => {navigation.navigate({BreweryList})}
                } else if (routeName === 'UpdateAccount') {
                    screenName = 'Account'
                    onPress=()=>{navigation.navigate({routeName})}
                }
                return <NavigationButton title={screenName} onPress={()=>navigation.navigate({routeName})} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            initialRouteName: 'BreweryList',
            activeTintColor: 'white',
            inactiveTintColor: 'black',
            showLabel: false,
        }
    }
    
    )
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


