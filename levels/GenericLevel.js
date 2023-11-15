/*
DESCRIPTION: The main gameplay of our game.
DATE CREATED: 2023-09-11
LAST MODIFIED: 2023-10-11, BY: Zach Klimas

AUTHOR(S):
Joshua Blue
Implemented core functionality

Zach Klimas
Implemented Pawn Animation hopping through squares
Refactored code to make generic level screen 

...

*/


// Imports
import React, { useState, useEffect, useRef} from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  Animated,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Button
} from "react-native";
import Modal from 'react-native-modal';
import PropTypes from "prop-types";
import QuesionPrompt from "./QuestionPromptLogic";
import levelData from './LevelData';
import questionData from './QuestionData';
import Icon from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import SQLiteDriver from "../src/driver";


// Checks if the target square is in the list squares
// Use this instead of .includes() because .includes() uses strict comparison
function includesSquare(squares, target) {
  for(let s of squares) {
    if (s[0] == target[0] && s[1] == target[1]) {
      return true;
    }
  }
  return false;
}

// Renders the entire board and keeps track of useful information like pawn position
const Board = ({ navigation, coordinates, questionSquares, heartSquares, boardDimensions, level }) => {
  const screen = Dimensions.get("window");
  const squareSize = Math.min(
    (0.7 * screen.height) / boardDimensions[1],
    (0.7 * screen.width) / boardDimensions[0]
  );
  
  const heartAddedOpacity = useRef(new Animated.Value(0)).current;
  const [showHeartAddedText, setShowHeartAddedText] = useState(false);
  const [currentHearts, setCurrentHearts] = useState(0);

  useEffect(() => {
    // This function will run when the component is first mounted.
    // Fetch the current heart count from the database.
    const fetchInitialHearts = async () => {
      const initialHearts = await SQLiteDriver.getCurrentHearts();
      setCurrentHearts(initialHearts);
    };

    fetchInitialHearts();
  }, []);

  const heartOpacity = useState(new Animated.Value(0))[0];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);

  const [pawnPosition, setPawnPosition] = useState(0);
  const pawnAnimatedPosition = useState(
    new Animated.ValueXY({
      x: (coordinates[0][0] - 0.05 ) * squareSize,
      y: (coordinates[0][1] - 0.5 ) * squareSize,
    })
  )[0];
  const [facingDirection, setFacingDirection] = useState(1);

  const [lastRoll, setLastRoll] = useState(5);

  const animatePawn = (from, to) => {
    const duration = 500;
    let current = from;

    const stepAnimation = () => {
      if (current === to) return;

      if (current < to) {
        current += 1;
      } else {
        current -= 1;
      }
      const [nextX, nextY] = coordinates[current];

      Animated.timing(pawnAnimatedPosition, {
        toValue: { x: (nextX - 0.05) * squareSize, y: (nextY - 0.5) * squareSize},
        duration,
        useNativeDriver: false,
      }).start(() => {
        stepAnimation();
      });
    };

    stepAnimation();
  };

  const [canRoll, setCanRoll] = useState(true);

  const handleRollDie = () => {
    if (canRoll && !questionVisible) {
      setCanRoll(false);

      const randomRoll = Math.ceil(Math.random() * 3);
      setLastRoll(randomRoll);
      handleMove(randomRoll);
    }
  };

  const handleMove = async (movement) => {

    if (movement === 0) {
      setCanRoll(true);
      return;
    }

    let newPawnPosition = Math.min(
      pawnPosition + movement,
      coordinates.length - 1
    );
    
    console.log(coordinates[pawnPosition][0]);
    console.log(coordinates[newPawnPosition][0]);
    if (coordinates[pawnPosition][0] < coordinates[newPawnPosition][0]) {
      setFacingDirection(1);
    } else if(coordinates[pawnPosition][0] > coordinates[newPawnPosition][0]) {
      setFacingDirection(-1);
    }
    
    setPawnPosition(newPawnPosition);
    animatePawn(pawnPosition, newPawnPosition);

    setTimeout(() => {
      endMove(newPawnPosition,);
    }, movement*500);
  }

  const endMove = (newPawnPosition) => {
    handleWin(newPawnPosition);

    if (includesSquare(questionSquares, coordinates[newPawnPosition])) {
      handleQuestionSquare();
    }

    if(includesSquare(heartSquares, coordinates[newPawnPosition])) {
      handleHeartSquare();
    }

    setCanRoll(true);
  }

  const [questionVisible, setQuestionVisible] = useState(false);

  const handleQuestionSquare = () => {
      let randIndex = Math.ceil(Math.random()* Object.keys(questionData).length);
      setCurrentQuestionIndex(randIndex);
      setQuestionVisible(true);
  }

  const handleAnswer = (score) => {
    setQuestionVisible(false);
    handleMove(score);
  }

  const handleHeartSquare = async () => {
    await SQLiteDriver.addHearts(10);
    const fetchedHearts = await SQLiteDriver.getCurrentHearts();
    setCurrentHearts(fetchedHearts);
   
    setShowHeartAddedText(true);

    Animated.sequence([
      // Fade in
      Animated.timing(heartAddedOpacity, {
        toValue: 1,
        duration: 500, 
        useNativeDriver: true
      }),
      // Delay for 2 seconds
      Animated.delay(3000),
      // Fade out
      Animated.timing(heartAddedOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      })
    ]).start(() => {
      setShowHeartAddedText(false); // Hide the component after the animation
    });
}
  const HeartCounter = () => {
      return (
          <View style={levelStyles.heartCounter}>
            {/* This is where you'll link your heart image */}
            <Image source={require('../assets/heartNoBackground.png')} style={{ width: 45, height: 35}} />
            <Text style={levelStyles.heartText}>{currentHearts}</Text>
          </View>
      );
  }

  const HeartAddedText = () => {
    if (showHeartAddedText) {
      return (
        <Animated.View style={{ opacity: heartAddedOpacity, alignItems: 'center', marginTop: 5 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'pink' }}>
            +10 hearts
          </Text>
        </Animated.View>
      );
    }
    return null; // Don't render anything if showHeartAddedText is false
  };
  

  const handleWin = (newPawnPosition) => {
    if (newPawnPosition === coordinates.length - 1) {
      setPawnPosition(0);
      console.log("Current Level:", level);

      navigation.navigate("WinScreen", { level });
    }
  };



  return (
    <View>
        {/* Heart Counter Section */}
        <View>
          <View style={levelStyles.heartCounterContainer}>
              <HeartCounter/>
          </View>

          {/* Heart Added Text Section */}
          <View style={levelStyles.heartAddedContainer}>
              <HeartAddedText/>
          </View>
        </View>
    <View style={{ alignItems: "center", top: screen.height * 0.15 }}>
      
      <View style={{ width: screen.width * 0.7, height: screen.height * 0.7 }}>
        {coordinates.map((coordinate, index) => (
          <Image
            key={index}
            source={
              includesSquare(questionSquares, coordinate) ? require("../assets/questionmark.png") :
              includesSquare(heartSquares, coordinate) ? require("../assets/heart.png")           :
              coordinate == coordinates[coordinates.length -1] ? require("../assets/finish.png")           : 
              require("../assets/square.png")
            }
            style={{
              position: "absolute",
              left: coordinate[0] * squareSize,
              top: coordinate[1] * squareSize,
              width: squareSize * 0.9,
              height: squareSize * 0.9,
            }}
          />
        ))}
        <PawnAnimation
          squareSize={squareSize}
          pawnAnimatedPosition={pawnAnimatedPosition}
          direction={facingDirection}
        />
        <Modal
          isVisible={questionVisible}
          backdropBlur={{ type: 'light' }}
          onBackdropPress={() => setQuestionVisible(false)}
        >
          <QuesionPrompt 
            visible={questionVisible}
            question={questionData[currentQuestionIndex].question}
            answers={questionData[currentQuestionIndex].answers}
            answerScore={questionData[currentQuestionIndex].answerScore}
            onAnswer={handleAnswer}
          />
          </Modal>
        <Animated.Image
          source={require("../assets/heart.png")}
          style={{
            position: "absolute",
            left: coordinates[pawnPosition][0] * squareSize,
            top: coordinates[pawnPosition][1] * squareSize,
            width: squareSize * 0.9,
            height: squareSize * 0.9,
            opacity: heartOpacity,
          }}
        />
      </View>
      <DieButton onPress={handleRollDie} lastRoll={lastRoll} />
    
      </View>
    </View>
  );
};

Board.propTypes = {
  navigation: PropTypes.object.isRequired,
  coordinates: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  boardDimensions: PropTypes.arrayOf(PropTypes.number).isRequired,
};

// Animates the pawn to move across the squares slowly
const PawnAnimation = ({ squareSize, pawnAnimatedPosition, direction }) => (
    <Animated.Image
        source={require("../assets/Alien.gif")}
        style={{
            position: "absolute",
            left: pawnAnimatedPosition.x,  // This should be an Animated.Value
            top: pawnAnimatedPosition.y,   // This should also be an Animated.Value
            width: squareSize,
            height: squareSize,
            transform: [{scaleX: direction}]
        }}
    />
);

const diceImages = [
  require("../assets/dice/1.png"),
  require("../assets/dice/2.png"),
  require("../assets/dice/3.png"),
  require("../assets/dice/4.png"),
  require("../assets/dice/5.png"),
  require("../assets/dice/6.png"),
];

// Renders the die button
const DieButton = ({ onPress, lastRoll }) => (

  <TouchableOpacity onPress={onPress} style={levelStyles.dieButton}>
    <Image
      source={diceImages[lastRoll-1]}
      style={{
        width: 40,
        height: 40,
      }}
    />
  </TouchableOpacity>
);





// Puts it all together
const GenericLevel = ({ route, navigation }) => {

    const { level } = route.params;
    const currentLevelData = levelData[level];




    const [isSettingsVisible, setIsSettingsVisible] = useState(false);
    const handleSettingsPress = () => {
        setIsSettingsVisible(!isSettingsVisible);
    };
    const handleExitToMenu = () => {
        setIsSettingsVisible(false);
        navigation.navigate('LevelSelector');
    };

    const CustomButton = ({ title, onPress }) => {
        return (
            <TouchableOpacity onPress={onPress} style={levelStyles.customButton}>
                <Text style={levelStyles.buttonText}>{title}</Text>
            </TouchableOpacity>
        );
    };



    return (
        <ImageBackground source={currentLevelData.background} style={levelStyles.backgroundImage}>
            
            {/* Settings Icon */}
            <View style={levelStyles.settingsButtonContainer}>
                <Icon name="settings" size={30} color="white" onPress={handleSettingsPress} />
            </View>
            <Modal
                animationIn="slideInUp"
                animationOut="slideOutDown"
                transparent={true}
                visible={isSettingsVisible}
                onRequestClose={() => {
                    setIsSettingsVisible(false);
                }}
               
            >
                <View style={levelStyles.centeredView}>
                    <View style={levelStyles.modalView}>
                        <Text style={levelStyles.modalTitle}>Menu</Text>
                        <CustomButton title="Resume" onPress={handleSettingsPress} />
                        <CustomButton title="Exit to Menu" onPress={handleExitToMenu} />
                        
                    </View>
                </View>
            </Modal>
            

            {/* Provides current level's data */}
            <View style={{ alignItems: "center" }}>
                <Text style={levelStyles.title}>{currentLevelData.title}</Text>
                <Board
                    navigation={navigation}
                    coordinates={currentLevelData.coordinates}
                    questionSquares={currentLevelData.questionSquares}
                    heartSquares={currentLevelData.heartSquares}
                    boardDimensions={currentLevelData.boardDimensions}
                    level={level}
                />
            </View>
        </ImageBackground>
        );
    };



GenericLevel.propTypes = {
    navigation: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
  };

const levelStyles = StyleSheet.create({
  settingsButtonContainer: {
    position: 'absolute',
    top: 10,
    left: 15,
    zIndex: 1,
    padding: 5,
  },
  title: {
    position: "absolute",
    top: 10,
     // To avoid text sticking to the very left edge
    fontSize: 24,
    fontWeight: "bold",
    color: 'white',
    
    // Background, Padding, and Border
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent black
    padding: 10,
    borderRadius: 20, 
    
    // Shadow
    shadowColor: 'blue',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5, // For Android
  },
  dieButton: {
    backgroundColor: "#2BF",
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
    bottom: 15,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
},
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
},
  modalText: {
    marginBottom: 15,
    textAlign: "center"
},
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  },
  customButton: {
    backgroundColor: '#3498db', 
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,  // This will make it curved
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5, 
},
  buttonText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold'
},
  heartCounter: {
    position: 'absolute',
    top: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  heartText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 5,  
  },
  
  heartCounterContainer: {
    position: 'absolute',
    top: 20, 
    right: -100, 
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2  // ensures it's above other components
},

  heartAddedContainer: {
      position: 'absolute',
      top: 50,  
      right: -100,  
      zIndex: 2
  }

});

export default GenericLevel;
