import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Dialog, {DialogContent} from 'react-native-popup-dialog';

import WelcomeButton from '../components/WelcomeButton';

const SignInPrompt = ({navigation, isVisible, setVisible}) => {
    return (
        <Dialog
            visible={isVisible}
        >
            <DialogContent>
                <Text>You must be signed in to access this part of the app</Text>
                <WelcomeButton
                    title="Login"
                    onPress={async ()=>{
                        await setVisible(false);
                        navigation.navigate('loginFlow')    
                        }}
                />
                <WelcomeButton
                    title="Back"
                    onPress={async ()=> {
                        await setVisible(false)
                        navigation.navigate('breweryFlow')   
                        }}
                    />
            </DialogContent>
        </Dialog>
    )
}

export default SignInPrompt;