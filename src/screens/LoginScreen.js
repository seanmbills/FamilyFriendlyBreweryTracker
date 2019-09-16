import React, { useState, useContext } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import {NavigationEvents} from 'react-navigation'
import TitleText from '../components/TitleText';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import WelcomeButton from '../components/WelcomeButton';
import {Context as AuthContext} from '../context/AuthContext'

const LoginScreen = ({navigation}) => {
    const {state, signin, clearErrorMessage} = useContext(AuthContext)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function validateInput(inputMap) {
        const email = inputMap.get('email');
        const password = inputMap.get('password');
        if (email.length > 0 && password.length >= 8) {
            console.log('not valid input')
            return true;
        }
        console.log('valid input')
        return false;
    }
    return (
        <ScrollView style={styles.background}>
            <NavigationEvents 
                onWillBlur={clearErrorMessage}
            />
            <View style={styles.topSpan}/>
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
                
                {/* <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('ForgotPassword')
                    }}
                >
                    <Text style={styles.forgotPassword}>Forgot Password</Text>
                </TouchableOpacity> */}

            </View>
            {state.errorMessage ? <Text style={styles.errorMsg}>{state.errorMessage}</Text> : null}
            <View style={styles.buttonContainer}>
                <WelcomeButton
                    title="Login"
                    onPress={ async () => {
                        const validateMap = new Map();
                        validateMap.set('email', email);
                        validateMap.set('password', password);

                        if (validateInput(validateMap)) {
                            const emailOrId = email;
                            signin({emailOrId, password})
                        } else {
                            console.log("input was not valid");
                        }
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
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("ForgotPassword");
                }}
            >
                <Text style={styles.forgotPass}>Forgot Password</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: "#fcc203",
        paddingTop: 20
    },
    formElement: {
        marginTop: 15,
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
    },
    forgotPassword: {
        marginTop: 10,
        alignSelf: "center",
        textAlign: "center",
        fontSize: 12
    },
    errorMsg: {
        color: "#eb1809",
        fontSize: 20,
        textAlign: "center",
        marginLeft: 5,
        marginRight: 5
    },
    forgotPass: {
        textAlign: "center",
        fontSize: 20,
        marginTop: 10
    }
});

export default LoginScreen;