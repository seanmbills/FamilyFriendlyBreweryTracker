import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import WelcomeButton from '../components/WelcomeButton';

const WelcomeScreen = ({navigation}) => {
    return (
        <View style= {styles.background}> 
            <Text style= {styles.welcomeBanner}>
                FamBrews
            </Text>
            <View styles= {styles.buttonSection} >
                <WelcomeButton
                    title="Sign Up"
                    destScreen="Registration"
                    onPress={() => {
                        navigation.navigate('Registration')
                    }}
                />
                <WelcomeButton
                    title="Login"
                    destScreen="Login"
                    onPress={() => {
                        navigation.navigate('Login')
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    welcomeBanner: {
        fontSize: 60,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 50,
        marginBottom: 100
    },
    background: {
        backgroundColor: '#fcc203',
        height: '100%',
        width: '100%',
        alignContent: 'center',
        alignItems: 'center'
    },
    buttonSection:{
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    }
});
export default WelcomeScreen;