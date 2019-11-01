import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const NavigationButton = ({title, onPress, color}) => {
    return (
        <View>
            <TouchableOpacity
                onPress={onPress}
            >
                <View style={this.renderStyle({color})}>
                    <Text>{title}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

renderStyle = function(color) {
    return {
        alignItems: 'center',
        alignContent: 'center',
        color: color,
        //backgroundColor: {tintColor},
        backgroundColor: 'white',
        width: 60,
        height: 40,
    };
};

export default NavigationButton;