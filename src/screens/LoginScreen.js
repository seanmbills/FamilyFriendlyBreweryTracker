import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import TitleText from '../components/TitleText';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import WelcomeButton from '../components/WelcomeButton';
const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <ScrollView style={styles.background}>
            <TitleText
                title="Login"
            />
            <View style={styles.formElement}> 
                <Text style={styles.formLabel}>Email</Text>
                <TextInput
                    style={styles.textInput}
                    value={email}
                    placeholder="Email"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(newEmail) => {
                        setEmail(newEmail);
                    }}
                />
            </View>
            <View style={styles.formElement}>
                <Text style={styles.formLabel}>Password</Text>
                <TextInput
                    style={styles.textPassword}
                    value={password}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="password"
                    onChangeText={(newPass) => {
                        setPassword(newPass);
                    }}
                />
            </View>

            <View style={styles.buttonContainer}>
                <WelcomeButton
                    title="Login"
                    onPress={() => {
                        console.log("Login button pressed")
                    }}
                />
            </View>
            <View style={styles.buttonContainer}>
                <WelcomeButton
                    title="Back"
                    onPress={() => {
                        navigation.navigate("Welcome");
                    }}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: "#fcc203",
        marginTop: 20
    },
    formElement: {
        marginTop: 20,
    },
    formLabel: {
        fontSize: 20,
        textAlign: 'center',
        flexDirection: 'column',
    },
    textInput: {
        backgroundColor: '#ffffff',
        opacity: 95,
        borderRadius: 10,
        height: 30,
        width: "75%",
        marginLeft: 10,
        alignSelf: "center"
    },
    textPassword: {
        backgroundColor: '#ffffff',
        opacity: 95,
        borderRadius: 10,
        height: 30,
        width: "75%",
        marginLeft: 10,
        alignSelf: "center"
    },
    buttonContainer: {
        alignItems: "center",
        marginTop: 20
    }
});

export default LoginScreen;