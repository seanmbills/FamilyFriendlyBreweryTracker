import React, {Component, useState, useContext} from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import WelcomeButton from '../components/WelcomeButton';
import {Context as AuthContext} from '../context/AuthContext';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import BufferPopup from '../components/BufferPopup'
import Modal from 'react-native-modal'

class WelcomeScreenComponent extends Component {
    state = {
        isLoading: true,
        isVisible: true, 
        guestPopup: false,
        showErr: false
    }

    componentDidMount() {
        let {state, tryAutoSignin} = this.context
        
        this.focusListener = this.props.navigation.addListener('didFocus', async () => {
            await tryAutoSignin().then(() => {
                this.setState({
                    isLoading: false,
                    isVisible: false
                })
            })
        })
    }

    componentWillUnmount() {
        this.focusListener.remove()
    }

    componentDidUpdate() {
        let {state} = this.context

        if(!this.state.isLoading && state.token !== null && state.token !== '') {
            console.log("going to list")
            this.props.navigation.navigate('BreweryList')
        }
    }

    render() {
        // const [ guestPopup, setGuestPopup ] = useState(false);
        // const [ showErr, setShowErr ] = useState(false)
        let { state, clearUserToken } = this.context

        let popup = (
            <Modal isVisible={this.state.isVisible}>
                <View style={{flex:1}, styles.container}>
                    <Image source={require('../../assets/buffering.gif')}/>
                    <Text style={styles.text}>{"Logging in..."}</Text>
                </View>
            </Modal>
        )

        return (
            <View style={{flex:1}}>
                {popup}
                {/* <WelcomeScreen navigation={this.props.navigation} /> */}
                <View style= {styles.background}> 
                    <Text style= {styles.welcomeBanner}>
                        FamBrews
                    </Text>
                    <View styles= {styles.buttonSection} >
                        <WelcomeButton
                            title="Sign Up"
                            destScreen="Registration"
                            onPress={() => {
                                this.props.navigation.replace('Registration')
                            }}
                        />
                        <WelcomeButton
                            title="Login"
                            destScreen="Login"
                            onPress={() => {
                                this.props.navigation.replace('Login')
                            }}
                        />
                    </View>
                    <View> 
                        <TouchableOpacity 
                            onPress={()=>this.setState({guestPopup: true})}
                        >
                            <Text style={styles.guestLink}>Continue as guest</Text>
                        </TouchableOpacity>
                    </View>
                    <Dialog 
                        visible={this.state.guestPopup}
                        onDismiss={()=> this.setState({showErr: false})}
                        style={styles.dialogContent}
                    >
                        <DialogContent style={styles.dialogContent}>
                            { !this.state.showErr && 
                            <View stye={styles.dialogContent}>
                            <Text style={styles.dialogText}>Are you over 21 years old?</Text>
                            <WelcomeButton
                                title="Yes"
                                onPress={async ()=>{
                                    await clearUserToken();
                                    await this.setState({guestPopup: false,});
                                    this.props.navigation.navigate('breweryFlow');
                                }}
                            />
                            <WelcomeButton
                                title="No"
                                onPress={()=>this.setState({showErr: true})}
                            />  
                            </View>
                            }   
                            {this.state.showErr &&
                            <View>
                                <Text style={styles.dialogText}>You must be at least 21 years old to use this application</Text>
                                <WelcomeButton
                                    title="Cancel"
                                    onPress={()=>{
                                        this.setState({guestPopup: false})
                                        this.setState({showErr: false})
                                        
                                    }}
                                />
                            </View>
                            }
                        </DialogContent>
                    </Dialog>
                </View>
            </View>
        )
    }
}
WelcomeScreenComponent.contextType = AuthContext


const styles = StyleSheet.create({
    welcomeBanner: {
        fontSize: 60,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 50,
        marginBottom: 100
    },
    background: {
        backgroundColor: '#fcc203',
        height: '100%',
        width: '100%',
        alignContent: 'center',
        alignItems: 'center'
    },
    buttonSection:{
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    guestLink: {
        fontSize: 20
    },
    dialogContent: {
        alignItems: 'center',
        backgroundColor: '#d6d6d6'
    },
    dialogText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    text: {
        alignSelf: 'center',
        color: 'black',
        fontSize:25,
        margin: 5
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
export default WelcomeScreenComponent;