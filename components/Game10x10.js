import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Board10x10 from './Board10x10';
import PlayerSetup4 from '../components/others/PlayerSetup4';

const Game10x10 = ({ navigation }) => {
  const [board, setBoard] = useState(Array(100).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [players, setPlayers] = useState(null);

  const handleSetupComplete = (playerSetup) => {
    setPlayers([
      playerSetup.player1,
      playerSetup.player2,
      playerSetup.player3,
      playerSetup.player4
    ]);
  };

  const handleClick = (i) => {
    const newBoard = [...board];
    if (calculateWinner(newBoard) || newBoard[i] || !players) {
      return;
    }
    newBoard[i] = players[currentPlayer].symbol;
    setBoard(newBoard);
    setCurrentPlayer((currentPlayer + 1) % 4);
  };

  const winner = calculateWinner(board);

  const handleBack = () => {
    navigation.goBack();
  };

  const renderStatus = () => {
    const isDraw = board.every((square) => square !== null);
    if (winner) {
      const winnerPlayer = players.find(player => player.symbol === winner.player);
      return (
        <View style={[styles.statusContainer, { backgroundColor: getColorForPlayer(winnerPlayer.symbol) }]}>
          <Text style={styles.statusText}>Winner: {winnerPlayer.name}</Text>
        </View>
      );
    } else if (isDraw) {
      return (
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>Draw</Text>
        </View>
      );
    } else if (players) {
      return (
        <View style={styles.turnContainer}>
          {players.map((player, index) => (
            <View key={index} style={styles.turnItem}>
              <Text style={[styles.turnText, { color: currentPlayer === index ? getColorForPlayer(player.symbol) : '#757575' }]}>
                {player.symbol}
              </Text>
              <Text style={[styles.turnText, { color: currentPlayer === index ? getColorForPlayer(player.symbol) : '#757575' }]}>
                {player.name}
              </Text>
            </View>
          ))}
        </View>
      );
    }
  };

  const getColorForPlayer = (symbol) => {
    switch (symbol) {
      case '♧': return '#d32f2f';  // Red
      case '♢': return '#fbc02d';  // Yellow
      case '♡': return '#4caf50';  // Green
      case '♤': return '#2196f3';  // Blue
      default: return 'transparent';
    }
  };

  return (
    <View style={styles.container}>
      {players ? (
        <>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Ionicons name="arrow-back" size={30} color="white" />
            </TouchableOpacity>
            <Text style={styles.heading}>Play with 4 Players</Text>
          </View>
          {renderStatus()}
          <Board10x10 board={board} onClick={handleClick} winner={winner} />
          <TouchableOpacity
            onPress={() => setBoard(Array(100).fill(null))}
            style={styles.button}>
            <Text style={styles.buttonText}>Reset Game</Text>
          </TouchableOpacity>
        </>
      ) : (
        <PlayerSetup4 onSetupComplete={handleSetupComplete} />
      )}
    </View>
  );
};

const calculateWinner = (board) => {
  const lines = [];

  // Rows
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j <= 5; j++) {
      lines.push([i * 10 + j, i * 10 + j + 1, i * 10 + j + 2, i * 10 + j + 3, i * 10 + j + 4]);
    }
  }

  // Columns
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j <= 5; j++) {
      lines.push([j * 10 + i, (j + 1) * 10 + i, (j + 2) * 10 + i, (j + 3) * 10 + i, (j + 4) * 10 + i]);
    }
  }

  // Diagonals
  for (let i = 0; i <= 5; i++) {
    for (let j = 0; j <= 5; j++) {
      lines.push([i * 10 + j, (i + 1) * 10 + j + 1, (i + 2) * 10 + j + 2, (i + 3) * 10 + j + 3, (i + 4) * 10 + j + 4]);
      lines.push([i * 10 + j + 4, (i + 1) * 10 + j + 3, (i + 2) * 10 + j + 2, (i + 3) * 10 + j + 1, (i + 4) * 10 + j]);
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, d, e] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c] && board[a] === board[d] && board[a] === board[e]) {
      return { player: board[a] };
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
  backButton: {
    marginRight: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
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
  turnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  turnItem: {
    marginHorizontal: 10,
    alignItems: 'center',
  },
  turnText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#d32f2f',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Game10x10;
