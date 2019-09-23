import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import WelcomeButton from '../components/WelcomeButton';
import ZipTextField from '../components/ZipTextField';
import { Context as AuthContext } from '../context/AuthContext';
import { TextInput, TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import PasswordField from '../components/PasswordField';
import { validatePassword, validateEmail } from '../api/InputValidation';
import PhoneInput from 'react-native-phone-input';

const UpdateAccountScreen = ({navigation}) => {
    const {state, userUpdate, updatePassword, updateEmail, updatePhone,
        clearErrorMessage} = useContext(AuthContext);
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ zipCode, setZipCode ] = useState('');
    const [ newPhone, setNewPhone ] = useState('');
    const [ needPassword, setNeedPassword ] = useState(false);
    const [ oldPassword, setOldPassword ] = useState('');
    const [ newPassword, setNewPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ changePass, setChangePass ] = useState(false);
    const [ changePhone, setChangePhone ] = useState(false);
    const [ changeEmail, setChangeEmail ] = useState(false);
    const [ newEmail, setNewEmail ] = useState('');
    const [ passErrMsg, setPassErrMsg ] = useState('');

    return ( 
        <ScrollView style={styles.background}>
            <Text style={styles.title}>Update Account</Text>
        { !needPassword && 
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
                    setNeedPassword(true);
                    setChangeEmail(true);
                }} >
                    <Text style={styles.needPassLink}>Update Email Address</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.fieldContainer}>
                <TouchableOpacity onPress={()=> {
                    setNeedPassword(true);
                    setChangePhone(true);
                }} >
                    <Text style={styles.needPassLink}>Update Phone Number</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.fieldContainer}>
                <TouchableOpacity onPress={()=> {
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
                    onPress={()=> userUpdate({firstName, lastName, zipCode})}
                />
            </View>
        </View> }
        { needPassword && changeEmail && 
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
        { needPassword && changePass && 
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
                    onPress={()=> {
                        if (validatePassword(newPassword) && newPassword === confirmPassword) {
                            updatePassword({oldPassword, newPassword})
                        } else {
                            setPassErrMsg("Passwords must match!");
                        }
                    }}
                />
            </View>
        </View> }
        { needPassword && changePhone &&
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
                    onPress={()=> {
                        if (newPhone.length >= 10) {
                            password = oldPassword;
                            updatePhone({password, newPhone});
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