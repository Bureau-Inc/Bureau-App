# BureauApp

## Getting Started
 Follow the instructions given below to run the app locally.

### Requirements

Node 8 or greater is required. Development for iOS requires a Mac and Xcode 9 or up, and will target iOS 9 and up.

You also need to install the dependencies required by React Native:

- for [Android development](https://facebook.github.io/react-native/docs/getting-started.html#installing-dependencies-3)
- for [iOS development](https://facebook.github.io/react-native/docs/getting-started.html#installing-dependencies)

### Development/Local running

Assuming you have all the requirements installed, you can setup and run the project by running:

- `npm install` to install the dependencies
- run the following steps for your platform

#### Android

- `npm start` to start the metro bundler, in a dedicated terminal
- `npm run android` to run the Android application (remember to start a simulator or connect an Android phone)

#### iOS

- `cd ios`
- `pod install` to install pod dependencies
- `cd ..` to come back to the root folder
- `npm start` to start the metro bundler, in a dedicated terminal
- `npm run ios` to run the iOS application (remember to start a simulator or connect an iPhone phone)