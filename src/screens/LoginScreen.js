// React native imports
import React, { useState, useContext, Component } from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import {NavigationEvents} from 'react-navigation'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {Context as AuthContext} from '../context/AuthContext'
import {Input} from 'react-native-elements';
import Modal from 'react-native-modal'

// Local imports
import TitleText from '../components/TitleText';
import WelcomeButton from '../components/WelcomeButton';
import BufferPopup from '../components/BufferPopup';

/*
 * Screen contains a form which allows a user to login using his/her username/email and password
 * It also contains a link to another screen which will allow a user to reset his/her password
 */
class LoginScreen extends Component {
    state = {
        isVisible: false, 
        email: '',
        password: ''
    }

    tryLogin = async () => {
        let {state, signin} = this.context
        await signin({emailOrId: this.state.email, password: this.state.password})
    }

    componentDidUpdate() {
        let {state} = this.context
        console.log("trying navigating")
        if (!this.state.isVisible && state.token !== null && state.token !== '') {
            this.setState({isVisible: false,})
            console.log("navigating")
            this.props.navigation.navigate('BreweryList')
        }
    }

    render() {
        let {state, clearErrorMessage} = this.context

        let popup = (
            <Modal isVisible={this.state.isVisible}>
                <View style={{flex:1}, styles.container}>
                    <Image source={require('../../assets/buffering.gif')}/>
                    <Text style={styles.text}>{"Logging in..."}</Text>
                </View>
            </Modal>
        )

        return (
            <ScrollView keyboardDismissMode='on-drag' style={styles.background}>
                {popup}

                <NavigationEvents 
                    onWillBlur={clearErrorMessage}
                />
                <View style={styles.topSpan}/>
                <TitleText
                    title="Login"
                />
                <View style={styles.formElement}> 
                    <Input
                        value={this.state.email}
                        labelStyle={{color: 'black', fontSize: 20}}
                        label='Email/Username'
                        placeholder='Email or Username'
                        placeholderTextColor="#262626"
                        leftIcon={{type: 'font-awesome', name: 'envelope'}}
                        leftIconContainerStyle={{paddingRight: 8}}
                        inputContainerStyle={{borderBottomColor: 'black'}}
                        autoCapitalize="none"
                        onChangeText={(newEmail) => {
                            console.log("updating email")
                            this.setState({
                                email: newEmail,
                            });
                        }}
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
                            console.log("updating pass")
                            this.setState({
                                password: newPass,
                            })
                        }}
                    />
                </View>
                {state.errorMessage ? <Text style={styles.errorMsg}>{state.errorMessage}</Text> : null}
                <View style={styles.buttonContainer}>
                    <WelcomeButton
                        title="Login"
                        onPress={ async () => {
                            await this.setState({isVisible: true,})
                            await this.tryLogin()
                            await this.setState({isVisible: false,})
                            console.log(this.state.isVisible)
                        }}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <WelcomeButton
                        title="Back"
                        onPress={() => {
                            this.props.navigation.replace("Welcome");
                        }}
                    />
                </View>
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.replace("ForgotPassword");
                    }}
                >
                    <Text style={styles.forgotPass}>Forgot Password</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}
LoginScreen.contextType = AuthContext

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

export default LoginScreen;
