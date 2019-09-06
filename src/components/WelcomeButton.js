import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';

const WelcomeButton = ({onPress, title}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.containingDiv}>
                <Text style={styles.text}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    text: {
        color: '#000000',
        textAlign: 'center',
        fontSize: 20
    },
    containingDiv: {
        height: 60,
        width: 110,
        backgroundColor: '#ffffff',
        margin: 5,
        borderRadius: 10,
        opacity: .95,
        justifyContent: 'center' //This centers text vertically
    }
});

export default WelcomeButton;