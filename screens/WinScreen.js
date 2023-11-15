import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MAX_LEVELS } from './LevelSelector';
import levelData from '../levels/LevelData'; 
import styles from '../styles';

const WinScreen = ({ route, navigation }) => {

  const numberOfLevels = Object.keys(levelData).length;
  const { level } = route.params;

  const handlePlayNext = () => {
    const nextLevel = level + 1;
    // Check if next level exists
    console.log("Current Level:", level, "Next Level:", nextLevel);

    
    
    if (nextLevel <= numberOfLevels) {
      navigation.navigate(`LevelStartScreen`, { level: nextLevel });
    }
  };

  const handleExit = () => {
    navigation.navigate('LevelSelector');
  };


  return (
    <View style={winScreenStyles.container}>
      <Text style={styles.title}>You Won!</Text>

      <View style={winScreenStyles.buttonContainer}>
        {/* This is to only show the "Play Next Level" button if it is not the final levell */}
        {level < numberOfLevels && (
          <TouchableOpacity onPress={handlePlayNext} style={winScreenStyles.nextButton}>
            <Text style={winScreenStyles.buttonText}>Play Next Level</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={handleExit} style={winScreenStyles.exitButton}>
          <Text style={winScreenStyles.buttonText}>Exit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const winScreenStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    nextButton: {
      backgroundColor: 'blue',
      padding: 15,
      marginHorizontal: 10,
      borderRadius: 5,
    },
    exitButton: {
      backgroundColor: 'red',
      padding: 15,
      borderRadius: 5,
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
    },
  });

export default WinScreen;