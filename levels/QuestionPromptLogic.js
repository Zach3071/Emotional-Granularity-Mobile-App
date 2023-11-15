/*
DESCRIPTION: Handles the question prompts of the game
DATE CREATED: 2023-09-20
LAST MODIFIED: 2023-09-20, BY: Joshua Blue

AUTHOR(S):
Joshua Blue
Creator


...

*/


import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const playfulColors = [
  '#FFA07A', // Light Salmon
  '#FFD700', // Gold
  '#ADFF2F', // Green Yellow
  '#20B2AA', // Light Sea Green
  '#DDA0DD', // Plum
  '#FFC0CB', // Pink
  '#FF6347', // Tomato
  '#FF69B4', // Hot Pink
  '#FF6B6B',  // Vibrant Red
  '#4ECDC4',  // Turquoise
  '#FFD166',  // Yellow Mellow
  '#83D1FB',  // Light Blue
  '#FFA69E',  // Salmon Pink
  '#A0E7E5',  // Aquamarine
  '#FF9F1C',  // Bright Orange
  '#B794F4',  // Lavender
  '#5A189A',  // Purple
  '#30BCED',  // Electric Blue
  '#FF4F2D',  // Tomato Red
  '#F25F5C',  // Dark Salmon
  '#50B3A2',  // Medium Turquoise
];

const getRandomPlayfulColor = () => {
  const randomIndex = Math.floor(Math.random() * playfulColors.length);
  return playfulColors[randomIndex];
};

// Shuffles the colour array for the answer text boxes
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const QuesionPrompt = ({ visible, question, answers, answerScore, onAnswer }) => {
  //const [selectedAnswer, setSelectedAnswer] = useState(null);

  const [shuffledColors, setShuffledColors] = useState([]);

  useEffect(() => {
    setShuffledColors(shuffleArray(playfulColors));
  }, [answers]);
  
  const handleAnswerClick = (index) => {
    //setSelectedAnswer(index);
    const score = answerScore[index];
    onAnswer(score);
  };


  return visible ? (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>{question}</Text>
      </View>
      <View>
        {answers.map((answer, index) => (
          <TouchableOpacity
          key={index}
          style={[
              styles.answerButton,
              { backgroundColor: shuffledColors[index % shuffledColors.length] },
              //selectedAnswer === index && styles.selectedAnswer,
          ]}
          onPress={() => handleAnswerClick(index)}
          //disabled={selectedAnswer !== null}
      >
            <Text style={styles.answerText}>{answer}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionContainer: {
    backgroundColor: 'white',
    padding: 20,           
    borderRadius: 20,      
    marginBottom: 20,
    shadowColor: "#000",   
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  question: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  answerButton: {
    padding: 10,
    marginBottom: 10,
    width: 200,
    alignItems: 'center',
    borderRadius: 10
  },
  selectedAnswer: {
    //backgroundColor: '#4CAF50',
  },
  answerText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold'
  },
});

export default QuesionPrompt;
