import React from 'react';
import { Text, StyleSheet} from 'react-native';

const SubHeading = (props) => {
    return <Text style={styles.text}>{props.title}</Text>;
}

const styles = StyleSheet.create({
    text : {
        color: '#000000',
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 7
    }
});

export default SubHeading;