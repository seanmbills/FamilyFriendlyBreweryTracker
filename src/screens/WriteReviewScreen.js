import React, { useState, useContext, Component} from 'react';
import {View, StyleSheet, Text, TextInput, ScrollView, Dimensions, TouchableOpacity, Linking, Platform} from 'react-native'
import {Rating, AirbnbRating} from 'react-native-ratings'
import WelcomeButton from '../components/WelcomeButton';
import {Context as ReviewContext} from '../context/ReviewContext';
import BufferPopup from '../components/BufferPopup';
import SignInPrompt from '../components/SignInPrompt';
import Dialog, {DialogContent} from 'react-native-popup-dialog';

class WriteReviewScreenComponent extends Component {
  state = {
    isLoading: true,
    foundUser: true,
  }


  async componentDidMount() {
    let {state, testForToken} = this.context;
    var userPresent = await testForToken();
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
WriteReviewScreenComponent.contextType = ReviewContext;

const WriteReviewScreen = ({navigation}) => {
  const {state, createReview, getBreweryReviews} = useContext(ReviewContext);

  const [ratingNum, setRatingNum] = useState(3);
  const [description, setDescription] = useState('');
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [showErrMsg, setShowErrMsg] = useState(false);

  const breweryId = navigation.getParam('breweryId')
  const breweryName = navigation.getParam('name')
  const breweryFontSize = navigation.getParam('breweryFontSize')

  logMethod = () => {
    console.log(ratingNum);
    console.log(description);
    console.log(breweryId);
    console.log(breweryName);
  }

  // ratingCompleted(rating) {
  //   console.log("Rating is: " + rating);
  // }

    return (
      <ScrollView style={styles.container}>
      <Text
            style={{fontSize: breweryFontSize, textAlign: 'center', fontWeight: 'bold', marginTop: 25, paddingBottom: 5}}>{breweryName}
      </Text>
        <View style={styles.viewBox}>
          <AirbnbRating
            count={5}
            reviews={["Terrible", "Bad", "Okay", "Good", "Great"]}
            defaultRating={3}
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
            placeholder="Write the review here. Make sure to include examples about what you do and do not like."
            autoCapitalize="none"
            autoCorrect={false}
            multiline={true}
            onChangeText={(newDescription) => {
                setDescription(newDescription);
            }}
          />
          </View>
          <View style={styles.buttonContainer}>
              <WelcomeButton
                  title="Submit"
                  onPress={async ()=> {
                    logMethod()
                    var message = description;
                    var rating = ratingNum;
                    console.log({message, breweryId, rating})
                    var response = await createReview({message, breweryId, rating});
                    var getReviewsResponse = await getBreweryReviews({breweryId});
                    if (response && response.status < 400) {
                        setShowSuccessMsg(true);
                    } else {
                        setShowSuccessMsg(false);
                        setShowErrMsg(true);
                    }
                  }}
              />
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
