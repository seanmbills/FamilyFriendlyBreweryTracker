import React, { useState } from 'react';
import {View, StyleSheet, Text, TextInput, ScrollView, Dimensions, TouchableOpacity, Linking, Platform} from 'react-native'
import {Rating, AirbnbRating} from 'react-native-ratings'

const WriteReviewScreen = ({navigation}) => {
  const [ratingNum, setRatingNum] = useState(3);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const breweryId = navigation.getParam('breweryId')
  const breweryName = navigation.getParam('name')

  var star1, star2, star3, star4, star5 = false;

  logMethod = () => {
    console.log(title);
    console.log(ratingNum);
    console.log(breweryId);
    console.log(breweryName);
  }

  // ratingCompleted(rating) {
  //   console.log("Rating is: " + rating);
  // }

    return (
      // <View>
      // <Rating
      //   imageSize={30}
      //   onFinishRating={this.ratingCompleted}
      //   style={{ paddingVertical: 10 }}/>
      // </View>
      <View>
      <AirbnbRating
        count={5}
        reviews={["Terrible", "Bad", "Okay", "Good", "Great"]}
        defaultRating={3}
        size={50}
        onFinishRating={(newRating) => {
            setRatingNum(newRating);
        }}
      />
          <TextInput
              value={title}
              placeholder="Title"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(newTitle) => {
                  setTitle(newTitle);
              }}
          />
          <TouchableOpacity onPress={()=> logMethod()}>
            <Text>Push to log</Text>
          </TouchableOpacity>
      </View>



  );
};

export default WriteReviewScreen
