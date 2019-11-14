import React, {Component} from 'react';
import { Text, StyleSheet, View } from 'react-native';
import WelcomeButton from '../components/WelcomeButton';
import {Context as AuthContext} from '../context/AuthContext'
import BufferPopup from '../components/BufferPopup'

class WelcomeScreenComponent extends Component {
    state = {
        isLoading: true
    }

    async componentDidMount() {
        let {state, tryAutoSignin} = this.context
        
        this.focusListener = this.props.navigation.addListener('didFocus', async () => {
            await tryAutoSignin().then(() => {
                this.setState({
                    isLoading: false
                })
            })
        })
    }

    componentWillUnmount() {
        this.focusListener.remove()
    }

    render() {
        let {state} = this.context
        let popup = <BufferPopup isVisible={this.state.isLoading && (state.token === null || state.token === '')} text={""} />

        return (
            <View style={{flex:1}}>
                {popup}
                {
                    !this.state.isLoading && state.token !== null && state.token !== ''
                    && <View>{this.props.navigation.navigate('BreweryList')}</View>
                }
                <WelcomeScreen navigation={this.props.navigation} />
            </View>
        )
    }
}
WelcomeScreenComponent.contextType = AuthContext

/*
 * First screen a user views upon loading application. Allows them to navigate to two locations:
 * login or registration
 */
const WelcomeScreen = ({navigation}) => {
    return (
        <View style= {styles.background}> 
            <Text style= {styles.welcomeBanner}>
                FamBrews
            </Text>
            <View styles= {styles.buttonSection} >
                <WelcomeButton
                    title="Sign Up"
                    destScreen="Registration"
                    onPress={() => {
                        navigation.navigate('Registration')
                    }}
                />
                <WelcomeButton
                    title="Login"
                    destScreen="Login"
                    onPress={() => {
                        navigation.navigate('Login')
                    }}
                />
            </View>
        </View>
    );
};

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
    }
});
export default WelcomeScreenComponent;