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
            <DialogContent
                style = {styles.mainContainer}
            >
                <Text style={styles.textTitle}>You Must be Signed in to Access this Part of the App</Text>
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
                        navigation.goBack()
                    }}
                />
            </DialogContent>
        </Dialog>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#d6d6d6',
        alignItems: 'center',
        textAlign: 'center'
    },
    textTitle: {
        fontSize: 20,
        textAlign: 'center'
    }
}) 
export default SignInPrompt;