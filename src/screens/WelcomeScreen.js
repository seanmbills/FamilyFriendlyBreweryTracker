import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import WelcomeButton from '../components/WelcomeButton';

const WelcomeScreen = () => {
    return (
        <View style= {styles.background}> 
            <Text style= {styles.welcomeBanner}>
                Welcome
            </Text>
            <View styles= {styles.buttonSection} >
                <WelcomeButton
                    title="Sign Up"
                    destScreen={require('./RegistrationScreen')}
                />
                <WelcomeButton
                    title="Login"
                    destScreen={require('./LoginScreen')}
                 />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    welcomeBanner: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 50,
    },
    background: {
        backgroundColor: '#fcc203',
        height: '100%',
        width: '100%'
    },
    buttonSection:{
        justifyContent: 'center',
        alignItems: 'center',
    }
});
export default WelcomeScreen;