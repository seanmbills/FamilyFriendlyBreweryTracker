import React, { useState, useContext, Component} from 'react';
import {View, StyleSheet, Text, TextInput, ScrollView, Dimensions, TouchableOpacity, Linking, Platform, FlatList} from 'react-native'
import {Rating, AirbnbRating} from 'react-native-ratings'
import WelcomeButton from '../components/WelcomeButton'
import TimeAgo from 'react-native-timeago';


import {Context as ReviewContext} from '../context/ReviewContext';

const ReadReviewsScreen = ({navigation}) => {

  const {state} = useContext(ReviewContext);


  const breweryId = navigation.getParam('breweryId')
  const breweryName = navigation.getParam('name')
  const breweyReviews = navigation.getParam('breweryReviews')
  const breweryFontSize = navigation.getParam('breweryFontSize')

  const reviews = state.results;

  var userHasReview = false;

  for (var review in reviews) {
    if (CURRENT USER ID == review.poster.id) {
      var userReview = review
      delete(review)
      userHasReview = true
      break
    }
  }

    return (
      <ScrollView style={styles.container}>
        {/*Displays the brewery name at the top of the screen*/}
        <Text
              style={{fontSize: breweryFontSize, textAlign: 'center', fontWeight: 'bold', marginTop: 25, paddingBottom: 5}}>{breweryName}
        </Text>
        <TouchableOpacity onPress={() => {
            navigation.navigate("WriteReview", {breweryId: breweryId, name:breweryName, breweryFontSize: breweryFontSize});
          }}>
          <Text style={styles.writeReview}>Click here to write a review!</Text>
        </TouchableOpacity>
        <View>
        <FlatList
          data={state.results}
          keyExtractor={(result) => result._id}
          renderItem={({item}) => {
          return (
            <View style={styles.viewBox}>
                 <Text style={styles.user}>{item.poster.username}
                 </Text>
                 <View style={{flexDirection: 'row'}}>
                 <Rating style={styles.ratings}
                     imageSize={20}
                     readonly
                     startingValue={item.rating}
                     fractions={1}
                 />
                 <TimeAgo style={styles.timeAgo}time={item.postedDate}/>
                 </View>
                 <Text>{item.message}</Text>
                 </View>
          )
          }}
        />
        </View>
      {
        state.results && state.count == 0 &&
        <Text>No reviews currently exist for this brewery</Text>
      }
      </ScrollView>
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
    borderStyle: 'solid',
    borderWidth: 1,
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
  },
  writeReview: {
    marginTop: 8,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 8,
    paddingLeft: 10,
    fontSize: 20,
    textDecorationLine: 'underline',
  },
  ratings:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginRight: 5,
    marginBottom: 10,
  },
  timeAgo: {
    color: '#696969',
    textAlign: 'right',
    paddingRight: 5,
  },
  user: {
    fontSize: 15,
    fontWeight: 'bold'
  }
});

export default ReadReviewsScreen
