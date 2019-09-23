import React, {useState, useContext } from 'react';
import { Text, StyleSheet, View, ScrollView, TextInput, KeyboardAvoidingView} from 'react-native';
import TitleText from '../components/TitleText';
import PhoneInput from 'react-native-phone-input';
import WelcomeButton from '../components/WelcomeButton';
import DatePicker from 'react-native-datepicker';
import {NavigationEvents} from 'react-navigation'
import {Context as AuthContext} from '../context/AuthContext'

function validateUsername(name) {
    if (name.length < 6 || name.length > 30) {
        return false;
    } 
    if (!name.match(/^[0-9a-zA-Z]+$/)) {
        return false;
    }
    return true
}

function validatePassword(pass) {
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

const RegistrationScreen = ({navigation}) => {
    const {state, register, clearErrorMessage} = useContext(AuthContext)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [ birthDate, setBirthDate] = useState('2000-01-01');
    const [username, setUsername] = useState('');
    const [zip, setZip] = useState('');
    const [ inputErrMsg, setInputErrMsg ] = useState('');
    const [ passErrMsg, setPassErrMsg ] = useState('');
    const [ emailErrMsg, setEmailErrMsg ] = useState('');
    const [ phoneErrMsg, setPhoneErrMsg ] = useState('');
    const [ zipErrMsg, setZipErrMsg ] = useState('');
    const [ birthDateErrMsg, setBirthDateErrMsg ] = useState('');
    const [ confirmPass, setConfirmPass ] = useState('');
    
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
                + "one special character, capital letter, and number");
            isValid = false;
        } else if (inputMap.get('confirmPass') != inputMap.get('password')) {
            setPassErrMsg("Passwords must match.");
            isValid = false;  
        } else {
            setPassErrMsg('');
        }

        if (!validateEmail(inputMap.get('email'))) {
            setEmailErrMsg("Email address provided was not valid");
            isValid = false;
        } else {
            setEmailErrMsg('');
        }
        if (!validatePhone(inputMap.get('phone'))) {
            setPhoneErrMsg("Phone number provided was not valid");
            isValid = false;
        } else {
            setPhoneErrMsg('');
        }
        if (!validateZip(inputMap.get('zip'))) {
            setZipErrMsg("Zip code provided was not valid");
            isValid = false;
        } else {
            setZipErrMsg('');
        }
        if (!validateBirthDate(inputMap.get('birthDate'))) {
            setBirthDateErrMsg("You must be at least 21 years old "
                + "to use this application");
            isValid = false;
        } else {
            setBirthDateErrMsg('');
        }
        return isValid;
    }
    
    return (
        <ScrollView style={styles.background}>
            <NavigationEvents 
                onWillBlur={clearErrorMessage}
            />
            <View style={styles.topSpan}/>
            <TitleText title="Registration"/>
            <View style={styles.formElement}>
                <Text style={styles.formLabel}>Email:</Text>
                <View style= {styles.textContainer}>
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
                <View>
                    <Text style={styles.errorMsg}>{emailErrMsg}</Text>
                </View>
            </View>
            <View style={styles.formElement}>
                <Text style={styles.formLabel}>Username:</Text>
                <View style= {styles.textContainer}>
                    <TextInput
                        style={styles.textInput}
                        value={username}
                        placeholder="username"
                        autoCapitalize="none"
                        onChangeText={(newUsername) => {
                            setUsername(newUsername);
                        }}
                    />
                </View>
                <View>
                    <Text style={styles.errorMsg}>{inputErrMsg}</Text>
                </View>
            </View>
            <View style={styles.formElement}>
                <Text style={styles.formLabel}>Password:</Text>
                <View style= {styles.textContainer}>
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
            </View>
            <View style={styles.formElement}>
                <Text style={styles.formLabel}>Confirm Password:</Text>
                <View style= {styles.textContainer}>
                    <TextInput
                        style={styles.textPassword}
                        value={confirmPass}
                        secureTextEntry={true}
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="password"
                        onChangeText={(newPass) => {
                            setConfirmPass(newPass);
                        }}
                    />
                </View>
                <View>
                    <Text style={styles.errorMsg}>{passErrMsg}</Text>
                </View>
            </View>
            <View style={styles.formElement}>
                <Text style={styles.formLabel}>First Name:</Text>
                <View style= {styles.textContainer}>
                    <TextInput
                        style={styles.textInput}
                        value={firstName}
                        placeholder="First Name"
                        onChangeText={(newName) => {
                            setFirstName(newName);
                        }}
                    />
                </View>
            </View>
            <View style={styles.formElement}>
                <Text style={styles.formLabel}>Last Name:</Text>
                <View style= {styles.textContainer}>
                    <TextInput
                        style={styles.textInput}
                        value={lastName}
                        placeholder="Last Name"
                        onChangeText={(newName) => {
                            setLastName(newName)
                        }}
                    />
                </View>
            </View>
            <View style={styles.formElement}>
                <Text style={styles.formLabel}>Zip Code:</Text>
                <View style= {styles.textContainer}>
                    <TextInput
                        keyboardType="number-pad"
                        style={styles.textInput}
                        value={zip}
                        placeholder="zip code"
                        onChangeText={(newZip) => {
                            setZip(newZip);
                        }}
                    />
                </View>
                <View>
                    <Text style={styles.errorMsg}>{zipErrMsg}</Text>
                </View>
            </View>
            <View style={styles.formElement}>
                <Text style={styles.formLabel}>Phone Number:</Text>
                <View style= {styles.textContainer}>
                    <PhoneInput
                        placeholder="Enter phone number"
                        value={phone}
                        onChangePhoneNumber={ (newPhone)=> {
                            setPhone(newPhone);
                        }}
                        style={styles.textInput}   
                    />
                </View>
                <View>
                    <Text style={styles.errorMsg}>{phoneErrMsg}</Text>
                </View>
            </View>
            <View style={styles.datePicker}>
                <Text style={styles.formLabel}>Birth Date:</Text>
                <DatePicker
                    style={{backgroundColor: "#ffffff"}}
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
                <View>
                    <Text style={styles.errorMsg}>{birthDateErrMsg}</Text>
                </View>
            </View>
            {state.errorMessage ? <Text style={styles.errorMsg}>{state.errorMessage}</Text> : null}
            <View style={styles.buttonContainer}>
                <WelcomeButton
                    title="Register"
                    onPress={() => {
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
                            register({email, userId, 
                                password, birthDate, firstName, lastName,
                                phoneNumber, zipCode });
                        } else {
                            console.log("Input was not valid");
                        }
                    }}
                />
            </View>
            <View style={styles.buttonContainer}>
                <WelcomeButton
                    title="Back"
                    onPress={ () => {
                        navigation.navigate("Welcome");
                    }}
                />
            </View>
        </ScrollView>
    );
};
/*
    email
    password
    birthDate: YYYY-MM-DDT00:00:00.000+00:00
    firstName:
    lastName:
    phoneNumber:
    zipCode:
*/
const styles = StyleSheet.create({
    background: {
        backgroundColor: "#fcc203",
        paddingTop: 20
    },
    formElement: {
        marginTop: 20,
        marginBottom: 20
    },
    formLabel: {
        fontSize: 20,
        textAlign: 'left',
        flexDirection: 'column',
        alignSelf: 'flex-start',
        marginLeft: 10,

    },
    textInput: {
        backgroundColor: '#ffffff',
        opacity: 95,
        borderRadius: 10,
        height: 30,
        width: "75%",
    },
    textPassword: {
        backgroundColor: '#ffffff',
        opacity: 95,
        borderRadius: 10,
        height: 30,
        width: "75%"
    },
    textContainer: {
        alignItems: 'center'
    },
    buttonContainer: {
        alignItems: "center",
        marginTop: 20,
        marginBottom: 20
    },
    datePicker: {
        alignItems: "center",
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
export default RegistrationScreen;