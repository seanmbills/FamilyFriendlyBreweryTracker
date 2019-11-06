// React imports
import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import Dialog, {DialogContent} from 'react-native-popup-dialog';

/*
 * Component is meant to be a simple dialog popup. This popup contains a gif image of a spinning buffer
 * additionally, it allows for text to be added to the bottom of the dialog to explain what the buffering
 * is.
 * 
 * @prop isVisible - boolean - controls is buffer is being displayed
 * @prop text - string - the text to be displayed at the bottom of the buffer
 */
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