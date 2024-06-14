// gamewithAI.js

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Board from './Board';

const PLAYER_X = 'X';
const PLAYER_O = 'O';

const GamewithAI = ({ navigation }) => {
  const [board, setBoard] = useState(Array(9).fill(null)); // Initialize with null values

  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

  const [aiMovesCount, setAiMovesCount] = useState(0);

  const handlePlayerMove = (index) => {
    if (board[index] === null && isPlayerTurn) {
      const newBoard = [...board];
      newBoard[index] = PLAYER_X;
      setBoard(newBoard);
      setIsPlayerTurn(false);
    } else if (isPlayerTurn && aiMovesCount >= 4){
      if (board[index] === PLAYER_O) {
        const newBoard = [...board];
        newBoard[index] = PLAYER_X;
        setBoard(newBoard);
        setIsPlayerTurn(true);
        setAiMovesCount(aiMovesCount + 1);
      }
    }
  };

  const checkWinner = (currentBoard) => {
    const winLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winLines.length; i++) {
      const [a, b, c] = winLines[i];
      if (
        currentBoard[a] !== null &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return currentBoard[a];
      }
    }

    if (!currentBoard.includes(null)) {
      return 'draw';
    }

    return null;
  };

  const handleAIMove = () => {
    if (!isPlayerTurn) {
      const bestMove = minimax(board, PLAYER_O).index;
      const newBoard = [...board];
      newBoard[bestMove] = PLAYER_O;
      setBoard(newBoard);
      setIsPlayerTurn(true);
      setAiMovesCount(aiMovesCount + 1);
    }
  };

  useEffect(() => {
    if (!isPlayerTurn) {
      const winner = checkWinner(board);
      if (!winner) {
        const timeoutId = setTimeout(() => {
          handleAIMove();
        }, 100);

        return () => clearTimeout(timeoutId);
      } else {
        if (winner === 'draw') {
          Alert.alert('Game Over', 'It\'s a draw!');
        } else if (winner === PLAYER_O) {
          Alert.alert('C\'mon', "You can't beat me!");
        } else {
          Alert.alert('You are the GOAT', "That's a win!");
        }
        setBoard(Array(9).fill(null));
        setIsPlayerTurn(true);
        setAiMovesCount(0); // Reset AI moves count
      }
    }
  }, [board, isPlayerTurn]);

  const minimax = (currentBoard, player) => {
    const availableMoves = currentBoard.reduce((moves, cell, index) => {
      if (cell === null) {
        moves.push(index);
      }
      return moves;
    }, []);

    const opponent = player === PLAYER_X ? PLAYER_O : PLAYER_X;

    if (checkWinner(currentBoard) === PLAYER_O) {
      return { score: 1 };
    } else if (checkWinner(currentBoard) === PLAYER_X) {
      return { score: -1 };
    } else if (availableMoves.length === 0) {
      return { score: 0 };
    }

    const moves = [];
    for (let i = 0; i < availableMoves.length; i++) {
      const move = {};
      move.index = availableMoves[i];
      currentBoard[availableMoves[i]] = player;

      if (player === PLAYER_O) {
        const result = minimax(currentBoard, opponent);
        move.score = result.score;
      } else {
        const result = minimax(currentBoard, PLAYER_O);
        move.score = result.score;
      }

      currentBoard[availableMoves[i]] = null;
      moves.push(move);
    }

    let bestMove;
    if (player === PLAYER_O) {
      let bestScore = -Infinity;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }

    return moves[bestMove];
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={44} color="white" />
        </TouchableOpacity>
          <Text style={styles.heading}>Play with AI</Text>
      </View>
      <Board board={board} onClick={handlePlayerMove} />
    </View>
  );
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
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  backButton: {
    marginRight: 20,
  },
});

export default GamewithAI;
