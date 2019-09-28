import React from 'react'
import {View, Text, StyleSheet, TextInput} from 'react-native'
import {Feather } from '@expo/vector-icons'

const SearchBar = ({term, onTermChange, onSearchSubmit}) => {
    return (
        <View style = {styles.searchView}>
            <Feather style={styles.searchIcon} name="search"/>
            <TextInput style = {styles.textInput}
                placeholder="Search"
                placeholderTextColor="#686e72"
                value={term}
                onChangeText={onTermChange}
                autoCapitalize="none"
                autoCorrect={false}
                onEndEditing={onSearchSubmit}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    searchView: {
        backgroundColor: '#F0EEEE',
        height: 50,
        borderRadius: 5,
        margin: 10,
        flexDirection: 'row',
    },
    textInput: {
        flex: 1,
        padding: 5,
        fontSize: 20,
        color: 'black',
    },
    searchIcon: {
        fontSize: 40,
        alignSelf: 'center',
        marginHorizontal: 10,

    }
})

export default SearchBar