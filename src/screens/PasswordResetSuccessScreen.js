import React from 'react'
import {View, StyleSheet, Text} from 'react-native'
import WelcomeButton from '../components/WelcomeButton'

const PasswordResetSuccessScreen = ({navigation}) => {
    return (
        <View style={styles.background}>
            <Text style={styles.header}>Password Reset Successful</Text>
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
        flex: 1
    },
    header: {
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "center",
        margin: 20
    },
    buttonContainer: {
        alignItems: "center",
        margin: 20
    }
})

export default PasswordResetSuccessScreen;