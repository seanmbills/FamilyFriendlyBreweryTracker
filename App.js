import React  from 'react'
import {Platform, View, TouchableOpacity, StyleSheet, Text,Header} from 'react-native';
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
import WriteReviewScreen from './src/screens/WriteReviewScreen';
import ReadReviewsScreen from './src/screens/ReadReviewsScreen';


import {Provider as AuthProvider} from './src/context/AuthContext'
import {Provider as BreweryProvider} from './src/context/BreweryContext'
import {Provider as ReviewProvider} from './src/context/ReviewContext';
import {setNavigator} from './src/navigationRef'
import PasswordResetSuccessScreen from './src/screens/PasswordResetSuccessScreen';
import UpdateAccountScreen from './src/screens/UpdateAccountScreen';
import MoreScreen from './src/screens/MoreScreen';
import CreateBreweryScreen from './src/screens/CreateBreweryScreen';
import EditBreweryScreen from './src/screens/EditBreweryScreen.js';

const headerHeight = (Platform.OS === 'ios') ? 5 : 0;


const switchNavigator = createSwitchNavigator({
    loginFlow: createStackNavigator(
        {
            Welcome: WelcomeScreen,
            Registration: RegistrationScreen,
            Login: LoginScreen,
            ForgotPassword: ForgotPasswordScreen,
            PasswordResetSuccess: PasswordResetSuccessScreen,
        },
        {
            // Navigation options for the stack navigator 
            initialRouteName: 'Welcome',
            defaultNavigationOptions: {
                title: '',
                headerTintColor: 'grey',
                headerStyle: {
                    backgroundColor: '#fcc203',
                    height: headerHeight,
                    borderBottomColor: '#fcc203',
                    borderWidth: 0
                },
            }
        }
    ),
    loggedInFlow: createStackNavigator(
        {

            loggedInInnerFlow: createBottomTabNavigator({
            UpdateAccount: UpdateAccountScreen,
            breweryFlow: createStackNavigator(
                {
                    BreweryList: BreweryListScreen,
                    BreweryDetails: BreweryDetailsScreen,
                    ReadReviews: ReadReviewsScreen,
                    WriteReview: WriteReviewScreen,
                },
                {   // Navigation options for the stack navigator containing brewery stuff
                    defaultNavigationOptions: {
                        title: '',
                        headerMode: 'none',
                        header: null,
                        navigationOptions: {
                            header: null
                        }       
                    }
                }
            ),
            optionsFlow: createStackNavigator(
                {
                    More: MoreScreen,
                    CreateBrewery: CreateBreweryScreen,
                    EditBrewery: EditBreweryScreen,
                    WriteReview: WriteReviewScreen
                },
                {
                    defaultNavigationOptions: {
                        title: '',
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
                    if (routeName === 'breweryFlow') {
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
            //Options for the bottom tab navigator
            initialRouteName: 'breweryFlow',
            tabBarOptions: {
                initialRouteName: 'breweryFlow',
                activeTintColor: 'black',
                inactiveTintColor: 'grey',
                showLabel: false,
            }
        },
        )
    },
    {
        //Options for the navigation object which wraps around the entire logged in flow. 
        //Sets banner to be displayed across top of all screens after login
        initialRouteName: 'loggedInInnerFlow',
        defaultNavigationOptions: ({navigation}) => (
            // var color = '#fcc203';
            // if (navigation.routeName === 'breweryFlow') {
            //     color = 'white'
            // }
            // return <View style={{backgroundColor: {color}, height: 2}}></View>
          {
            headerTintColor: 'grey',
            headerStyle: {
              backgroundColor: (navigation.routeName === 'breweryFlow') ? 'white' : '#fcc203',
              height: headerHeight,
              borderBottomWidth: 0
            },
         }
         )
    }
    )  
}
)


const App = createAppContainer(switchNavigator)

export default () => {
    return (
        <ReviewProvider>
        <BreweryProvider>
            <AuthProvider>
                <App ref={(navigator) => {setNavigator(navigator)}}/>
            </AuthProvider>
        </BreweryProvider>
        </ReviewProvider>
    )
}
