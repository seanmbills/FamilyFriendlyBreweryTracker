// React native imports
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import { TextInput, TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import PhoneInput from 'react-native-phone-input';

// Local imports
import WelcomeButton from '../components/WelcomeButton';
import ZipTextField from '../components/ZipTextField';
import PasswordField from '../components/PasswordField';
import { validatePassword, validateEmail } from '../api/InputValidation';

/* 
 * Screen will allow user to update account information. This includes: email, phoneNumber, password, zipcode
 */
const UpdateAccountScreen = ({navigation}) => {
    const {state, userUpdate, updatePassword, updateEmail, updatePhone,
        clearErrorMessage} = useContext(AuthContext);
    
    // Form state objects used for input
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ zipCode, setZipCode ] = useState('');
    const [ newPhone, setNewPhone ] = useState('');
    const [ oldPassword, setOldPassword ] = useState('');
    const [ newPassword, setNewPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    
    // state object indicates if a user's password does not conform to valid format
    const [ passErrMsg, setPassErrMsg ] = useState('');


     // state object indicates if a password is needed to update a particular user account field
    const [ needPassword, setNeedPassword ] = useState(false);

    // state objects which indicate which fields are visible for when a user is updating an account
    const [ changePass, setChangePass ] = useState(false);
    const [ changePhone, setChangePhone ] = useState(false);
    const [ changeEmail, setChangeEmail ] = useState(false);
    const [ newEmail, setNewEmail ] = useState('');

    //state object which indicates if popup buffer should be displayed
    const [ showDialog, setShowDialog ] = useState(false);
    //state object which dictates the text to be displayed at bottom of buffer dialog box
    const [ bufferText, setBufferText ] = useState('');

    return ( 
        <ScrollView style={styles.background}>
            <Text style={styles.title}>Update Account</Text>
        { /* a password isn't needed to update zipcode or first and last name */
            !needPassword && 
        <View>
            <View style={styles.fieldContainer}>
                <Text style={styles.inputTitle}>Zip Code</Text>
                <ZipTextField
                    value={zipCode}
                    onChangeText={(newZip) => setZipCode(newZip)}
                />
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.inputTitle}>First Name</Text>
                <TextInput
                    value={firstName}
                    onChangeText={(newFirst) => setFirstName(newFirst)}
                    style={styles.input}
                    placeholder="first name"
                />
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.inputTitle}>Last Name</Text>
                <TextInput
                    value={lastName}
                    onChangeText={(newLast) => setLastName(newLast)}
                    style={styles.input}
                    placeholder="last name"
                />
            </View>
            <View style={styles.fieldContainer}>
                <TouchableOpacity onPress={()=> {
                    // A password is needed to update email addresses
                    setNeedPassword(true);
                    setChangeEmail(true);
                }} >
                    <Text style={styles.needPassLink}>Update Email Address</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.fieldContainer}>
                <TouchableOpacity onPress={()=> {
                    // a password is needed to update a phone number
                    setNeedPassword(true);
                    setChangePhone(true);
                }} >
                    <Text style={styles.needPassLink}>Update Phone Number</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.fieldContainer}>
                <TouchableOpacity onPress={()=> {
                    // a password is needed to update a password
                    setNeedPassword(true)
                    setChangePass(true);
                }}
                >
                    <Text style={styles.needPassLink}>Update Password</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <WelcomeButton
                    title="Submit"
                    onPress={ async ()=> {
                        
                        //Set dialog text and make it visible
                        setBufferText("Updating Account")
                        setShowDialog(true);

                        //Make request to backend to update account
                        var response = await userUpdate({firstName, lastName, zipCode})

                        //set dialog to no longer be visible
                        setShowDialog(false);
                    }}
                />
            </View>
        </View> }
        { /* if a user wants to update his/her email, display a new email field and a confirm password field */
            needPassword && changeEmail && 
        <View>
            <View style={styles.fieldContainer}>
                <Text style={styles.inputTitle}>Confirm Password</Text>
                <PasswordField
                    value={oldPassword}
                    onChangeText={(newOldPass) => setOldPassword(newOldPass)}
                />
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.inputTitle}>New Email Address</Text>
                <TextInput
                    value={newEmail}
                    onChangeText={(newAddress) => setNewEmail(newAddress)}
                    style={styles.input}
                    placeholder="last name"
                    autoCapitalize="none"
                />
            </View>
            <View style={styles.buttonContainer}>
                <WelcomeButton
                    title="Submit"
                    onPress={()=> {
                        if (validateEmail(newEmail) && oldPassword.length > 8) {
                            password = oldPassword;
                            updateEmail({newEmail, password});
                        }
                    }}
                />
            </View>
        </View>
        }
        { /* if a user wants to update his/her password, display a new password field and a confirm password field */
            needPassword && changePass && 
        <View>  
            <View style={styles.fieldContainer}>
                <Text style={styles.inputTitle}>Old Password</Text>
                <PasswordField
                    value={oldPassword}
                    onChangeText={(newOldPass) => setOldPassword(newOldPass)}
                />
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.inputTitle}>New Password</Text> 
                <PasswordField
                    value={newPassword}
                    onChangeText={(newPass) => setNewPassword(newPass)}
                />
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.inputTitle}>Confirm New Password</Text> 
                <PasswordField
                    value={confirmPassword}
                    onChangeText={(newPass) => setConfirmPassword(newPass)}
                />
            </View>
            <View>
                <Text style={styles.errMsg}>{passErrMsg}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <WelcomeButton
                    title="Submit"
                    onPress={async ()=> {
                        if (validatePassword(newPassword) && newPassword === confirmPassword) {
                            //Set dialog text and make it visible
                            setBufferText("Updating Password")
                            setShowDialog(true);

                            var response = await updatePassword({oldPassword, newPassword})

                            //Set dialog to no longer be visible
                            setShowDialog(false);
                        } else {
                            setPassErrMsg("Passwords must match!");
                        }
                    }}
                />
            </View>
        </View> }
        { /* if a user wants to update his/her phone number, display a new phonenumber field and a confirm password field */
            needPassword && changePhone &&
        <View>
            <View style={styles.fieldContainer}>
                <Text style={styles.inputTitle}>Confirm Password</Text>
                <PasswordField
                    value={oldPassword}
                    onChangeText={(newOldPass) => setOldPassword(newOldPass)}
                />
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.inputTitle}>New Phone #</Text>
                <PhoneInput
                        placeholder="Enter phone number"
                        value={newPhone}
                        onChangePhoneNumber={ (newNumber)=> {
                            setNewPhone(newNumber);
                        }}
                        style={styles.input}   
                    />
            </View>
            <View style={styles.buttonContainer}>
                <WelcomeButton
                    title="Submit"
                    onPress={ async ()=> {
                        if (newPhone.length >= 10) {
                            password = oldPassword;
                            
                            //Set dialog text and make it visible
                            setBufferText("Updating Phone Number")
                            setShowDialog(true);

                            var response = await updatePhone({password, newPhone});

                            //Set dialog to no longer be visible
                            setShowDialog(false);
                        }
                    }}
                />
            </View>
        </View>}
        
        { needPassword &&
        <View style={styles.buttonContainer}>
            <WelcomeButton
                onPress={()=> {
                    setNeedPassword(false);
                    setChangePass(false);
                    setChangePhone(false);
                    setChangeEmail(false);
                }}
                title="Cancel"
            />
        </View>
        }
        { !needPassword &&
        <View style={styles.buttonContainer}>
                <WelcomeButton
                    onPress={()=> {
                        setNeedPassword(false);
                        setChangePass(false);
                        setChangePhone(false);
                        setChangeEmail(false);
                        navigation.navigate('BreweryList');
                    }}
                    title="Cancel"
                />
            </View>
        }
        {state.errorMessage ? <Text style={styles.errorMsg}>{state.errorMessage}</Text> : null}

        <BufferPopup isVisible={showDialog} text={bufferText}/>
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    background: {
        backgroundColor: "#fcc203",
        flex: 1,
    },
    title: {
        fontSize: 40,
        textAlign: "center",
        marginTop: 20
    },
    fieldContainer: {
        margin: 5,
        padding: 5,
        alignSelf: "center",

    },
    inputTitle: {
        fontSize: 20,
        textAlign: "center",
        alignSelf: "center",
        padding: 5
    },
    input: {
        textAlign: "center",
        padding: 5,
        margin:5,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        width: 200
    },
    buttonContainer: {
        alignItems: "center"
    },
    needPassLink: {
        fontSize: 20,
        fontWeight: "bold"
    },
    errMsg: {
        color: "#eb1809",
        fontSize: 20,
        textAlign: "center",
        marginLeft: 5,
        marginRight: 5
    }
});

export default UpdateAccountScreen;