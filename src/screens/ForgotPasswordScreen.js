import React, { useState, useContext} from 'react';
import {View, StyleSheet, TextInput, Text } from 'react-native'
import SubHeading from '../components/SubHeading';
import WelcomeButton from '../components/WelcomeButton';
import { Context as AuthContext } from '../context/AuthContext';

function validatePass(pass) {
    return pass.length >= 8 
        && (/[a-z]/.test(pass)) // check to ensure pass contains lowercase
        && pass.match(/[A-Z]/)  // check to ensure pass contains uppercase
        && pass.match(/\d/)     // check to ensure pass contains a digit
        && pass.match(/[$|*=(!)[\]_+@.-]/) // check to ensure pass contains special character
        && (!pass.match(/[^a-zA-Z0-9$|*=(!)[\]_+@.-]/)); // check to ensure pass doesn't contain character that is not a special one
}

const ForgotPasswordScreen = () => {
    const {state, forgotPassword, resetPassword, clearErrorMessage} = useContext(AuthContext)
    const [email, setEmail] = useState('');
    const [pin, setPin ] = useState('');
    const [password, setPassword ] = useState('');
    const [emailErrMsg, setEmailErrMsg ] = useState('');
    const [passErrMsg, setPassErrMsg ] = useState('');
    const [showEmail, setShowEmail] = useState(true);
    const [showPass, setShowPass] = useState(false);
    const [confirmPass, setConfirmPass ] = useState('');
        return (
            <View style={styles.background}>
                <SubHeading 
                    title="Forgot Password"
                />
            { showEmail && <View>
            <View style= {styles.textContainer}>
                    <TextInput
                        style={styles.textInput}
                        value={email}
                        placeholder="Email"
                        onChangeText={(newEmail) => {
                            setEmail(newEmail);
                        }}
                        autoCapitalize="none"
                    />
            </View>
            <View>
                <Text style={styles.errorMsg}>{emailErrMsg}</Text>
            </View>
            <View style={styles.button}>
                <WelcomeButton
                    title="Submit"
                    style={styles.button}
                    onPress={() => {
                            forgotPassword({email});
                            setShowPass(true);
                            setShowEmail(false);
                        }
                    }
                />
                {state.errorMessage ? <Text style={styles.errorMsg}></Text> : <Text></Text>}
            </View>
            </View>
            }

            { showPass && <View>
                <View style= {styles.textContainer}>
                    <View >
                        <Text style={styles.resetMsg}>If the email entered exists, a reset code has been sent.
                            Please enter the reset code and a new password.
                        </Text>
                    </View>
                <TextInput
                    style={styles.textInput}
                    value={pin}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Reset Code"
                    onChangeText={(newPin) => setPin(newPin)}
                />
                <TextInput
                        style={styles.textPassword}
                        value={password}
                        secureTextEntry={true}
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Password"
                        onChangeText={(newPass) => {
                            setPassword(newPass);
                        }}
                    />
                <TextInput
                    style={styles.textPassword}
                    value={confirmPass}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Confirm Password"
                    onChangeText={(newConfirmPass) => {
                        setConfirmPass(newConfirmPass);
                    }}
                />
            </View>
            <View>
                <Text style={styles.errorMsg}>{passErrMsg}</Text>
            </View>
            <View style={styles.button}>
                <WelcomeButton
                    title="Submit"
                    style={styles.button}
                    onPress={() => {
                            if (validatePass(password) && password == confirmPass ) {
                                resetPassword({email, pin, password})
                            }
                        }
                    }
                />
            </View>
            <View style={styles.button}>
                <WelcomeButton
                    title="Cancel"
                    style={styles.button}
                    onPress={() => {
                        setShowPass(false);
                        setShowEmail(true);
                    }}
                />
            </View>
            </View>
            }

        </View>
        );

}

const styles = StyleSheet.create({
    background: {
        backgroundColor: "#fcc203",
        paddingTop: 20,
        flex: 1,
    },
    title: {
        textAlign: "center",
    },
    textInput: {
        backgroundColor: '#ffffff',
        opacity: 95,
        borderRadius: 10,
        height: 30,
        width: "75%",
        alignSelf: "center",
        margin: 15
    },
    textContainer: {
        marginTop: 30,
        textAlign:"center"
    },
    button: {
        alignItems:"center",
        marginTop: 20
    },
    errorMsg: {
        color: "#eb1809",
        fontSize: 20,
        textAlign: "center",
        marginLeft: 5,
        marginRight: 5
    },
    modal: {
        alignItems:"center",
        backgroundColor: "#ffffff",
        flex: 1,
        margin: 15,
    },
    textPassword: {
        backgroundColor: '#ffffff',
        opacity: 95,
        borderRadius: 10,
        height: 30,
        width: "75%",
        alignSelf: "center",
        margin:15
    },
    resetMsg: {
        fontSize: 20,
        textAlign: "center",
        padding: 5
    }
});

export default ForgotPasswordScreen;