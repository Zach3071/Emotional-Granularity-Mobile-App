/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, TouchableOpacity, Platform, BackHandler, ImageBackground} from 'react-native';
import styles from '../styles';
const background = require('../assets/Background/StartScreen.jpg');
const StartScreen = ({ navigation }) => {
  const handleStart = () => {
    navigation.navigate('LevelSelector');
  };

  return (
    <TouchableOpacity style={{ flex: 1 }} onPress={handleStart}>
      <ImageBackground source={background} style={buttonStyles.backgroundImage}>
        <View style={buttonStyles.container}>
          <Text style={buttonStyles.title}>Snakes & Ladders</Text>
          <Text style={buttonStyles.tapToStartText}>Tap to Start</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};


const buttonStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(255, 255, 255, 0.6)',  
  },
  tapToStartText: {
    fontSize: 50,
    color: 'grey',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    opacity: 0.5
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: 'center', 
  },
  title: {
    fontSize: 50,
    marginBottom: 20,
    fontStyle: 'normal',
    fontWeight: "bold",
    color: 'white'
  },
});

StartScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
  };

export default StartScreen;
