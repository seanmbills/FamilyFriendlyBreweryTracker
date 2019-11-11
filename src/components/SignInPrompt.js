import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Dialog, {DialogContent} from 'react-native-popup-dialog';

import WelcomeButton from '../components/WelcomeButton';

const SignInPrompt = ({navigation, isVisible}) => {
    const [ shown, setShown ] = useState(isVisible)
    return (
        <Dialog
            visible={shown}
        >
            <DialogContent>
                <Text>You must be signed in to access this part of the app</Text>
                <WelcomeButton
                    title="Login or Register"
                    onPress={async ()=>{
                        await setShown(!shown);
                        navigation.navigate('loginFlow')    
                    }}
                />
                <WelcomeButton
                    title="Back"
                    onPress={async ()=> {
                        await setShown(!shown)
                        navigation.navigate('breweryFlow')
                    }}
                />
            </DialogContent>
        </Dialog>
    )
}

export default SignInPrompt;