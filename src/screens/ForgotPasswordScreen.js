import React, { useState, useContext} from 'react';
import {View, StyleSheet, TextInput, Text } from 'react-native'
import SubHeading from '../components/SubHeading';
import WelcomeButton from '../components/WelcomeButton';
import { Context as AuthContext } from '../context/AuthContext';
import { NavigationEvents } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';

function validatePass(pass) {
    return pass.length >= 8 
        && (/[a-z]/.test(pass)) // check to ensure pass contains lowercase
        && pass.match(/[A-Z]/)  // check to ensure pass contains uppercase
        && pass.match(/\d/)     // check to ensure pass contains a digit
        && pass.match(/[$|*=(!)[\]_+@.-]/) // check to ensure pass contains special character
        && (!pass.match(/[^a-zA-Z0-9$|*=(!)[\]_+@.-]/)); // check to ensure pass doesn't contain character that is not a special one
}

function validateEmail(mail) {
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail));
}

const ForgotPasswordScreen = ({navigation}) => {
    const {state, forgotPassword, resetPassword, clearErrorMessage} = useContext(AuthContext)
    const [emailOrId, setEmailOrId] = useState('');
    const [resetCode, setResetCode ] = useState('');
    const [newPassword, setNewPassword ] = useState('');
    const [showEmail, setShowEmail] = useState(true);
    const [showPass, setShowPass] = useState(false);
    const [ passErrMsg, setPassErrMsg ] = useState('');
    const [ emailErrMsg, setEmailErrMsg ] = useState('');
    const [confirmPass, setConfirmPass ] = useState('');
        return (
            <ScrollView style={styles.background}>
                <SubHeading 
                    title="Forgot Password"
                />
                <NavigationEvents
                    onWillBlur={clearErrorMessage}
                />
            { showEmail && <View>
            <View style= {styles.textContainer}>
                    <TextInput
                        style={styles.textInput}
                        value={emailOrId}
                        placeholder="Email"
                        onChangeText={(newEmail) => {
                            setEmailOrId(newEmail);
                        }}
                        autoCapitalize="none"
                    />
                    <Text style={styles.errorMsg}>{emailErrMsg}</Text>
            </View>
            <View style={styles.button}>
                <WelcomeButton
                    title="Submit"
                    style={styles.button}
                    onPress={() => {
                            const response = forgotPassword({emailOrId});
                            setShowPass(true);
                            setShowEmail(false);
                        }
                    }
                />
                <WelcomeButton
                    title="Cancel"
                    style={styles.button}
                    onPress={() => navigation.navigate("Login")}
                />
            </View>
            </View>
            }

            { clearErrorMessage && showPass && <View>
                <View style= {styles.textContainer}>
                    <View >
                        <Text style={styles.resetMsg}>If the email entered exists, a reset code has been sent.
                            Please enter the reset code and a new password.
                        </Text>
                    </View>
                <TextInput
                    style={styles.textInput}
                    value={resetCode}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Reset Code"
                    onChangeText={(newResetCode) => setResetCode(newResetCode)}
                />
                <TextInput
                        style={styles.textPassword}
                        value={newPassword}
                        secureTextEntry={true}
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Password"
                        onChangeText={(newPass) => {
                            setNewPassword(newPass);
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
                {state.errorMessage ? <Text style={styles.errorMsg}>{state.errorMessage}</Text> : null}
                <Text style={styles.errorMsg}>{passErrMsg}</Text>
            </View>
            <View style={styles.button}>
                <WelcomeButton
                    title="Submit"
                    style={styles.button}
                    onPress={() => {
                            if (validatePass(newPassword) && newPassword == confirmPass ) {
                                const response = resetPassword({emailOrId, resetCode, newPassword})
                            } else if (newPassword != confirmPass) {
                                setPassErrMsg("Passwords must match");
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

        </ScrollView>
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
        marginTop: 20,
        marginBottom:10
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