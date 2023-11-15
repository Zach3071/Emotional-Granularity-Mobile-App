import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';
import levelData from '../levels/LevelData';

const LevelStartScreen = ({ route, navigation }) => {
  
  // stores the current level number in a level var
  const { level } = route.params;
  const currentLevelData = levelData[level];
  const handlePlay = () => {
    // navigation.navigate(`Level${level}`);
    navigation.navigate("GenericLevel", { level });
  };

  const handleExit = () => {
    navigation.navigate('LevelSelector');
  };

  return (
    <ImageBackground source={levelData[level].startScreenBackground} style={levelStartScreenStyles.backgroundImage}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={levelStartScreenStyles.title}>{`Welcome to Level ${level}`}</Text>
        <TouchableOpacity style={levelStartScreenStyles.playButton} onPress={handlePlay}>
          <Text style={levelStartScreenStyles.buttonText}>Play</Text>
        </TouchableOpacity>
        <TouchableOpacity style={levelStartScreenStyles.exitButton} onPress={handleExit}>
          <Text style={{ color: 'white', fontSize: 35, fontWeight: 'bold' }}>Exit</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

LevelStartScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

const levelStartScreenStyles = StyleSheet.create({
  playButton: {
    backgroundColor: '#3498db',
    color: 'white',
    fontSize: 50,
    padding: 10,
    borderRadius: 25,
    margin: 50
  },
  exitButton: {
    backgroundColor: 'grey',
    color: 'white',
    fontSize: 35,
    padding: 10,
    borderRadius: 20,
    
    // iOS shadow properties
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  
    // Android elevation for shadow
    elevation: 5,
  },
  buttonText: {
    fontSize: 50,
    color: 'white',
    textAlign: 'center',
  },
  title: {
    fontSize: 50,
    marginBottom: 20,
    fontStyle: 'normal',
    fontWeight: "bold",
    color: 'white', 

    textShadowColor: 'rgba(0, 0, 0, 0.75)', 
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,

    backgroundColor: 'rgba(0, 0, 0, 0.3)', 

    // Adjusting padding to create more space around the text
    paddingHorizontal: 20,  
    paddingVertical: 10,

    // Assuming the height of the title background is 70 (from fontSize and padding), setting borderRadius to half of that for a capsule effect
    borderRadius: 35,       

    letterSpacing: 2, 
  },
  customButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,  // This will make it curved
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5, // Some space between buttons
},
  buttonText: {
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold'
},
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
},
});


export default LevelStartScreen;
