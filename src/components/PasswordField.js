import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

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