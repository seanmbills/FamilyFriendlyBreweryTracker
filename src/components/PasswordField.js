// React imports
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

/* 
 * password fields need special styling to ensure passwords are not openly displayed
 * this component essentially is meant to serve as simpler way to implement a password input field
 * 
 * @prop password - state object - used to obtain value from this component
 * @prop onChangeText - state object modifier method - used to modify password @prop
 */
const PasswordField = ({password, onChangeText}) => {
    return (
        <TextInput
        style={styles.textPassword}
        value={password}
        secureTextEntry={true}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="password"
        onChangeText={onChangeText}
    />);
}
const styles = StyleSheet.create({
    textPassword: {
        backgroundColor: '#ffffff',
        opacity: 95,
        borderRadius: 10,
        height: 30,
        width: 200,
        alignSelf: "center",
        textAlign: "center"
    },
})

export default PasswordField;