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
          style={[styles.square, isWinningSquare(i) && styles.winningSquare(winner.player)]}
          onPress={() => onClick(i)}>
          <Text style={[styles.squareText, { color: square === 'X' ? 'red' : (square === 'O' ? 'yellow' : "yellow") }]}>{square}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    width: 300, // Set width of the board
    height: 300, // Set height of the board
  },
  square: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: '#262959',
    justifyContent: 'center',
    alignItems: 'center',
  },
  squareText: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  winningSquare: (winner) => ({
    backgroundColor: winner === 'X' ? '#262959' : '#262959',
  }),
});

export default Board;
