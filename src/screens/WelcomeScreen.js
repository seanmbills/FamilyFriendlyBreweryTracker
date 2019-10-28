import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import WelcomeButton from '../components/WelcomeButton';

import {
    AdMobBanner,
    AdMobInterstitial,
    AdMobRewarded,
    PublisherBanner
} from 'expo-ads-admob'

async function initializeInterstitial() {
    AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/4411468910'); // Test ID, Replace with your-admob-unit-id
    AdMobInterstitial.setTestDeviceID('EMULATOR');
    try {
        await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true}).catch(error => console.warn(error));
        await AdMobInterstitial.showAdAsync().catch(error => console.log(error));
    } catch (err) {
        console.warn(err)
    }
}

const WelcomeScreen = ({navigation}) => {
    // initializeInterstitial()
    return (
        <View>
            <AdMobBanner
                bannerSize="fullBanner"
                adUnitID="ca-app-pub-3940256099942544/2934735716" // Test ID, Replace with your-admob-unit-id
                testDeviceID="EMULATOR"
                servePersonalizedAds // true or false
                onDidFailToReceiveAdWithError={console.log(this.bannerError)}
            />
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