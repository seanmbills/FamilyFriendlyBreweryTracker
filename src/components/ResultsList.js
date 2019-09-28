import React from 'react'
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
import ResultDetails from './ResultDetails';
import {withNavigation} from 'react-navigation'

const ResultsList = ({listName, results, navigation}) => {
    if (!results.length){
        return null;
    }
    return (
        <View style={styles.container}>
            <Text style={styles.listHeader}> {listName} </Text>
            <FlatList 
                horizontal
                data={results}
                keyExtractor={(result) => result.breweryId}
                renderItem={({item}) => {
                    return (
                        <TouchableOpacity onPress={
                            () => navigation.navigate("Result", {id: item.breweryId})}
                        >
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
        marginBottom: 10
    }
})

export default withNavigation(ResultsList)