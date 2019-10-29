import React, { useState, useContext } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import {NavigationEvents} from 'react-navigation'
import TitleText from '../components/TitleText';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import WelcomeButton from '../components/WelcomeButton';
import {Context as AuthContext} from '../context/AuthContext'
import {Input} from 'react-native-elements';

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
        <ScrollView keyboardDismissMode='on-drag' style={styles.background}>
            <NavigationEvents 
                onWillBlur={clearErrorMessage}
            />
            <View style={styles.topSpan}/>
            <TitleText
                title="Login"
            />
            <View style={styles.formElement}> 
                <Input
                    value={email}
                    labelStyle={{color: 'black', fontSize: 20}}
                    label='Email'
                    placeholder='Email'
                    leftIcon={{type: 'font-awesome', name: 'envelope'}}
                    leftIconContainerStyle={{paddingRight: 8}}
                    inputContainerStyle={{borderBottomColor: 'black'}}
                    autoCapitalize="none"
                    onChangeText={(newEmail) => {
                        setEmail(newEmail);
                    }}
                />
            </View>
            <View style={styles.formElement}>
                <Input
                    value={password}
                    labelStyle={{color: 'black', fontSize: 20}}
                    label='Password'
                    placeholder='Password'
                    leftIcon={{type: 'font-awesome', name: 'lock'}}
                    leftIconContainerStyle={{paddingRight: 8}}
                    inputContainerStyle={{borderBottomColor: 'black'}}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(newPass) => {
                        setPassword(newPass);
                    }}
                />
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
        paddingTop: 40
    },
    formElement: {
        marginTop: 20,
        marginBottom: 20,
        alignItems: 'center'
    },
    buttonContainer: {
        alignItems: "center"
    },
    forgotPassword: {
        marginTop: 10,
        alignSelf: "center",
        textAlign: "center",
        fontSize: 12
    },
    errorMsg: {
        color: "red",
        fontSize: 12,
        marginLeft: 15
    },
    forgotPass: {
        textAlign: "center",
        fontSize: 20,
        marginTop: 10
    }
});

export default LoginScreen;