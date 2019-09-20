import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
const ZipTextField = ({value, onChangeText}) => {
    return (
    <TextInput
        keyboardType="number-pad"
        style={styles.textInput}
        value={value}
        placeholder="zip code"
        onChangeText={onChangeText}
        maxLength={5}
    />
    );
}
const styles = StyleSheet.create({ 
    textInput: {
        backgroundColor: '#ffffff',
        opacity: 95,
        borderRadius: 10,
        height: 30,
        width: 100,
        textAlign: "center"
    },
});
export default ZipTextField;