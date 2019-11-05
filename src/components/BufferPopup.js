// React imports
import React from 'react';
import {View} from 'react-native';
import Dialog, {DialogContent} from 'react-native-popup-dialog';

const BufferPopup = ({isVisible}) => {
    return (
        <Dialog
            visible={isVisible}
        >
            <View>
                
            </View>
        </Dialog>
    );
}