import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Board from './Board';

const Game = ({ navigation }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i) => {
    const newBoard = [...board];
    if (calculateWinner(newBoard) || newBoard[i]) {
      return;
    }
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const winner = calculateWinner(board);

  const handleBack = () => {
    navigation.goBack();
  };

  const renderStatus = () => {
    const isDraw = board.every((square) => square !== null);
    if (winner) {
      return <Text style={[styles.status, { color: winner.player === 'X' ? 'red' : 'yellow' }, {fontSize: 40, fontWeight: 'bold'}]}>Winner: {winner.player}</Text>;
    } else if (isDraw) {
      return <Text style={[styles.status, { color: 'white' }, {fontSize: 40, fontWeight: 'bold'}]}>Draw</Text>;
    } else {
      return (
        <View style={styles.turnContainer}>
          <Text style={[styles.turnText, { color: xIsNext ? 'red' : 'grey' }, {fontSize: 50, fontWeight: 'bold', marginRight: 90}]}>X</Text>
          <Text style={[styles.turnText, { color: xIsNext ? 'grey' : 'yellow' }, {fontSize: 50, fontWeight: 'bold'}]}>O</Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={44} color="white" />
        </TouchableOpacity>
        <Text style={styles.heading}>Play with Friend</Text>
      </View>
      {renderStatus()}
      <Board board={board} onClick={handleClick} winner={winner} />
      <TouchableOpacity 
        onPress={() => setBoard(Array(9).fill(null))} 
        style={[styles.button, {backgroundColor: 'red', borderRadius: 5, marginBottom: "20%",}]}>
        <Text style={[styles.buttonText, {color: 'yellow'}]}>Reset Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const calculateWinner = (board) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { player: board[a], line: [a, b, c] };
    }
  }
  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00022e',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 100,
  },
  heading: {
    fontSize: 34,
    fontWeight: 'bold',
    color: 'white',
  },
  backButton: {
    marginRight: 20,
  },
  status: {
    marginBottom: 20,
    fontSize: 24,
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 20,
  },
  turnContainer: {
    flexDirection: 'row',
  },
  turnText: {
    fontSize: 24,
    marginHorizontal: 10,
  },
});

export default Game;
