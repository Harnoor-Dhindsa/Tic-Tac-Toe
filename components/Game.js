import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Board from './Board';
import PlayerSetup from '../components/others/PlayerSetup';

const Game = ({ navigation }) => {
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [players, setPlayers] = useState({});
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState(null);

  const handleSetupComplete = (players) => {
    setPlayers(players);
    setCurrentPlayer(players.player1);
    setIsSetupComplete(true);
  };

  const handleClick = (i) => {
    const newBoard = [...board];
    if (calculateWinner(newBoard) || newBoard[i]) {
      return;
    }
    newBoard[i] = currentPlayer.symbol;
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === players.player1 ? players.player2 : players.player1);
  };

  const winner = calculateWinner(board);

  const handleBack = () => {
    navigation.goBack();
  };

  const renderStatus = () => {
    const isDraw = board.every((square) => square !== null);
    if (winner) {
      return (
        <View style={[styles.statusContainer, { backgroundColor: winner.player === players.player1.symbol ? '#d32f2f' : '#fbc02d' }]}>
          <Text style={styles.statusText}>Winner: {winner.player === players.player1.symbol ? players.player1.name : players.player2.name}</Text>
        </View>
      );
    } else if (isDraw) {
      return (
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>Draw</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.turnContainer}>
          <Text style={[styles.turnText, { color: currentPlayer.symbol === 'X' ? '#d32f2f' : '#757575' }]}>
            {players.player1.name} ({players.player1.symbol})
          </Text>
          <Text style={[styles.turnText, { color: currentPlayer.symbol === 'O' ? '#fbc02d' : '#757575' }]}>
            {players.player2.name} ({players.player2.symbol})
          </Text>
        </View>
      );
    }
  };

  if (!isSetupComplete) {
    return <PlayerSetup onSetupComplete={handleSetupComplete} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.heading}>Play with Friend</Text>
      </View>
      {renderStatus()}
      <Board board={board} onClick={handleClick} winner={winner} />
      <TouchableOpacity
        onPress={() => {
          setBoard(Array(9).fill(null));
          setCurrentPlayer(players.player1);
        }}
        style={styles.button}>
        <Text style={styles.buttonText}>Reset Game</Text>
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
    backgroundColor: '#1e1e2d',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
  },
  backButton: {
    padding: 10,
  },
  statusContainer: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  statusText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#d32f2f',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  turnContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  turnText: {
    fontSize: 20,
    marginHorizontal: 10,
    fontWeight: 'bold',
  },
});

export default Game;
