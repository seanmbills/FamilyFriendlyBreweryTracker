// React native imports
import React, {useState, useContext} from 'react';
import {View, StyleSheet, Text, KeyboardAvoidingView} from 'react-native'
import {Context as AuthContext} from '../context/AuthContext';
import {NavigationEvents} from 'react-navigation';
import {ScrollView} from 'react-native-gesture-handler';
import {Input} from 'react-native-elements';

// Local imports
import WelcomeButton from '../components/WelcomeButton';
import {validatePassword} from '../api/InputValidation';
import SubHeading from '../components/SubHeading';


// NOTE: Had trouble adding KeyboardAvoidingView to this screen but consider trying to add
// again in the future

/*
 * Screen will allow user to reset his/her password by first entering an email address, 
 * and then entering a code (sent to his/her email) in conjunction with a new password. 
 * The use of this code ensures user authenticity. 
 */
const ForgotPasswordScreen = ({navigation}) => {
    const {state, forgotPassword, resetPassword, clearErrorMessage} = useContext(AuthContext)

    // State objects relating to inputs required for reset process
    const [emailOrId, setEmailOrId] = useState('');
    const [resetCode, setResetCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    // State objects which control what fields are displayed to the user
    const [showEmail, setShowEmail] = useState(true);
    const [showPass, setShowPass] = useState(false);

    // Error messages set by frontend for incorrect/invalid password and email inputs
    const [passErrMsg, setPassErrMsg] = useState('');
    const [emailErrMsg, setEmailErrMsg] = useState('');
    
        return (
            <ScrollView keyboardDismissMode='on-drag' style={styles.background}>
                <NavigationEvents
                    onWillBlur={clearErrorMessage}
                />
                <SubHeading 
                    title="Forgot Password"
                />
                { /* A user must first enter his or her email before proceeding to the next steps of the reset process.
                    So first, only an email field is presented to the user
                  */
                    showEmail && <View>
                <View style= {styles.formElement}>
                    <Input
                        value={emailOrId}
                        labelStyle={{color: 'black', fontSize: 20}}
                        label='Email/Username'
                        placeholder='Email or Username'
                        placeholderTextColor="#262626"
                        leftIcon={{type: 'font-awesome', name: 'envelope'}}
                        leftIconContainerStyle={{paddingRight: 8}}
                        inputContainerStyle={{borderBottomColor: 'black'}}
                        autoCapitalize="none"
                        onChangeText={(newEmail) => {
                            setEmailOrId(newEmail);
                        }}
                        errorStyle={{color: 'red'}}
                        errorMessage={emailErrMsg}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <WelcomeButton
                        title="Submit"
                        style={styles.button}
                        onPress={() => {
                            forgotPassword({emailOrId});
                            setShowPass(true);
                            setShowEmail(false);
                        }}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <WelcomeButton
                        title="Cancel"
                        style={styles.button}
                        onPress={() => navigation.navigate("Login")}
                    />
                </View>
                </View>
                }
                {state.errorMessage ? <Text style={styles.errorMsg}>{state.errorMessage}</Text> : null}
                { /* After the user enters an email,  passcode, password, and confirm password fields are displayed to them.
                   * The frontend does not query the database at all to check if the email entered was a valid email before
                   * moving on to the next steps. This is done so potential attackers cannot enumerate users in our system
                   */
                    showPass && <View>
                    <View>
                        <Text style={styles.resetMsg}>If the email entered exists, a reset code has been sent.
                            Please enter the reset code and a new password.
                        </Text>
                    <View style={styles.formElement}>
                        <Input
                            value={resetCode}
                            labelStyle={{color: 'black', fontSize: 20}}
                            label='Reset Code'
                            placeholder='Reset Code'
                            placeholderTextColor="#262626"
                            leftIcon={{type: 'font-awesome', name: 'key'}}
                            leftIconContainerStyle={{paddingRight: 8}}
                            inputContainerStyle={{borderBottomColor: 'black'}}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={(newResetCode) => {
                                setResetCode(newResetCode);
                            }}
                        />
                    </View>
                    <View style={styles.formElement}>
                        <Input
                            value={newPassword}
                            labelStyle={{color: 'black', fontSize: 20}}
                            label='New Password'
                            placeholder='New Password'
                            placeholderTextColor="#262626"
                            leftIcon={{type: 'font-awesome', name: 'lock'}}
                            leftIconContainerStyle={{paddingRight: 8}}
                            inputContainerStyle={{borderBottomColor: 'black'}}
                            secureTextEntry={true}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={(newPass) => {
                                setNewPassword(newPass);
                            }}
                        />
                    </View>
                    <View style={styles.formElement}>
                        <Input
                            value={confirmPass}
                            labelStyle={{color: 'black', fontSize: 20}}
                            label='Confirm Password'
                            placeholder='Confirm Password'
                            placeholderTextColor="#262626"
                            leftIcon={{type: 'font-awesome', name: 'lock'}}
                            leftIconContainerStyle={{paddingRight: 8}}
                            inputContainerStyle={{borderBottomColor: 'black'}}
                            secureTextEntry={true}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={(newConfirmPass) => {
                                setConfirmPass(newConfirmPass);
                            }}
                        />
                    </View>
                    <Text style={styles.errorMsg}>{passErrMsg}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <WelcomeButton
                        title="Submit"
                        onPress={() => {
                                if (validatePassword(newPassword) && newPassword == confirmPass ) {
                                    resetPassword({emailOrId, resetCode, newPassword})
                                } else if (newPassword != confirmPass) {
                                    setPassErrMsg("Passwords must match.");
                                } else {
                                    setPassErrMsg("Password must be longer than 8 characters, contain "
                                    + "one special character, capital letter, and number.");
                                }
                            }
                        }
                    />
                </View>
                <View style={styles.bottomButtonContainer}>
                    <WelcomeButton
                        title="Back"
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
        paddingTop: 45,
        flex: 1,
    },
    title: {
        textAlign: "center",
    },
    formElement: {
        marginTop: 20,
        marginBottom: 20,
        alignItems: 'center'
    },
    buttonContainer: {
        alignItems: "center"
    },
    bottomButtonContainer: {
        alignItems: "center",
        marginBottom: 90
    },
    textContainer: {
        marginTop: 30,
        textAlign:"center"
    },
    errorMsg: {
        color: "red",
        fontSize: 12,
        marginLeft: 15
    },
    modal: {
        alignItems:"center",
        backgroundColor: "#ffffff",
        flex: 1,
        margin: 15,
    },
    resetMsg: {
        fontSize: 20,
        textAlign: "center",
        padding: 5
    }
});

export default ForgotPasswordScreen;