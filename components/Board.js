import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Board = ({ board, onClick, winner }) => {
  const isWinningSquare = (i) => {
    if (!winner) {
      return false;
    }
    const winningSquares = winner.line;
    return winningSquares.includes(i);
  };

  return (
    <View style={styles.board}>
      {board.map((square, i) => (
        <TouchableOpacity
          key={i}
          style={[
            styles.square,
            isWinningSquare(i) ? styles.winningSquare : {},
            { backgroundColor: square === 'X' ? '#d32f2f' : (square === 'O' ? '#fbc02d' : 'transparent') },
          ]}
          onPress={() => onClick(i)}
        >
          <Text style={[styles.squareText, { color: square === 'X' ? '#000' : (square === 'O' ? '#000' : '#ffffff') }]}>
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
    width: 300,
    height: 300,
  },
  square: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: '#5c5f96',
    justifyContent: 'center',
    alignItems: 'center',
  },
  squareText: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  winningSquare: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Semi-transparent white to highlight the winning squares
  },
});

export default Board;
