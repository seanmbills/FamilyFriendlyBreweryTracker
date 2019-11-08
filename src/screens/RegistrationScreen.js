import React, {useState, useContext, useEffect } from 'react';
import {
    Text,
    StyleSheet,
    View,
    ScrollView,
    KeyboardAvoidingView,
    Button,
    Image
} from 'react-native';

import {NavigationEvents} from 'react-navigation'
import {Context as AuthContext} from '../context/AuthContext'
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'
import {Input} from 'react-native-elements';
import DatePicker from 'react-native-datepicker';

// local imports
import TitleText from '../components/TitleText';
import WelcomeButton from '../components/WelcomeButton';
import {validatePassword, validateEmail} from '../api/InputValidation'
// import EmptyProfilePic from '../../assets/EmptyProfilePic.png'

import BufferPopup from '../components/BufferPopup';

function validateUsername(name) {
    if (name.length < 6 || name.length > 30) {
        return false;
    } 
    if (!name.match(/^[0-9a-zA-Z]+$/)) {
        return false;
    }
    return true
}

function validatePhone(num) {
    return num.length == 10
    && num.match(/^[0-9]*$/g);
} 

function validateZip(num) {
    return num.length == 5
    && num.match(/^[0-9]*$/g);
}

function validateBirthDate(date) {
    const enteredDate = date.split('-');
    const givenYear = parseInt(enteredDate[0]);
    const givenMonth = parseInt(enteredDate[1]);
    const givenDay = parseInt(enteredDate[2]);
    console.log(new Date(givenYear + 21, givenMonth -1 , givenDay))
    return (new Date(givenYear + 21, givenMonth -1 , givenDay) <= new Date());

}

/*
 * Screen essentially is a form component which contains field a user must enter to register for the application
*/
const RegistrationScreen = ({navigation}) => {
    const {state, register, clearErrorMessage} = useContext(AuthContext)

    // state objects for the needed input fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [ birthDate, setBirthDate] = useState('2000-01-01');
    const [username, setUsername] = useState('');
    const [zip, setZip] = useState('');

    // state objects for error messages which are result from incorrectly formatted or invalid field inputs
    const [ inputErrMsg, setInputErrMsg ] = useState('');
    const [ passErrMsg, setPassErrMsg ] = useState('');
    const [ emailErrMsg, setEmailErrMsg ] = useState('');
    const [ phoneErrMsg, setPhoneErrMsg ] = useState('');
    const [ zipErrMsg, setZipErrMsg ] = useState('');
    const [ birthDateErrMsg, setBirthDateErrMsg ] = useState('');
    const [ confirmPass, setConfirmPass ] = useState('');
    const [ profilePic, setProfilePic ] = useState(null)
    const [bufferPopupVisible, setBufferPopupVisible ] = useState('');
    
    function validateInput(inputMap) {
        var isValid = true
        // email, password, username, phone, zip, birthdDate
        if (!validateUsername(inputMap.get('username'))) {
            setInputErrMsg("Username must be between 6-30 characters and " 
            + "can only contain alpanumeric characters.");
            isValid = false;
        } else {
            setInputErrMsg('');
        }
        if (!validatePassword(inputMap.get('password'))) {
            setPassErrMsg("Password must be longer than 8 characters, contain "
                + "one special character, capital letter, and number.");
            isValid = false;
        } else if (inputMap.get('confirmPass') != inputMap.get('password')) {
            setPassErrMsg("Passwords must match.");
            isValid = false;  
        } else {
            setPassErrMsg('');
        }

        if (!validateEmail(inputMap.get('email'))) {
            setEmailErrMsg("Email address provided was not valid.");
            isValid = false;
        } else {
            setEmailErrMsg('');
        }
        if (!validatePhone(inputMap.get('phone'))) {
            setPhoneErrMsg("Phone number provided was not valid.");
            isValid = false;
        } else {
            setPhoneErrMsg('');
        }
        if (!validateZip(inputMap.get('zip'))) {
            setZipErrMsg("Zip code provided was not valid.");
            isValid = false;
        } else {
            setZipErrMsg('');
        }
        if (!validateBirthDate(inputMap.get('birthDate'))) {
            setBirthDateErrMsg("You must be at least 21 years old "
                + "to use this application.");
            isValid = false;
        } else {
            setBirthDateErrMsg('');
        }
        return isValid;
    }


    useEffect(() => {
        getPermissionAsync()
    }, [])
    
    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            base64: true,
            quality: 1.0
        });
        
        if (!result.cancelled) {
            setProfilePic(result)
        }
    };

    
    return (

        <KeyboardAvoidingView behavior="padding">
            <ScrollView keyboardDismissMode='on-drag' style={styles.background}>
                <NavigationEvents 
                    onWillBlur={clearErrorMessage}
                />
                <View style={styles.topSpan}/>
                <TitleText title="Registration"/>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Button
                        title="Pick an image from camera roll"
                        onPress={this._pickImage}
                    />
                    {   
                        !profilePic && 
                        <Image source={require('../../assets/EmptyProfilePic.png')} style={{width: 200, height: 200}} />
                    }  
                    { 
                        profilePic &&
                        <Image source={{ uri: profilePic.uri }} style={{ width: 200, height: 200 }} />
                    }
                </View>

                <View style={styles.formElement}>
                    <Input
                        value={email}
                        labelStyle={{color: 'black', fontSize: 20}}
                        label='Email'
                        placeholder='Email'
                        placeholderTextColor="#262626"
                        leftIcon={{type: 'font-awesome', name: 'envelope'}}
                        leftIconContainerStyle={{paddingRight: 8}}
                        inputContainerStyle={{borderBottomColor: 'black'}}
                        autoCapitalize="none"
                        onChangeText={(newEmail) => {
                            setEmail(newEmail);
                        }}
                        errorStyle={{color: 'red'}}
                        errorMessage={emailErrMsg}
                    />
                </View>
                <View style={styles.formElement}>
                    <Input
                        value={username}
                        labelStyle={{color: 'black', fontSize: 20}}
                        label='Username'
                        placeholder='Username'
                        placeholderTextColor="#262626"
                        leftIcon={{type: 'font-awesome', name: 'user'}}
                        leftIconContainerStyle={{paddingRight: 8}}
                        inputContainerStyle={{borderBottomColor: 'black'}}
                        autoCapitalize="none"
                        onChangeText={(newUsername) => {
                            setUsername(newUsername);
                        }}
                        errorStyle={{color: 'red'}}
                        errorMessage={inputErrMsg}
                    />
                </View>
                <View style={styles.formElement}>
                    <Input
                        value={password}
                        labelStyle={{color: 'black', fontSize: 20}}
                        label='Password'
                        placeholder='Password'
                        placeholderTextColor="#262626"
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
                <View style={styles.formElement}>
                    <Input
                        value={confirmPass}
                        labelStyle={{color: 'black', fontSize: 20}}
                        label='Confirm Password'
                        placeholder='Password'
                        placeholderTextColor="#262626"
                        leftIcon={{type: 'font-awesome', name: 'lock'}}
                        leftIconContainerStyle={{paddingRight: 8}}
                        inputContainerStyle={{borderBottomColor: 'black'}}
                        secureTextEntry={true}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(newPass) => {
                            setConfirmPass(newPass);
                        }}
                        errorStyle={{color: 'red'}}
                        errorMessage={passErrMsg}
                    />
                </View>
                <View style={styles.formElement}>
                    <Input
                        value={firstName}
                        labelStyle={{color: 'black', fontSize: 20}}
                        label='First Name'
                        placeholder='First Name'
                        placeholderTextColor="#262626"
                        leftIcon={{type: 'font-awesome', name: 'id-badge'}}
                        leftIconContainerStyle={{paddingRight: 8}}
                        inputContainerStyle={{borderBottomColor: 'black'}}
                        onChangeText={(newName) => {
                            setFirstName(newName);
                        }}
                    />
                </View>
                <View style={styles.formElement}>
                    <Input
                        value={lastName}
                        labelStyle={{color: 'black', fontSize: 20}}
                        label='Last Name'
                        placeholder='Last Name'
                        placeholderTextColor="#262626"
                        leftIcon={{type: 'font-awesome', name: 'id-badge'}}
                        leftIconContainerStyle={{paddingRight: 8}}
                        inputContainerStyle={{borderBottomColor: 'black'}}
                        onChangeText={(newName) => {
                            setLastName(newName);
                        }}
                    />
                </View>
                <View style={styles.formElement}>
                    <Input
                        value={zip}
                        keyboardType="number-pad"
                        labelStyle={{color: 'black', fontSize: 20}}
                        label='Zip Code'
                        placeholder='Zip Code'
                        placeholderTextColor="#262626"
                        leftIcon={{type: 'font-awesome', name: 'map-marker'}}
                        leftIconContainerStyle={{paddingRight: 8}}
                        inputContainerStyle={{borderBottomColor: 'black'}}
                        onChangeText={(newZip) => {
                            setZip(newZip);
                        }}
                        errorStyle={{color: 'red'}}
                        errorMessage={zipErrMsg}
                    />
                </View>
                <View style={styles.formElement}>
                    <Input
                        value={phone}
                        keyboardType="number-pad"
                        labelStyle={{color: 'black', fontSize: 20}}
                        label='Phone Number'
                        placeholder='XXX-XXX-XXXX'
                        placeholderTextColor="#262626"
                        leftIcon={{type: 'font-awesome', name: 'phone'}}
                        leftIconContainerStyle={{paddingRight: 8}}
                        inputContainerStyle={{borderBottomColor: 'black'}}
                        onChangeText={ (newPhone)=> {
                            setPhone(newPhone);
                        }} 
                        errorStyle={{color: 'red'}}
                        errorMessage={phoneErrMsg}
                    />
                </View>
                <View style={styles.formElement}>
                    <Text style={styles.formLabel}>Birth Date</Text>
                    <DatePicker
                        style={styles.datePicker}
                        mode="date"
                        format="YYYY-MM-DD"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        minDate="1900-01-01"
                        maximumDate="2019-01-01"
                        date={birthDate}
                        onDateChange={(newDate) => {
                            setBirthDate(newDate)
                        }}
                    />
                </View>
                <View>
                    <Text style={styles.errorMsg}>{birthDateErrMsg}</Text>
                </View>
                {state.errorMessage ? <Text style={styles.errorMsg}>{state.errorMessage}</Text> : null}
                <View style={styles.buttonContainer}>
                    <WelcomeButton
                        title="Register"
                        onPress={ async () => {
                            //Create map object to pass to input validation function
                            const inputMap = new Map();
                            inputMap.set('email', email);
                            inputMap.set('password', password);
                            inputMap.set('username', username);
                            inputMap.set('phone', phone);
                            inputMap.set('zip', zip);
                            inputMap.set('birthDate', birthDate);
                            inputMap.set('confirmPass', confirmPass);

                            //Check the input & set error messages if somthing is wrong
                            if(validateInput(inputMap)) {
                                const userId = username;
                                const phoneNumber = phone;
                                const zipCode = zip;

                                setBufferPopupVisible(true);

                                var response = await register({email, userId, 
                                    password, birthDate, firstName, lastName,
                                    phoneNumber, zipCode, profilePic});
                                setBufferPopupVisible(false);
                                if (!response || response.status >= 400) {
                                    console.log("Error when registering");
                                } else {
                                    navigation.navigate('BreweryList');
                                }
                            } else {
                                console.log("Input was not valid");
                            }
                        }}
                    />
                </View>
                <View style={styles.bottomButtonContainer}>
                    <WelcomeButton
                        title="Back"
                        onPress={ () => {
                            navigation.navigate("Welcome");
                        }}
                    />
                </View>
            </ScrollView>
            {/* Buffer popup will be displayed while user is waiting for registration response from backend */}
            <BufferPopup 
                isVisible={bufferPopupVisible}
                text={"Registering"}
                />
        </KeyboardAvoidingView>
    );
};

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
    formLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
        flexDirection: 'column',
        alignSelf: 'flex-start',
        marginBottom: 5,
        marginLeft: 10
    },
    buttonContainer: {
        alignItems: "center",
    },
    bottomButtonContainer: {
        alignItems: "center",
        marginBottom: 60
    },
    datePicker: {
        backgroundColor: "#ffffff"
    },
    errorMsg: {
        color: "red",
        fontSize: 12,
        marginLeft: 15
    }
    
});
export default RegistrationScreen;