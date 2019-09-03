import React from 'react';
import { Text, StyleSheet} from 'react-native';

const TitleText = (props) => {
    return <Text style={styles.text}>{props.title}</Text>;
}

const styles = StyleSheet.create({
    text : {
        color: '#000000',
        textAlign: 'center',
        fontSize: 40,
        fontWeight: 'bold'
    }
});

export default TitleText;