import React from 'react'
import {View, StyleSheet, Text} from 'react-native'
import WelcomeButton from '../components/WelcomeButton'
import SubHeading from '../components/SubHeading';

const PasswordResetSuccessScreen = ({navigation}) => {
    return (
        <View style={styles.background}>
            <SubHeading
                title="Password Reset Successful"
            />
            <View style={styles.buttonContainer}>
                <WelcomeButton
                    title="Back to Login"
                    onPress={() => {
                        navigation.navigate('Login')
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: "#fcc203",
        flex: 1,
        paddingTop: 40
    },
    buttonContainer: {
        alignItems: "center"
    }
})

export default PasswordResetSuccessScreen;