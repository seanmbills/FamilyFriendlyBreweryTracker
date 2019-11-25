import React, { useState, useContext, useEffect, Component } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';

import { Context as AuthContext } from '../context/AuthContext';
import { TextInput, TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import {Input} from 'react-native-elements';

// Local imports
import WelcomeButton from '../components/WelcomeButton';
import ZipTextField from '../components/ZipTextField';
import PasswordField from '../components/PasswordField';
import { validatePassword, validateEmail } from '../api/InputValidation';
import PhoneInput from 'react-native-phone-input';
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'
import BufferPopup from '../components/BufferPopup';
import SignInPrompt from '../components/SignInPrompt';



class UserUpdateAccount extends Component {
    state = {
        isLoading: true,
        foundUser: false,
        showUserErr: false
    };
    
    async componentDidMount() {
        this.setState({
            isLoading: true,
            foundUser: false,
            showUserErr: false
        })
        let {state, getUserInfo} = this.context

        await getUserInfo({token: state.token}).then(() => {
            console.log("state results: ", state)
            if (state.profileInfo !== null || state.token !== null) {
                this.setState({
                    isLoading: false,
                    foundUser: true
                })
            } else {
                this.setState({
                    isLoading: false,
                    foundUser: false,
                    showUserErr: true
                })
            }
        })
    }

    async componentWillUnmount() {
        //this.setState({showUserErr: false})
        //this.setState({isLoading: true})
    }

    render() {
        //const [ showUserErr, setShowUserErr ] = useState(true);
        console.log("State: ", this.state)
        return (
            <View style={{flex:1}}>
                <BufferPopup isVisible={this.state.isLoading} text={"Fetching User's Info"} />
                {
                    !this.state.isLoading && this.state.foundUser && 
                    <UpdateAccountScreen navigation={this.props.navigation} />
                }
                {
                    !this.state.isLoading && this.state.showUserErr && 
                    <SignInPrompt
                        navigation={this.props.navigation}
                        isVisible={this.state.showUserErr}
                    />
                }
                {
                    !this.state.isLoading && !this.state.foundUser &&
                    <View style={{alignItems: 'center', flex: 1, backgroundColor: styles.background.backgroundColor}}>
                        <Text style={styles.inputTitle}>You Must Login to Visit this Part of the App</Text>
                        <WelcomeButton
                            title="Login or Register"
                            onPress={()=>this.props.navigation.navigate("loginFlow")}
                        />  
                    </View>
                }
            </View>
        )
    }
}
UserUpdateAccount.contextType = AuthContext

/* 
 * Screen will allow user to update account information. This includes: email, phoneNumber, password, zipcode
 */
const UpdateAccountScreen = ({navigation}) => {
    const {state, userUpdate, updatePassword, updateEmail, updatePhone,
        clearErrorMessage} = useContext(AuthContext);
    const [ firstName, setFirstName ] = state.profileInfo.firstName === null ? useState('') : useState(state.profileInfo.firstName)
    const [ lastName, setLastName ] = state.profileInfo.lastName === null ? useState('') : useState(state.profileInfo.lastName)
    const [ zipCode, setZipCode ] = state.profileInfo.zipCode === null ? useState('') : useState(state.profileInfo.zipCode)

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
    const [ profilePic, setProfilePic ] = useState(null)
    const [showPic, setShowPic ] = useState(true)


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

    //state object which indicates if popup buffer should be displayed
    const [ showDialog, setShowDialog ] = useState(false);
    //state object which dictates the text to be displayed at bottom of buffer dialog box
    const [ bufferText, setBufferText ] = useState('');

    //State object which indicates if results popup should be shown
    const [ resultDialogVisible, setResultDialogVisible ] = useState(false);
    const [ resultDialogText, setResultDialogText ] = useState('');
    const [ errDialogVisible, setErrDialogVisible ] = useState(false);

    return ( 
        <ScrollView keyboardDismissMode='on-drag' style={styles.background}>
            <Text style={styles.title}>Update Account</Text>
            {
                showPic && 
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Button
                        title="Pick an image from camera roll"
                        onPress={this._pickImage}
                    />
                    {
                        !profilePic && (state.profileInfo === null || state.profileInfo.profilePic === '') && 
                        <Image source = {require('../../assets/EmptyProfilePic.png')} style={styles.imageStyle} />
                    }
                    {
                        !profilePic && state.profileInfo !== null && state.profileInfo.profilePic !== '' && 
                        <Image source={{uri: state.profileInfo.profilePic}} style={styles.imageStyle} />
                    }
                    {
                        profilePic &&
                        <Image source={{ uri: profilePic.uri }} style={styles.imageStyle} />
                    }
                </View>
            }

        { /* a password isn't needed to update zipcode or first and last name */
          !needPassword && 
        <View>
            <View style={styles.formElement}>
                    <Input
                        value={zipCode}
                        keyboardType="number-pad"
                        labelStyle={{color: 'black', fontSize: 20}}
                        label='Zip Code'
                        leftIcon={{type: 'font-awesome', name: 'map-marker'}}
                        leftIconContainerStyle={{paddingRight: 8}}
                        inputContainerStyle={{borderBottomColor: 'black'}}
                        onChangeText={(newZip) => {
                            setZipCode(newZip);
                        }}
                        maxLength={5}
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
                        onChangeText={(newFirst) => {
                            setFirstName(newFirst);
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
                        onChangeText={(newLast) => {
                            setLastName(newLast);
                        }}
                    />
            </View>
            <View style={styles.fieldContainer}>
                <TouchableOpacity onPress={()=> {
                    // A password is needed to update email addresses
                    setNeedPassword(true);
                    setChangeEmail(true);
                    setShowPic(false)
                }} >
                    <Text style={styles.needPassLink}>Update Email Address</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.fieldContainer}>
                <TouchableOpacity onPress={()=> {
                    // a password is needed to update a phone number
                    setNeedPassword(true);
                    setChangePhone(true);
                    setShowPic(false)
                }} >
                    <Text style={styles.needPassLink}>Update Phone Number</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.fieldContainer}>
                <TouchableOpacity onPress={()=> {
                    // a password is needed to update a password
                    setNeedPassword(true)
                    setChangePass(true);
                    setShowPic(false)
                }}
                >
                    <Text style={styles.needPassLink}>Update Password</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <WelcomeButton
                    title="Submit"
                    onPress={ async ()=> {
                        
                        
                        if (zipCode.length !== 5) {
                            setResultDialogText("Zip Code must be a length of 5");
                            setErrDialogVisible(true);
                            return
                        }
                        //Set dialog text and make it visible
                        setBufferText("Updating Account")
                        setShowDialog(true);
                        //Make request to backend to update account
                        var response = await userUpdate({firstName, lastName, zipCode, profilePic, token: state.token})

                        //set dialog to no longer be visible
                        setShowDialog(false);

                        // If the update failed, show a failure popup
                        if (!response || response.status >= 400) {
                            setResultDialogText("Something went wrong. Unable to update account");
                            setErrDialogVisible(true);
                        } else { //Otherwise show a successful popup
                            setResultDialogText("Account Successfully Updated!");
                            setResultDialogVisible(true);
                        }
                    }}
                />
            </View>
        </View> }
        { /* if a user wants to update his/her email, display a new email field and a confirm password field */
            needPassword && changeEmail && 
        <View>
            <View style={styles.formElement}>
                <Input
                    value={oldPassword}
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
                    onChangeText={(newOldPass) => setOldPassword(newOldPass)}
                />
            </View>
            <View style={styles.formElement}> 
                <Input
                    value={newEmail}
                    labelStyle={{color: 'black', fontSize: 20}}
                    label='New Email Address'
                    placeholder='Email Address'
                    placeholderTextColor="#262626"
                    leftIcon={{type: 'font-awesome', name: 'envelope'}}
                    leftIconContainerStyle={{paddingRight: 8}}
                    inputContainerStyle={{borderBottomColor: 'black'}}
                    autoCapitalize="none"
                    onChangeText={(newAddress) => setNewEmail(newAddress)}
                />
            </View>
            <View style={styles.buttonContainer}>
                <WelcomeButton
                    title="Submit"
                    onPress={async ()=> {
                        if (validateEmail(newEmail) && oldPassword.length > 8) {
                            password = oldPassword;
                            
                            //Set dialog text and make it visible
                            setBufferText("Updating Email")
                            setShowDialog(true);

                            var response = await updateEmail({newEmail, password, token: state.token});

                            //set dialog to no longer be visible
                            setShowDialog(false);

                             // If the update failed, show a failure popup
                            if (!response || response.status >= 400) {
                                setResultDialogText("Something went wrong. Unable to update email");
                                setErrDialogVisible(true);
                            } else { //Otherwise show a successful popup
                                setResultDialogText("Email Successfully Updated!");
                                setResultDialogVisible(true);
                            }

                        } else {
                            //Show dialog stating email was invalid
                            setResultDialogText("Email entered was not valid");
                            setErrDialogVisible(true);
                        }
                    }}
                />
            </View>
        </View>
        }
        { /* if a user wants to update his/her password, display a new password field and a confirm password field */
            needPassword && changePass && 
        <View>
            <View style={styles.formElement}>
                <Input
                    value={oldPassword}
                    labelStyle={{color: 'black', fontSize: 20}}
                    label='Old Password'
                    placeholder='Password'
                    placeholderTextColor="#262626"
                    leftIcon={{type: 'font-awesome', name: 'lock'}}
                    leftIconContainerStyle={{paddingRight: 8}}
                    inputContainerStyle={{borderBottomColor: 'black'}}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(newOldPass) => setOldPassword(newOldPass)}
                />
            </View>
            <View style={styles.formElement}>
                <Input
                    value={newPassword}
                    labelStyle={{color: 'black', fontSize: 20}}
                    label='New Password'
                    placeholder='Password'
                    placeholderTextColor="#262626"
                    leftIcon={{type: 'font-awesome', name: 'lock'}}
                    leftIconContainerStyle={{paddingRight: 8}}
                    inputContainerStyle={{borderBottomColor: 'black'}}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(newPass) => setNewPassword(newPass)}
                />
            </View>
            <View style={styles.formElement}>
                <Input
                    value={confirmPassword}
                    labelStyle={{color: 'black', fontSize: 20}}
                    label='Confirm New Password'
                    placeholder='Password'
                    placeholderTextColor="#262626"
                    leftIcon={{type: 'font-awesome', name: 'lock'}}
                    leftIconContainerStyle={{paddingRight: 8}}
                    inputContainerStyle={{borderBottomColor: 'black'}}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
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

                            var response = await updatePassword({oldPassword, newPassword, token: state.token})

                            //Set dialog to no longer be visible
                            setShowDialog(false);

                            // If the update failed, show a failure popup
                            if (!response || response.status >= 400) {
                                setResultDialogText("Something went wrong. Unable to update password");
                                setErrDialogVisible(true);
                            } else { //Otherwise show a successful popup
                                setResultDialogText("Password Successfully Updated!");
                                setResultDialogVisible(true);
                            }

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
            <View style={styles.formElement}>
                <Input
                    value={oldPassword}
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
                    onChangeText={(newOldPass) => setOldPassword(newOldPass)}
                />
            </View>
            <View style={styles.formElement}>
                <Input
                    value={newPhone}
                    keyboardType="number-pad"
                    labelStyle={{color: 'black', fontSize: 20}}
                    label='New Phone Number'
                    placeholder='XXX-XXX-XXXX'
                    placeholderTextColor="#262626"
                    leftIcon={{type: 'font-awesome', name: 'phone'}}
                    leftIconContainerStyle={{paddingRight: 8}}
                    inputContainerStyle={{borderBottomColor: 'black'}}
                    onChangeText={ (newNumber)=> {
                        setNewPhone(newNumber);
                    }}
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

                            var response = await updatePhone({password, newPhone, token: state.token});

                            //Set dialog to no longer be visible
                            setShowDialog(false);

                            // If the update failed, show a failure popup
                            if (!response || response.status >= 400) {
                                setResultDialogText("Something went wrong. Unable to update phone number");
                                setErrDialogVisible(true);
                            } else { //Otherwise show a successful popup
                                setResultDialogText("Phone Number Successfully Updated!");
                                setResultDialogVisible(true);
                            }
                        } else {
                            // Show result dialog which states phone number was invalid
                            setResultDialogText("Phone Number entered was not valid");
                            setErrDialogVisible(true);
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
                    setShowPic(true)
                }}
                title="Cancel"
            />
        </View>
        }
        { !needPassword &&
        <View style={styles.bottomButtonContainer}>
                <WelcomeButton
                    onPress={()=> {
                        setNeedPassword(false);
                        setChangePass(false);
                        setChangePhone(false);
                        setChangeEmail(false);
                        setShowPic(true)
                        navigation.navigate('BreweryList');
                    }}
                    title="Cancel"
                />
            </View>
        }
        {/* {state.errorMessage ? <Text style={styles.errorMsg}>{state.errorMessage}</Text> : null} */}

        <BufferPopup isVisible={showDialog} text={bufferText}/>
        <Dialog
            visible={resultDialogVisible}
            onTouchOutside={()=> {
                setResultDialogVisible(false)
                setNeedPassword(false);
                setChangeEmail(false);
                setChangePass(false);
                setChangePhone(false);
                setShowPic(true);
            }}
        >
            <DialogContent
                style={styles.resultDialog}
            >
                <Text style={styles.resultDialogText}>{resultDialogText}</Text>
            </DialogContent>
        </Dialog>
        <Dialog
            visible={errDialogVisible}
            onTouchOutside={()=> {
                setErrDialogVisible(false)
            }}
        >
            <DialogContent
                style={styles.resultDialog}
            >
                <Text style={styles.resultDialogText}>{resultDialogText}</Text>
            </DialogContent>
        </Dialog>
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
    formElement: {
        marginTop: 20,
        marginBottom: 20,
        alignItems: 'center'
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
    imageStyle: {
        width: 200,
        height: 200,
        marginTop: 10
    },
    buttonContainer: {
        alignItems: "center"
    },
    bottomButtonContainer: {
        alignItems: "center",
        marginBottom: 50
    },
    needPassLink: {
        fontSize: 20,
        fontWeight: "bold"
    },
    errMsg: {
        color: "red",
        fontSize: 12,
        marginLeft: 15
    },
    resultDialogText: {
        alignSelf: 'center',
        fontSize: 25,
    },
    resultDialog: {
        alignItems: 'center'
    }
});

export default UserUpdateAccount;