// React imports
import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

// Local Imports
import BreweryForm from '../components/BreweryForm';
import SharedStyles from '../../assets/SharedStyles';

/* 
 * Screen is essentially a dummy holder for the Brewery Form component. As this component contains all logic and 
 * stylings needed to create a new brewery
*/
const CreateBreweryScreen = ({navigation}) => {
    return (
        <ScrollView style={styles.backgroundContainer}>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Create Brewery</Text>
            </View>
            <View style={styles.contentContainer}>
                {/* Must provide the brewery form with prop isNew=true since the user is attempting to create a new brewery 
                  * As opposed to editing an existing brewery
                 */}
                <BreweryForm
                    isNew={true}
                    navigation={navigation}
                />
            </View>
        </ScrollView>
    );  
}

const styles = StyleSheet.create({
    backgroundContainer: {
        backgroundColor: SharedStyles.backgroundColor,
        flex: 1
    },
    contentContainer: {
        margin:5,
        padding:5,
    },
    title: {
        fontWeight:"bold",
        fontSize:25
    }
});

export default CreateBreweryScreen;