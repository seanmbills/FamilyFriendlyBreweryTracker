import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';

const WelcomeButton = (props) => {
    console.log(props)
    return (
        <TouchableOpacity>
            <View style={styles.containingDiv}>
                <Text style={styles.text}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    text: {
        color: '#000000',
        textAlign: 'center'
    },
    containingDiv: {
        height: 50,
        width: 100,
        backgroundColor: '#ffffff',
        margin: 5,
        borderRadius: 10,
        opacity: .95,
        justifyContent: 'center' //This centers text vertically
    }
});

export default WelcomeButton;