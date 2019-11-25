import React, {useState, useContext, useEffect, Component } from 'react';
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
import Modal from 'react-native-modal'

// local imports
import TitleText from '../components/TitleText';
import WelcomeButton from '../components/WelcomeButton';
import {validatePassword, validateEmail} from '../api/InputValidation'
// import EmptyProfilePic from '../../assets/EmptyProfilePic.png'

import BufferPopup from '../components/BufferPopup';

class RegistrationScreenComponent extends Component {
    // state objects for the needed input fields
    state = {
        isVisible: false, 
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phone: '',
        birthDate: '2000-01-01',
        username: '',
        zip: '',
        profilePic: null,
        inputErrMsg: '',
        passErrMsg: '',
        emailErrMsg: '',
        phoneErrMsg: '',
        zipErrMsg: '',
        birthDateErrMsg: '',
        confirmPass: ''
    }


    validateInput = (inputMap) => {
        var isValid = true
        // email, password, username, phone, zip, birthdDate
        if (!this.validateUsername(inputMap.get('username'))) {
            this.setState({inputErrMsg: "Username must be between 6-30 characters and " 
            + "can only contain alpanumeric characters.",});
            isValid = false;
        } else {
            this.setState({inputErrMsg: '',});
        }
        if (!validatePassword(inputMap.get('password'))) {
            this.setState({passErrMsg: "Password must be longer than 8 characters, contain "
                + "one special character, capital letter, and number.",});
            isValid = false;
        } else if (inputMap.get('confirmPass') != inputMap.get('password')) {
            this.setState({passErrMsg: "Passwords must match.",});
            isValid = false;  
        } else {
            this.setState({passErrMsg: '',});
        }

        if (!validateEmail(inputMap.get('email'))) {
            this.setState({emailErrMsg: "Email address provided was not valid.",});
            isValid = false;
        } else {
            this.setState({emailErrMsg: '',});
        }
        if (!this.validatePhone(inputMap.get('phone'))) {
            this.setState({phoneErrMsg: "Phone number provided was not valid.",});
            isValid = false;
        } else {
            this.setState({phoneErrMsg: '',});
        }
        if (!this.validateZip(inputMap.get('zip'))) {
            this.setState({zipErrMsg: "Zip code provided was not valid.",});
            isValid = false;
        } else {
            this.setState({zipErrMsg: '',});
        }
        if (!this.validateBirthDate(inputMap.get('birthDate'))) {
            this.setState({birthDateErrMsg: "You must be at least 21 years old "
                + "to use this application.",});
            isValid = false;
        } else {
            this.setState({birthDateErrMsg: '',});
        }
        return isValid;
    }

    validateUsername = (name) => {
        if (name.length < 6 || name.length > 30) {
            return false;
        } 
        if (!name.match(/^[0-9a-zA-Z]+$/)) {
            return false;
        }
        return true
    }
    
    validatePhone = (num) => {
        return num.length == 10
        && num.match(/^[0-9]*$/g);
    } 
    
    validateZip = (num) => {
        return num.length == 5
        && num.match(/^[0-9]*$/g);
    }
    
    validateBirthDate = (date) => {
        const enteredDate = date.split('-');
        const givenYear = parseInt(enteredDate[0]);
        const givenMonth = parseInt(enteredDate[1]);
        const givenDay = parseInt(enteredDate[2]);
        console.log(new Date(givenYear + 21, givenMonth -1 , givenDay))
        return (new Date(givenYear + 21, givenMonth -1 , givenDay) <= new Date());
    
    }

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
            this.setState({profilePic: result,})
        }
    };

    componentDidMount() {
        this.getPermissionAsync()
    }

    componentDidUpdate() {
        let {state} = this.context
        if (!this.state.isVisible && state.token !== null && state.token !== '') {
            this.setState({isVisible: false,})
            this.props.navigation.navigate('BreweryList')
        }
    }

    render() {
        let {state, register, clearErrorMessage} = this.context
        let popup = (
            <Modal isVisible={this.state.isVisible}>
                <View style={{flex:1}, styles.container}>
                    <Image source={require('../../assets/buffering.gif')}/>
                    <Text style={styles.text}>{"Registering..."}</Text>
                </View>
            </Modal>
        )

        return (
            <KeyboardAvoidingView behavior="padding">
                
                {popup}

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
                            !this.state.profilePic && 
                            <Image source={require('../../assets/EmptyProfilePic.png')} style={styles.imageStyle} />
                        }  
                        { 
                            this.state.profilePic &&
                            <Image source={{ uri: this.state.profilePic.uri }} style={styles.imageStyle} />
                        }
                    </View>

                    <View style={styles.formElement}>
                        <Input
                            value={this.state.email}
                            labelStyle={{color: 'black', fontSize: 20}}
                            label='Email'
                            placeholder='Email'
                            placeholderTextColor="#262626"
                            leftIcon={{type: 'font-awesome', name: 'envelope'}}
                            leftIconContainerStyle={{paddingRight: 8}}
                            inputContainerStyle={{borderBottomColor: 'black'}}
                            autoCapitalize="none"
                            onChangeText={(newEmail) => {
                                this.setState({email: newEmail,});
                            }}
                            errorStyle={{color: 'red'}}
                            errorMessage={this.state.emailErrMsg}
                        />
                    </View>
                    <View style={styles.formElement}>
                        <Input
                            value={this.state.username}
                            labelStyle={{color: 'black', fontSize: 20}}
                            label='Username'
                            placeholder='Username'
                            placeholderTextColor="#262626"
                            leftIcon={{type: 'font-awesome', name: 'user'}}
                            leftIconContainerStyle={{paddingRight: 8}}
                            inputContainerStyle={{borderBottomColor: 'black'}}
                            autoCapitalize="none"
                            onChangeText={(newUsername) => {
                                this.setState({username: newUsername,});
                            }}
                            errorStyle={{color: 'red'}}
                            errorMessage={this.state.inputErrMsg}
                        />
                    </View>
                    <View style={styles.formElement}>
                        <Input
                            value={this.state.password}
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
                                this.setState({password: newPass,});
                            }}
                        />
                    </View>
                    <View style={styles.formElement}>
                        <Input
                            value={this.state.confirmPass}
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
                                this.setState({confirmPass: newPass,});
                            }}
                            errorStyle={{color: 'red'}}
                            errorMessage={this.state.passErrMsg}
                        />
                    </View>
                    <View style={styles.formElement}>
                        <Input
                            value={this.state.firstName}
                            labelStyle={{color: 'black', fontSize: 20}}
                            label='First Name'
                            placeholder='First Name'
                            placeholderTextColor="#262626"
                            leftIcon={{type: 'font-awesome', name: 'id-badge'}}
                            leftIconContainerStyle={{paddingRight: 8}}
                            inputContainerStyle={{borderBottomColor: 'black'}}
                            onChangeText={(newName) => {
                                this.setState({firstName: newName,});
                            }}
                        />
                    </View>
                    <View style={styles.formElement}>
                        <Input
                            value={this.state.lastName}
                            labelStyle={{color: 'black', fontSize: 20}}
                            label='Last Name'
                            placeholder='Last Name'
                            placeholderTextColor="#262626"
                            leftIcon={{type: 'font-awesome', name: 'id-badge'}}
                            leftIconContainerStyle={{paddingRight: 8}}
                            inputContainerStyle={{borderBottomColor: 'black'}}
                            onChangeText={(newName) => {
                                this.setState({lastName: newName,});
                            }}
                        />
                    </View>
                    <View style={styles.formElement}>
                        <Input
                            value={this.state.zip}
                            maxLength={5}
                            keyboardType="number-pad"
                            labelStyle={{color: 'black', fontSize: 20}}
                            label='Zip Code'
                            placeholder='Zip Code'
                            placeholderTextColor="#262626"
                            leftIcon={{type: 'font-awesome', name: 'map-marker'}}
                            leftIconContainerStyle={{paddingRight: 8}}
                            inputContainerStyle={{borderBottomColor: 'black'}}
                            onChangeText={(newZip) => {
                                this.setState({zip: newZip,});
                            }}
                            errorStyle={{color: 'red'}}
                            errorMessage={this.state.zipErrMsg}
                        />
                    </View>
                    <View style={styles.formElement}>
                        <Input
                            value={this.state.phone}
                            maxLength={10}
                            keyboardType="number-pad"
                            labelStyle={{color: 'black', fontSize: 20}}
                            label='Phone Number'
                            placeholder='XXX-XXX-XXXX'
                            placeholderTextColor="#262626"
                            leftIcon={{type: 'font-awesome', name: 'phone'}}
                            leftIconContainerStyle={{paddingRight: 8}}
                            inputContainerStyle={{borderBottomColor: 'black'}}
                            onChangeText={ (newPhone)=> {
                                this.setState({phone: newPhone,});
                            }} 
                            errorStyle={{color: 'red'}}
                            errorMessage={this.state.phoneErrMsg}
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
                            maximumDate={new Date()}
                            date={this.state.birthDate}
                            onDateChange={(newDate) => {
                                this.setState({birthDate: newDate,})
                            }}
                        />
                    </View>
                    <View>
                        <Text style={styles.errorMsg}>{this.state.birthDateErrMsg}</Text>
                    </View>
                    {state.errorMessage ? <Text style={styles.errorMsg}>{state.errorMessage}</Text> : null}
                    <View style={styles.buttonContainer}>
                        <WelcomeButton
                            title="Register"
                            onPress={ async () => {
                                //Create map object to pass to input validation function
                                const inputMap = new Map();
                                inputMap.set('email', this.state.email);
                                inputMap.set('password', this.state.password);
                                inputMap.set('username', this.state.username);
                                inputMap.set('phone', this.state.phone);
                                inputMap.set('zip', this.state.zip);
                                inputMap.set('birthDate', this.state.birthDate);
                                inputMap.set('confirmPass', this.state.confirmPass);

                                //Check the input & set error messages if somthing is wrong
                                if(this.validateInput(inputMap)) {
                                    const userId = this.state.username;
                                    const phoneNumber = this.state.phone;
                                    const zipCode = this.state.zip;

                                    this.setState({isVisible: true,});

                                    var response = await register({email: this.state.email, userId, 
                                        password: this.state.password, birthDate: this.state.birthDate,
                                        firstName: this.state.firstName, lastName: this.state.lastName,
                                        phoneNumber, zipCode, profilePic: this.state.profilePic});
                                    this.setState({isVisible: false,});
                                    if (!response || response.status >= 400) {
                                        console.log("Error when registering");
                                    } else {
                                        this.props.navigation.navigate('BreweryList');
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
                                this.props.navigation.navigate("Welcome");
                            }}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}
RegistrationScreenComponent.contextType = AuthContext


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
    imageStyle: {
        width: 200,
        height: 200,
        marginTop: 10
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
    },
    container: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    
});
export default RegistrationScreenComponent;