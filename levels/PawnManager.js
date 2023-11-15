// PawnManager.js
import React, { useState, useCallback } from 'react';
import { Animated } from 'react-native';
import PropTypes from 'prop-types';

export const PawnManager = ({ coordinates, squareSize, onWin, onQuestionSquare }) => {
  const [pawnPosition, setPawnPosition] = useState(0);
  const pawnAnimatedPosition = useState(
    new Animated.ValueXY({
      x: coordinates[0][0] * squareSize - 3,
      y: coordinates[0][1] * squareSize - 30,
    })
  )[0];

  const animatePawn = useCallback((from, to) => {
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
        toValue: { x: nextX * squareSize - 3, y: nextY * squareSize - 30 },
        duration,
        useNativeDriver: false,
      }).start(() => {
        stepAnimation();
      });
    };

    stepAnimation();
  }, [coordinates, squareSize, pawnAnimatedPosition]);

  const movePawn = useCallback((steps) => {
    let newPawnPosition = pawnPosition + steps;
    if (newPawnPosition >= coordinates.length) {
      onWin();
      newPawnPosition = 0; // reset position for now
    }

    animatePawn(pawnPosition, newPawnPosition);
    setPawnPosition(newPawnPosition);

    if (onQuestionSquare(newPawnPosition)) {
      return true; // indicates a question square was landed on
    }

    return false;
  }, [pawnPosition, coordinates, onWin, animatePawn, onQuestionSquare]);

  return {
    pawnPosition,
    setPawnPosition,
    pawnAnimatedPosition,
    movePawn,
  };
};

PawnManager.propTypes = {
  coordinates: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  squareSize: PropTypes.number.isRequired,
  onWin: PropTypes.func.isRequired,
  onQuestionSquare: PropTypes.func.isRequired,
};
