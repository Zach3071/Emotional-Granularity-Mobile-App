import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, ScrollView, TouchableOpacity, ImageBackground} from 'react-native';
// eslint-disable-next-line no-unused-vars

import levelData from '../levels/LevelData';
// decides how many levels we would like
const MAX_LEVELS = 5;
import background from '../assets/Background/LevelSelector2.jpg'




const LevelSelector = ({ navigation }) => {

  // takes to the level start screen
  const handlePress = (level) => {
    navigation.navigate('LevelStartScreen', { level });
  };

  const handleBack = () => {
    navigation.navigate('MainMenu');
  };

  // // just for now I have set levels length to 20
  // const levelsArray = Array.from({ length: MAX_LEVELS}, (_, index) => index + 1);

  const levelsArray = Object.keys(levelData).map(Number);
  return (
    <ImageBackground source={background} style={levelStyles.backgroundImage}>
      <View style={levelStyles.container}>
        <Text style={levelStyles.levelTitle}>Select your level!</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={levelStyles.scrollView}>
            {/* we can add more levels here eventually, by adding to the levelsArray */}
            {levelsArray.map((level) => (
              <TouchableOpacity
                key={level}
                style={levelStyles.levelBox}
                onPress={() => handlePress(level)}
              >
                {/* eventually images can be added here */}
                {/* <Image source={path to da image} style={styles.levelImage} /> */}
                {/* <Image source={background} style={levelStyles.levelImage} /> */}
                <Text style={levelStyles.levelText}>{`Level ${level}`}</Text>
              </TouchableOpacity>
            ))}
        </ScrollView>

        {/* <TouchableOpacity style={levelStyles.backButton} onPress={handleBack}>
          <Text style={{ fontSize: 12, color: 'white', textAlign: 'center', fontWeight: 'bold'}}> Back to Main Menu</Text>
        </TouchableOpacity> */}
      
      </View>
    </ImageBackground>
  );
};

LevelSelector.propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  import { StyleSheet } from 'react-native';

const levelStyles = StyleSheet.create({
  levelTitle: {
    paddingTop: 75,
    fontSize: 50, 
    fontWeight: 'bold',
    color: '#2fe3f7',  // Bright text color
    
    textShadowColor: 'rgba(50, 0, 50, 1)',  
    textShadowOffset: { width: 2, height: 2 },   
    textShadowRadius: 4,  // Increased radius for a blurrier shadow
    
    paddingHorizontal: 15, 
    paddingVertical: 10, 
    borderRadius: 20,    
    marginBottom: 20,     
  },
  levelBox: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'grey',
    borderRadius: 10,
    margin: 10,
    backgroundColor: '#e0ffff'
  },
  levelImage: {
    width: 90,
    height: 90,
  },
  levelText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'black'
  },
  levelsContainer: {
    paddingTop: 60, // space from top, stops the levels from hitting menu button
    paddingHorizontal: 0, 
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    marginTop: 50,
    marginHorizontal: 20,
    paddingHorizontal: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
});

export { MAX_LEVELS };
export default LevelSelector;