import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window'); // Get the width of the device's screen
const BOARD_SIZE = width * 0.90; // Make the board 95% of the screen width
const SQUARE_SIZE = BOARD_SIZE / 10; // Divide the board size by 10 to get the size of each square

const Board10x10 = ({ board, onClick, winner }) => {
  const isWinningSquare = (i) => {
    if (!winner || !Array.isArray(winner.line)) {
      return false;
    }
    return winner.line.includes(i);
  };

  const getSymbolColor = (symbol) => {
    switch (symbol) {
      case '♧': return '#d32f2f';  // Red
      case '♢': return '#fbc02d';  // Yellow
      case '♡': return '#4caf50';  // Green (Triangle)
      case '♤': return '#2196f3';  // Blue (Square)
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
    width: BOARD_SIZE,
    height: BOARD_SIZE,
  },
  square: {
    width: SQUARE_SIZE,
    height: SQUARE_SIZE,
    borderWidth: 1,
    borderColor: '#5c5f96',
    justifyContent: 'center',
    alignItems: 'center',
  },
  squareText: {
    fontSize: SQUARE_SIZE / 1.5, // Adjust text size based on square size
    fontWeight: 'bold',
  },
  winningSquare: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Semi-transparent white to highlight the winning squares
  },
});

export default Board10x10;
