import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Board5x5 from './Board5x5';
import PlayerSetup3 from '../components/others/PlayerSetup3';

const Game5x5 = ({ navigation }) => {
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [board, setBoard] = useState(Array(25).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState(0); // Player 0 = ₹, Player 1 = $, Player 2 = €
  const [players, setPlayers] = useState({});

  const handleSetupComplete = (players) => {
    setPlayers(players);
    // Set the player who chose the symbol in red to go first
    const firstPlayerIndex = Object.values(players).findIndex(player => player.symbol === '₹');
    setCurrentPlayer(firstPlayerIndex !== -1 ? firstPlayerIndex : 0); // Default to player 0 if not found
    setIsSetupComplete(true);
  };

  const handleClick = (i) => {
    const newBoard = [...board];
    if (calculateWinner(newBoard) || newBoard[i]) {
      return;
    }
    const symbols = ['₹', '$', '€'];
    newBoard[i] = symbols[currentPlayer];
    setBoard(newBoard);
    setCurrentPlayer((currentPlayer + 1) % 3);
  };

  const winner = calculateWinner(board);

  const handleBack = () => {
    navigation.goBack();
  };

  const renderStatus = () => {
    const isDraw = board.every((square) => square !== null);
    if (winner) {
      const winningPlayer = Object.values(players).find(player => player.symbol === winner.player);
      return (
        <View style={[styles.statusContainer, { backgroundColor: getColorForPlayer(winner.player) }]}>
          <Text style={styles.statusText}>Winner: {winningPlayer ? winningPlayer.name : 'Unknown'}</Text>
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
          {Object.values(players).map((player, index) => (
            <Text
              key={index}
              style={[
                styles.turnText,
                { color: currentPlayer === index ? getColorForPlayer(player.symbol) : '#757575' }
              ]}
            >
              {player.name} ({player.symbol})
            </Text>
          ))}
        </View>
      );
    }
  };

  const getColorForPlayer = (symbol) => {
    switch (symbol) {
      case '₹': return '#d32f2f';  // Red
      case '$': return '#fbc02d';  // Yellow
      case '€': return '#4caf50';  // Green
      default: return 'transparent';
    }
  };

  return (
    <View style={styles.container}>
      {!isSetupComplete ? (
        <PlayerSetup3 onSetupComplete={handleSetupComplete} />
      ) : (
        <>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Ionicons name="arrow-back" size={30} color="white" />
            </TouchableOpacity>
            <Text style={styles.heading}>Play with 3 Players</Text>
          </View>
          {renderStatus()}
          <Board5x5 board={board} onClick={handleClick} winner={winner} />
          <TouchableOpacity
            onPress={() => setBoard(Array(25).fill(null))}
            style={styles.button}>
            <Text style={styles.buttonText}>Reset Game</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const calculateWinner = (board) => {
  const lines = [];

  // Rows
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j <= 1; j++) {
      lines.push([i * 5 + j, i * 5 + j + 1, i * 5 + j + 2, i * 5 + j + 3]);
    }
  }

  // Columns
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j <= 1; j++) {
      lines.push([j * 5 + i, (j + 1) * 5 + i, (j + 2) * 5 + i, (j + 3) * 5 + i]);
    }
  }

  // Diagonals
  for (let i = 0; i <= 1; i++) {
    for (let j = 0; j <= 1; j++) {
      lines.push([i * 5 + j, (i + 1) * 5 + j + 1, (i + 2) * 5 + j + 2, (i + 3) * 5 + j + 3]);
      lines.push([i * 5 + j + 3, (i + 1) * 5 + j + 2, (i + 2) * 5 + j + 1, (i + 3) * 5 + j]);
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, d] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c] && board[a] === board[d]) {
      return { player: board[a], line: [a, b, c, d] };
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

export default Game5x5;
