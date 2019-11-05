// React imports
import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import Dialog, {DialogContent} from 'react-native-popup-dialog';

const BufferPopup = ({isVisible, text}) => {
    return (
        <Dialog
            visible={isVisible}
        >
            <DialogContent>
            <View>
                <Image source={require('../../assets/buffering.gif')}/>
                <Text style={styles.text}>{text}</Text>
            </View>
            </DialogContent>
        </Dialog>
    );
}

const styles = StyleSheet.create({
    text: {
        alignSelf: 'center',
        color: 'black',
        fontSize:25,
        margin: 5
    }
})
export default BufferPopup;