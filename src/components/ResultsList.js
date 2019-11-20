import React, {useContext} from 'react'
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
import ResultDetails from './ResultDetails';
import {withNavigation} from 'react-navigation'
import {Context as BreweryContext} from '../context/BreweryContext'


const ResultsList = ({results, navigation}) => {
    var {state, getBrewery} = useContext(BreweryContext);
    if (results === null || results === undefined || results.length === 0) {
        return null;
    }
    return (
        <View style={styles.container}>
            <FlatList 
                data={results}
                keyExtractor={(result) => result.breweryId}
                renderItem={({item}) => {
                    return (
                        <TouchableOpacity onPress={
                            async () => {
                              await getBrewery({breweryId: item.breweryId})
                              navigation.navigate("BreweryDetails")
                            }
                        }>
                            <ResultDetails result={item}/>
                        </TouchableOpacity>
                    )
                }}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    listHeader: {
        fontSize: 22,
        fontWeight: "bold",
        marginLeft: 10,
        marginBottom: 5
    },
    container: {
        marginBottom: 10,
        paddingBottom: 50
    }
})

export default withNavigation(ResultsList)
