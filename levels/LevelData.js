/*
DESCRIPTION: Handles each level's data
DATE CREATED: 2023-10-11
LAST MODIFIED: 2023-10-11, BY: Zach Klimas

AUTHOR(S):
Zach Klimas
Creator


...

*/


import level1Background from '../assets/Background/1SpaceWalk.jpg';
import level1Blurred from '../assets/Background/1SpaceWalkBlurred.jpg';

import level2Background from '../assets/Background/2RocketShip.jpg';
import level2Blurred from '../assets/Background/2RocketShipBlurred.jpg';

import level3Background from '../assets/Background/3Martian.jpg';
import level3Blurred from '../assets/Background/3MartianBlurred.jpg';

import level4Background from '../assets/Background/4BlackHole.jpg';
import level4Blurred from '../assets/Background/4BlackHoleBlurred.jpg';




const levelData = {
   1: {
    title: "Space walk",
    coordinates: [
      [0, 2],
      [1, 2],
      [2, 2],
      [2, 3],
      [3, 3],
      [4, 3],
      [5, 3],
      [5, 2],
      [5, 1],
      [6, 1],
      [7, 1],
      [8, 1],
    ],
    questionSquares: [
      [2, 2],
      [4, 3],
      [5, 2],
      [6, 1],
    ],
    heartSquares: [
      [1, 2],
      [5, 3],
      [7, 1],
    ],
  
    boardDimensions: [9, 3],
    background: level1Background,
    startScreenBackground: level1Blurred,
   
  },
  2: {
    title: "Rocket Ship",
    coordinates: [
      [0, 0],
      [1, 0],
      [1, 1],
      [2, 1],
      [3, 1],
      [4, 1],
      [5, 1],
      [6, 1],
      [7, 1],
      [8, 1],
      [9, 2],
      [8, 3],
      [7, 3],
      [6, 3],
      [5, 3],
      [4, 3],
      [3, 3],
      [2, 3],
      [1, 3],
      [1, 4],
      [0, 4],
    ],
    questionSquares: [
      [7, 1],
      [2, 1],
      [8, 1],
      [7, 3],
      [1, 3],
      [3, 3],
    ],    
    heartSquares: [
      [1, 4],
      [5, 1],
      [4, 3],
      [8, 3]
    ],
  
    boardDimensions: [10, 4],
    background: level2Background,
    startScreenBackground: level2Blurred,
  },
  3: {
    title: "The Martian",
    coordinates: [
      [0,6],
      [1,6],
      [2,6],
      [3,6],
      [4,6],
      [5,5],
      [5,4],
      [5,3],
      [5,2],
      [5,1],
      [6,0],
      [7,1],
      [7,2],
      [8,3],
      [9,2],
      [9,1],
      [10,0],
      [11,1],
      [11,2],
      [11,3],
      [11,4],
      [10,5],
      [10,6],
      [11,6],
      [12,6],
      [13,6],
      [14,6],
      
    ],
    questionSquares: [
      [2, 6],
      [4, 6],
      [5, 4],
      [6, 0],
      [7, 2],
      [11, 1],
      [11, 4],
      [11, 6],
    ],    
    heartSquares: [
      [5, 2],
      [8, 3],
      [10, 0],
      [11, 3]
    ],    
    boardDimensions: [16, 6],
    background: level3Background,
    startScreenBackground: level3Blurred,
  },
  4 : {
    title: "Black Hole",
    coordinates: [
      [0, 2],
      [1, 2],
      [1, 1],
      [2, 1],
      [3, 1],
      [3, 0],
      [4, 0],
      [5, 0],
      [6, 0],
      [7, 0],
      [8, 0],
      [9, 0],
      [9, 1],
      [10, 1],
      [11, 1],
      [11, 2],
      [12, 2],
      [12, 3],
      [12, 4],
      [12, 5],
      [11, 5],
      [11, 6],
      [10, 6],
      [9, 6],
      [8, 6],
      [7, 6],
      [6, 6],
      [6, 5],
      [5, 5],
      [5, 4],
      [5, 3],
      [6, 3],
      [6, 2],
      [7, 2],
      [8, 2],
      [8, 3],
      [9, 3],
      [9, 4],
    ],
    questionSquares: [
      [1, 2],
      [3, 1],
      [3, 0],
      [7, 0],
      [10, 1],
      [12, 3],
      [10, 6],
      [7, 6],
      [6, 3],
      [8, 2],
    ],    
    heartSquares: [
      [5, 0],
      [12, 4],
      [11, 6],
      [9, 6],
      [6, 5],
      [5, 3],
    ],
    boardDimensions: [16, 6],
    background: level4Background,
    startScreenBackground: level4Blurred,
  }
};

export default levelData;