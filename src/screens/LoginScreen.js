// React native imports
import React, { useState, useContext } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import {NavigationEvents} from 'react-navigation'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {Context as AuthContext} from '../context/AuthContext'
import {Input} from 'react-native-elements';

// Local imports
import TitleText from '../components/TitleText';
import WelcomeButton from '../components/WelcomeButton';
import BufferPopup from '../components/BufferPopup';

/*
 * Screen contains a form which allows a user to login using his/her username/email and password
 * It also contains a link to another screen which will allow a user to reset his/her password
 */
const LoginScreen = ({navigation}) => {
    const {state, signin, clearErrorMessage} = useContext(AuthContext)

    // State objecst for email/username and password input fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [bufferPopupVisible, setBufferPopupVisible] = useState(false);

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
                    label='Email/Username'
                    placeholder='Email or Username'
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
                        const emailOrId = email;
                        setBufferPopupVisible(true);
                        var response = await signin({emailOrId, password})
                        setBufferPopupVisible(false);
                        if (!response || response.status >= 400) {
                            console.log("Login error")
                        } else {
                            navigation.navigate("BreweryList");
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

            {/* Buffer popup will be displayed while user is waiting for login response from backend */}
            <BufferPopup 
                isVisible={bufferPopupVisible}
                text={"Logging in"}
                />
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
