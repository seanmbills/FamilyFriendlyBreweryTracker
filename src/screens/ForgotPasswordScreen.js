import React, { useState } from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native'
import SubHeading from '../components/SubHeading';
import WelcomeButton from '../components/WelcomeButton';
const ForgotPasswordScreen = () => {
    const [pin, setPin ] = useState('');
    const [password, setPassword ] = useState('');
    const [pinErrMsg, setPinErrMsg ] = useState('');
    const [passErrMsg, setPassErrMsg ] = useState('');
    const [showPin, setShowPin] = useState(true);
    const [showPass, setShowPass] = useState(false);
    if (showPin) {
        return (
            <View style={styles.background}>
                <SubHeading 
                    title="Forgot Password"
                />
            <View style= {styles.textContainer}>
                <TextInput
                    style={styles.textInput}
                    value={pin}
                    placeholder="Pin Code"
                    onChangeText={(newPin) => {
                        setPin(newPin);
                    }}
                    maxLength={16}
                    autoCapitalize="none"
                />
            </View>
            <View>
                <Text style={styles.errorMsg}>{pinErrMsg}</Text>
            </View>
            <View style={styles.button}>
                <WelcomeButton
                    title="Submit"
                    style={styles.button}
                    onPress={() => 
                        setShowPin(false)
                    }
                />
            </View>
            
        </View>
        );
    }
    else if (showPass) {
        return (
            <View style={styles.background}>
                <SubHeading 
                    title="Forgot Password"
                />
            <View style= {styles.textContainer}>
                <TextInput
                    style={styles.textInput}
                    value={password}
                    placeholder="New Password"
                    onChangeText={(newPass) => {
                        setPassword(newPass)
                    }}
                    autoCapitalize="none"
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
                        setShowPin(false)
                        }
                    }
                />
            </View>
            
        </View>
        );
    }
    else{
        return <View><SubHeading title="Error"/></View>;
    }

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
    },
    textContainer: {
        marginTop: 30
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
    }
});

export default ForgotPasswordScreen;