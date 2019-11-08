import React  from 'react'
import {TouchableOpacity, StyleSheet, Text,Header} from 'react-native';
import {
    createAppContainer, 
    createSwitchNavigator,
} from 'react-navigation'

import {Ionicons} from '@expo/vector-icons';
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
    loggedInFlow: createStackNavigator({

        loggedInInnerFlow: createBottomTabNavigator({
        
            UpdateAccount: UpdateAccountScreen,
            BreweryList: BreweryListScreen,
            optionsFlow: createStackNavigator({
                More: MoreScreen,
                CreateBrewery: CreateBreweryScreen,
                EditBrewery: EditBreweryScreen
            },
            {
                defaultNavigationOptions: {
                    headerMode: 'none',
                    header: null,
                    navigationOptions: {
                        header: null
                    }
                }
            }
            )
        },
    
        {
            defaultNavigationOptions: ({ navigation }) => ({
                tabBarIcon: ({ focused, horizontal, tintColor }) => {
                    const { routeName } = navigation.state;
                    var iconName;
                    var onPress;
                    if (routeName === 'BreweryList') {
                        iconName = "md-search";
                    } else if (routeName === 'UpdateAccount') {
                        iconName = "md-person"
                    } else if (routeName === 'optionsFlow') {
                        iconName = "ios-more"
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={30} color={tintColor}/>;
                },

            }),
            initialRouteName: 'BreweryList',
            tabBarOptions: {
                initialRouteName: 'BreweryList',
                activeTintColor: 'black',
                inactiveTintColor: 'grey',
                showLabel: false,
            }
        },
    )
    },
    {
        initialRouteName: 'loggedInInnerFlow',
        defaultNavigationOptions: {
            headerTintColor: 'grey',
            headerStyle: {
              backgroundColor: 'white',
              height: 5
            },
          },
    }
    )  
}
)


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


