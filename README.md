# FamBrews
  FamBrews aims to address  a problem that many young parents and families face when choosing how to spend their time together: how can we find a location that allows everyone (including parents, children, and maybe even the dog!) to not only attend, but to be entertained and enjoy themselves while there?
  We found the current entertainment business review applications are lacking in information surrounding family friendly accommodations, specifically in relation to breweries.
  FamBrews attempts to solve this issue by allowing users to search for breweries in their location that might meet their search/filter criteria, all while focusing on providing information regarding family friendly accommodations from things like changing tables, all the way to outdoor spaces for pets.
  
# Install Guide
## Pre-Requisites:
   * NPM: this is the Node Package Manager that allows us to install entire packages of Node components, such as the various components used in the React Native application we've created; the version of NPM we have installed is **v6.4.1** -- you can install NPM here: https://nodejs.org/en/ 
   * Expo: this is the application that allows us to develop our application and simulate it on a real device prior to release; it also allows for building out the release documents of the application to be put on the Apple and Android app stores -- once you've installed NPM, you can install expo using the following command line command: "npm -i expo-cli"
      * for more information on how to get started with Expo, see this link: https://facebook.github.io/react-native/docs/getting-started
   * React Native: in order to speed up the development process for both Android and iOS applications, we opted to build out the frontend/UI components of the application using React Native; the version currently being used for this project is **v0.59.8** -- you can install React Native through Expo
   * iOS or Android expo application: the Expo development application has a corresponding iOS and Android application that can be used to simulate this application on your real device
   
   
## Dependent Node Packages:
The following list contains all of the currently-installed/-used Node packages (installed from NPM) in the frontend/UI portion of this project. Note, to install each individually you can use the following syntax from your command line: "npm -i __name_of_package__"  
To install all required packages at once, "cd" into the folder created by cloning this repository and run the following from your command line: "npm -i"  
Each time you download this repository, if the NPM packages have changed you'll need to re-run the "npm -i" command inside this directory.
### Packages: 
For a complete list of the packages installed in this directory, please see the "package.json" file located inside of the repo for this project.
  
  
  
## Build Instructions
  ### Using Expo
   * Clone this repository down to your local machine
   ` git clone https://github.com/seanmbills/FamilyFriendlyBreweryTracker.git `
   * Navigate into the cloned `FamilyFriendlyBreweryTracker/` directory
   * Install necessary node js packages
   ` npm install `
   * Start your expo client
   ` expo start `
   * A new tab should open in your default web browser. There should be a QR code in the bottom left-hand side of this tab.
     Scan this QR code with your iPhone or Android to launch the application.
   ** Note: if you scan the QR code and find your mobile device says "this application is taking longer than expected to load,"
     try switching the setting above the QR Code to tunnel, rather than LAN. 
 ### Building the iOS and Android Release Files
 Once you're ready to release your developed application to the world, you can make use of the following command in expo to build out your project into its necessary release files: `expo build:ios` or `expo build:android`
 **NOTE:** If you attempt to build an iOS version of your application, you'll need to have valid iOS developer credentials associated with your iOS account. See here for more details: https://developer.apple.com/programs/  
   
 
## Run Instructions
See the above section for "Using Expo".

## Troubleshooting
When developing the frontend portion of this project, the most often issues that you'll encounter include React Native "warnings" and "errors". In the first case, you'll see a small yellow banner across the bottom of the screen indicating what the warning is for. Oftentimes it will be for something in relation to an "Unhandled Promise Rejection" or updating a React state after a screen has unmounted.  
In the second case, errors, the screen will produce a large red error message/indicator. Sometimes these indicators are fairly representative of what the issue is, and sometimes not so much. Usually your Expo client will be running with active debugging turned on. If this is the case, you'll generally see a more descriptive error message displayed in the command line/terminal you're running Expo in. If you don't have debugging turned on, see here: https://docs.expo.io/versions/latest/workflow/debugging/


   

# Release Notes (v1.0.0)


