import React, { useState } from 'react';
import {View, StyleSheet, Text, TextInput, ScrollView, Dimensions, TouchableOpacity, Linking, Platform} from 'react-native'
import {Rating, AirbnbRating} from 'react-native-ratings'
import WelcomeButton from '../components/WelcomeButton'

const ReadReviewsScreen = ({navigation}) => {

  const breweryId = navigation.getParam('breweryId')
  const breweryName = navigation.getParam('name')
  const breweyReviews = navigation.getParam('breweryReviews')
  const breweryFontSize = navigation.getParam('breweryFontSize')

    return (
      <WelcomeButton
          title="WriteReview"
          onPress={() => {
              navigation.navigate("WriteReview", {breweryId: breweryId, name:breweryName, breweryFontSize: breweryFontSize});
          }}
      />
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
