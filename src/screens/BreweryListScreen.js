import React from 'react'
import {View, StyleSheet, Text} from 'react-native'
import { Button } from 'react-native-elements'
import WelcomeButton from '../components/WelcomeButton'
import UpdateAccountScreen from './UpdateAccountScreen'

const BreweryListScreen = ({navigation}) => {
    return ( 
        <View>
            <Text style={{fontSize:48}}>Signed In Screen</Text>
            <WelcomeButton
                title="Update Account"
                onPress={()=> navigation.navigate("UpdateAccount")}
            />
        </View>
        
    );
}

const styles = StyleSheet.create({})

export default BreweryListScreen