import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const MoreScreen = () => {
    return (
        <View style={styles.backgroundContainer}>
            <View>
                <Text style={styles.subHeader}>My Breweries</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    backgroundContainer: {
        backgroundColor: "#fcc203",
        flex: 1
    },
    subHeader: {
        color: 'black',
        fontSize: 25
    }
})
export default MoreScreen;