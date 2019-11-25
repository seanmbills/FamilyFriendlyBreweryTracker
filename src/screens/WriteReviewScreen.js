import React, { useState, useContext, Component} from 'react';
import {View, StyleSheet, Text, TextInput, ScrollView, Dimensions, TouchableOpacity, Linking, Platform} from 'react-native'
import {Rating, AirbnbRating} from 'react-native-ratings'
import WelcomeButton from '../components/WelcomeButton';
import {Context as ReviewContext} from '../context/ReviewContext';
import {Context as AuthContext} from '../context/AuthContext'
import BufferPopup from '../components/BufferPopup';
import SignInPrompt from '../components/SignInPrompt';
import Dialog, {DialogContent} from 'react-native-popup-dialog';

class WriteReviewScreenComponent extends Component {
  state = {
    isLoading: true,
    foundUser: true,
  }


  async componentDidMount() {
    let {state} = this.context;
    var userPresent = state.token && state.token !== ''
    console.log("User Present: " , userPresent)
    if (userPresent) {
      this.setState({foundUser: true})
    } else {
      this.setState({foundUser: false})
    }
    this.setState({isLoading: false})
  }

  render() {
    //console.log("User Present: ", userPresent)
    return (
      <View style={{flex:1}}>
        <BufferPopup isVisible={this.state.isLoading} text={"Fetching user info"} />
        {
          !this.state.isLoading && this.state.foundUser &&
          <WriteReviewScreen navigation={this.props.navigation}/>
        }
        {
          !this.state.isLoading && !this.state.foundUser &&
          <SignInPrompt isVisible={!this.state.foundUser} navigation={this.props.navigation}/>
        }
      </View>
    )
  }
}
WriteReviewScreenComponent.contextType = AuthContext;


const WriteReviewScreen = ({navigation}) => {
  const {createReview, getBreweryReviews, editReview, getReview} = useContext(ReviewContext);
  const authContext = useContext(AuthContext)

  const breweryId = navigation.getParam('breweryId')
  const breweryName = navigation.getParam('breweryName')
  const breweryFontSize = navigation.getParam('breweryFontSize')
  const isEditingAReview = navigation.getParam('isEditingAReview')
  const review = navigation.getParam('review')
  var reviewId = '';
  var reviewDescription = ''
  var reviewRating = 3;

  

  if (isEditingAReview) {
      reviewDescription = review.message;
      reviewRating = review.rating;
      reviewId = review.id;

  }

  const [ratingNum, setRatingNum] = useState(reviewRating);
  const [description, setDescription] = useState(reviewDescription);

  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [showErrMsg, setShowErrMsg] = useState(false);



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
                    var response = await createReview({message, breweryId, rating, token: authContext.state.token});
                    var getReviewsResponse = await getBreweryReviews({breweryId, token: authContext.state.token});
                    if (response && response.status < 400) {
                        setShowSuccessMsg(true);
                    } else {
                        setShowSuccessMsg(false);
                        setShowErrMsg(true);
                    }
                  }}
                />)
                :
                (<WelcomeButton
                  title="Update"
                  onPress={async ()=> {
                    logMethod()
                    var message = description;
                    var rating = ratingNum;
                    console.log({breweryId, message, rating, reviewId})
                    const params = {
                      token: authContext.state.token,
                      breweryId: breweryId,
                      message: message,
                      rating: rating,
                      reviewId: reviewId
                    }
                    var response = await editReview(params);
                    var getReviewsResponse = await getBreweryReviews({breweryId});
                  }}
              />)}
          </View>
          <Dialog visible={showSuccessMsg}>
            <DialogContent style={styles.dialogContent}>
                  <Text>Successfully Uploaded Review!</Text>
                  <WelcomeButton
                    title="Back"
                    onPress={async ()=>{
                      await setShowSuccessMsg(false)
                      navigation.goBack()
                    }}
                  />
            </DialogContent>
          </Dialog>
          <Dialog visible={showErrMsg}>
            <DialogContent style={StyleSheet.dialogContent}>
              <Text>Oops! Something went wrong</Text>
              <Text>We weren't able to upload your Review</Text>
              <WelcomeButton
                title="Back"
                onPress={async() => await setShowErrMsg(false)}
              />
            </DialogContent>
          </Dialog>
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
  },
  dialogContent: {
    alignItems: 'center',
    fontSize: 25,
    alignSelf: 'center'
  }
});

export default WriteReviewScreenComponent
