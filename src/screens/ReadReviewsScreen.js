import React, { useState, useContext } from 'react';
import {View, StyleSheet, Text, TextInput, ScrollView, Dimensions, TouchableOpacity, Linking, Platform, FlatList} from 'react-native'
import {Rating, AirbnbRating} from 'react-native-ratings'
import WelcomeButton from '../components/WelcomeButton'

import {Context as ReviewContext} from '../context/ReviewContext';

const ReadReviewsScreen = ({navigation}) => {

  const {state} = useContext(ReviewContext);


  const breweryId = navigation.getParam('breweryId')
  const breweryName = navigation.getParam('name')
  const breweyReviews = navigation.getParam('breweryReviews')
  const breweryFontSize = navigation.getParam('breweryFontSize')

  const reviews = state.results;

    return (
      <View>
      { reviews && state.count > 0 && 
        <View>
          <Text>Reviews</Text>
        <FlatList
          data={state.results}
          keyExtractor={(result) => result._id}
          renderItem={({item}) => {
          return (
                 <Text>{item.message}</Text>
          )
          }}
        />
        </View>
      }
      {
        state.results && state.count == 0 &&
        <Text>No reviews currently exist for this brewery</Text>
      }
      <WelcomeButton
          title="WriteReview"
          onPress={() => {
              navigation.navigate("WriteReview", {breweryId: breweryId, name:breweryName, breweryFontSize: breweryFontSize});
          }}
      />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fcc203',
    flex: 1
  },
  viewBox: {
    backgroundColor: 'white',
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    borderRadius: 10,
    borderStyle: 'dashed',
    borderWidth: 1
  }
});

export default ReadReviewsScreen
