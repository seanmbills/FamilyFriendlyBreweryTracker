import React, {useState} from 'react';
import { Text, KeyboardAvoidingView, StyleSheet, View, ScrollView, TextInput} from 'react-native';
import TitleText from '../components/TitleText';
import PhoneInput from 'react-native-phone-input';
import WelcomeButton from '../components/WelcomeButton';

const RegistrationScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');

    return (
        <ScrollView style={styles.background}>
            <TitleText title="Registration"/>
            <View style={styles.formElement}>
                <Text style={styles.formLabel}>Email:</Text>
                <View style= {styles.textContainer}>
                    <TextInput
                        style={styles.textInput}
                        value={email}
                        placeholder="Email"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(newEmail) => {
                            setEmail(newEmail);
                        }}
                    />
                </View>
            </View>
            <View style={styles.formElement}>
                <Text style={styles.formLabel}>Password:</Text>
                <View style= {styles.textContainer}>
                    <TextInput
                        style={styles.textPassword}
                        value={password}
                        secureTextEntry={true}
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="password"
                        onChangeText={(newPass) => {
                            setPassword(newPass);
                        }}
                    />
                </View>
            </View>
            <View style={styles.formElement}>
                <Text style={styles.formLabel}>First Name:</Text>
                <View style= {styles.textContainer}>
                    <TextInput
                        style={styles.textInput}
                        value={firstName}
                        placeholder="First Name"
                    />
                </View>
            </View>
            <View style={styles.formElement}>
                <Text style={styles.formLabel}>Last Name:</Text>
                <View style= {styles.textContainer}>
                    <TextInput
                        style={styles.textInput}
                        value={lastName}
                        placeholder="Last Name"
                    />
                </View>
            </View>
                <Text style={styles.formLabel}>Phone Number:</Text>
                <View style= {styles.textContainer}>
                    <PhoneInput
                        placeholder="Enter phone number"
                        value={phone}
                        onChange={ (newPhone)=> {
                            setPhone(newPhone);
                        }}
                        style={styles.textInput}
                    />
                </View>
            <View style={styles.buttonContainer}>
                <WelcomeButton
                    title="Register"
                    onPress={ () => {
                        console.log("Registration button pressed");
            
                    }}
                />
            </View>
            <View style={styles.buttonContainer}>
                <WelcomeButton
                    title="Back"
                    onPress={ () => {
                        navigation.navigate("Welcome");
                    }}
                />
            </View>
        </ScrollView>
    );
};
/*
    email
    password
    birthDate: YYYY-MM-DDT00:00:00.000+00:00
    firstName:
    lastName:
    phoneNumber:
    zipCode:
*/
const styles = StyleSheet.create({
    background: {
        backgroundColor: "#fcc203",
        marginTop: 20
    },
    formElement: {
        marginTop: 20,
        marginBottom: 30
    },
    formLabel: {
        fontSize: 20,
        textAlign: 'left',
        flexDirection: 'column',
        alignSelf: 'flex-start',
        marginLeft: 10,

    },
    textInput: {
        backgroundColor: '#ffffff',
        opacity: 95,
        borderRadius: 10,
        height: 30,
        width: "75%",
    },
    textPassword: {
        backgroundColor: '#ffffff',
        opacity: 95,
        borderRadius: 10,
        height: 30,
        width: "75%"
    },
    textContainer: {
        alignItems: 'center'
    },
    buttonContainer: {
        alignItems: "center",
        marginTop: 30
    }
});
export default RegistrationScreen;