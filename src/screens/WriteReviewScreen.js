import React, { useState, useContext } from 'react';
import {View, StyleSheet, Text, TextInput, ScrollView, Dimensions, TouchableOpacity, Linking, Platform} from 'react-native'
import {Rating, AirbnbRating} from 'react-native-ratings'
import WelcomeButton from '../components/WelcomeButton';
import {Context as ReviewContext} from '../context/ReviewContext';

const WriteReviewScreen = ({navigation}) => {
  const {state, createReview, getBreweryReviews, editReview} = useContext(ReviewContext);

  const [ratingNum, setRatingNum] = useState(3);
  const [description, setDescription] = useState('');

  const breweryId = navigation.getParam('breweryId')
  const breweryName = navigation.getParam('breweryName')
  const breweryFontSize = navigation.getParam('breweryFontSize')
  const isEditingAReview = navigation.getParam('isEditingAReview')
  const reviewId = navigation.getParam('reviewId')
  var reviewDescription = ''
  var reviewRating = 3

  //

  if (isEditingAReview) {
    // need to make a context method for getting a review by using the review id
    reviewDescription = 'REVIEW DESCRIPTION' //placeholder
    reviewRating = 2 //placeholder
  }

  logMethod = () => {
    console.log(ratingNum);
    console.log(description);
    console.log(breweryId);
    console.log(breweryName);
  }

    return (
      <ScrollView style={styles.container}>
      <Text
            style={{fontSize: breweryFontSize, textAlign: 'center', fontWeight: 'bold', marginTop: 25, paddingBottom: 5}}>{breweryName}
      </Text>
        <View style={styles.viewBox}>
          <AirbnbRating
            count={5}
            reviews={["Terrible", "Bad", "Okay", "Good", "Great"]}
            defaultRating= {isEditingAReview ? (reviewRating) : (3)}
            size={50}
            onFinishRating={(newRating) => {
                setRatingNum(newRating);
            }}
          />
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              marginTop: 15,
              marginBottom: 15
            }}
          />
          <TextInput
            value={description}
            placeholder = {isEditingAReview ? (reviewDescription) : ("Write the review here. Make sure to include examples about what you do and do not like.")}
            autoCapitalize="none"
            autoCorrect={false}
            multiline={true}
            onChangeText={(newDescription) => {
                setDescription(newDescription);
            }}
          />
          </View>
          <View style={styles.buttonContainer}>
            {!isEditingAReview ? (
              <WelcomeButton
                  title="Submit"
                  onPress={async ()=> {
                    logMethod()
                    var message = description;
                    var rating = ratingNum;
                    console.log({message, breweryId, rating})
                    var response = await createReview({message, breweryId, rating});
                    var getReviewsResponse = await getBreweryReviews({breweryId});
                  }}
                />)
                :
                (<WelcomeButton
                  title="Update"
                  onPress={async ()=> {
                    logMethod()
                    var message = description;
                    var rating = ratingNum;
                    console.log({message, breweryId, rating})
                    var response = await editReview({breweryId, message, rating, reviewId});
                    var getReviewsResponse = await getBreweryReviews({breweryId});
                  }}
              />)}
          </View>
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
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    borderRadius: 10,
    borderStyle: 'dashed',
    borderWidth: 1,
    height: 500,
    paddingLeft: 5,
    paddingRight:5
  },
  buttonContainer: {
      alignItems: "center"
  }
});

export default WriteReviewScreen
