import React, {useState, useContext} from 'react';
import { Text, StyleSheet, View } from 'react-native';
import WelcomeButton from '../components/WelcomeButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Context as AuthContext} from '../context/AuthContext';
import Dialog, {DialogContent} from 'react-native-popup-dialog';

/*
 * First screen a user views upon loading application. Allows them to navigate to two locations:
 * login or registration
 */
const WelcomeScreen = ({navigation}) => {
    const [ guestPopup, setGuestPopup ] = useState(false);
    const [ showErr, setShowErr ] = useState(false)
    const { state, clearUserToken } = useContext(AuthContext)
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
            <View> 
                <TouchableOpacity 
                    onPress={()=>setGuestPopup(true)}
                >
                    <Text style={styles.guestLink}>Continue as guest</Text>
                </TouchableOpacity>
            </View>
            <Dialog 
                visible={guestPopup}
                onDismiss={()=> setShowErr(false)}
                style={styles.dialogContent}
            >
                <DialogContent style={styles.dialogContent}>
                    { !showErr && 
                    <View stye={styles.dialogContent}>
                    <Text style={styles.dialogText}>Are you over 21 years old?</Text>
                    <WelcomeButton
                        title="Yes"
                        onPress={async ()=>{
                            await clearUserToken();
                            await setGuestPopup(false);
                            navigation.navigate('breweryFlow');
                        }}
                    />
                    <WelcomeButton
                        title="No"
                        onPress={()=>setShowErr(true)}
                    />  
                    </View>
                    }   
                    {showErr &&
                    <View>
                        <Text style={styles.dialogText}>You must be at least 21 years old to use this application</Text>
                        <WelcomeButton
                            title="Cancel"
                            onPress={()=>{
                                setGuestPopup(false)
                                setShowErr(false)
                                
                            }}
                        />
                    </View>
                    }
                </DialogContent>
            </Dialog>
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
    }
});
export default WelcomeScreen;