import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Board5x5 = ({ board, onClick, winner }) => {
  const isWinningSquare = (i) => {
    if (!winner) {
      return false;
    }
    const winningSquares = winner.line;
    return winningSquares.includes(i);
  };

  const getSymbolColor = (symbol) => {
    switch (symbol) {
      case '₹': return '#d32f2f';  // Red
      case '$': return '#fbc02d';  // Yellow
      case '€': return '#4caf50';  // Green (Triangle)
      default: return 'transparent';
    }
  };

  return (
    <View style={styles.board}>
      {board.map((square, i) => (
        <TouchableOpacity
          key={i}
          style={[
            styles.square,
            isWinningSquare(i) ? styles.winningSquare : {},
            { backgroundColor: getSymbolColor(square) },
          ]}
          onPress={() => onClick(i)}
        >
          <Text style={styles.squareText}>
            {square}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 400,  // Adjusted for 5x5
    height: 400, // Adjusted for 5x5
  },
  square: {
    width: 80,  // Adjusted for 5x5
    height: 80, // Adjusted for 5x5
    borderWidth: 2,
    borderColor: '#5c5f96',
    justifyContent: 'center',
    alignItems: 'center',
  },
  squareText: {
    fontSize: 40, // Adjusted for 5x5
    fontWeight: 'bold',
  },
  winningSquare: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Semi-transparent white to highlight the winning squares
  },
});

export default Board5x5;
