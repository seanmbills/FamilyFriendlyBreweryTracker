import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const NavigationButton = ({style, title, onPress}) => {
    return (
        <View>
            <TouchableOpacity
                onPress={onPress}
            >
                <View style={style}>
                    <Text>{title}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

// renderStyle = function(color) {
//     return {
//         alignItems: 'center',
//         alignContent: 'center',
//         color: color,
//         backgroundColor: {color},
//     };
// };

export default NavigationButton;