/*
DESCRIPTION: Holds all the questions and their answers
DATE CREATED: 2023-10-15
LAST MODIFIED: 2023-10-15, BY: Joshua Blue

AUTHOR(S):
Joshua Blue
Creator


...

*/

const questionData = {
    1 : {
        question : 'You finished a difficult puzzle all by yourself. How do you feel?',
        answers : ['Accomplished', 'Tense', 'Lost', 'Jealous'],
        answerScore : [3, 1, -1, -1]
    },
    
    2 : {
        question : 'A friend shared their snack with you. How do you feel?',
        answers : ['Happy', 'Appreciative', 'Jealous', 'Angry'],
        answerScore : [1, 3, -1, -1]
    },
    3 : {
        question : 'You got a lower score on a test than you expected. How do you feel?',
        answers : ['Motivated', 'Disappointed', 'Nervous', 'Excited'],
        answerScore : [0, 3, 1, -1]
    },
    4 : {
        question : 'Your best friend moved away. How do you feel?',
        answers : ['Abandoned', 'Inspired', 'Joyful', 'Calm'],
        answerScore : [3, 0, -1, 0]
    },
    5 : {
        question : 'You were given the responsibility of leading a group project. How do you feel?',
        answers : ['Confident', 'Overwhelmed', 'Resentful', 'Relaxed'],
        answerScore : [3, 3, 1, 0]
    },
    6 : {
        question : 'A friend complimented your outfit. How do you feel?',
        answers : ['Flattered', 'Suspicious', 'Annoyed', 'Confused'],
        answerScore : [3, -1, 0, 2]
    },
    7 : {
        question : 'You found a lost item and returned it to its owner. How do you feel?',
        answers : ['Righteous', 'Bothered', 'Joyful', 'Regretful'],
        answerScore : [3, 0, 2, -1]
    },
    8 : {
        question : 'You watched a heartwarming movie about animals. How do you feel?',
        answers : ['Moved', 'Bored', 'Happy', 'Annoyed'],
        answerScore : [3, 0, 2, -1]
    },
    9 : {
        question : 'You lost a game that you practiced hard for. How do you feel?',
        answers : ['Frustrated', 'Indifferent', 'Joyous', 'Content'],
        answerScore : [3, 0, -1, 1]
    },

}

export default questionData;