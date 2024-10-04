import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const PlayerSetup = ({ onSetupComplete }) => {
  // Player symbols are hard-coded
  const [player1Name, setPlayer1Name] = useState('Player 1');
  const [player2Name, setPlayer2Name] = useState('Player 2');

  // Hard-coded symbols
  const player1Symbol = 'X';
  const player2Symbol = 'O';

  const handleSubmit = () => {
    if (player1Name && player2Name) {
      onSetupComplete({
        player1: { name: player1Name, symbol: player1Symbol },
        player2: { name: player2Name, symbol: player2Symbol },
      });
    }
  };

  const getSymbolColor = (symbol) => {
    switch (symbol) {
      case 'X': return '#d32f2f';  // Red
      case 'O': return '#fbc02d';  // Yellow
      default: return 'transparent';
    }
  };

  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
       <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back-circle-sharp" size={50} color="white" />
        </TouchableOpacity>
      <Text style={styles.heading}>Player Setup</Text>
      
      <View style={styles.inputContainer}>
        <Text style={[styles.symbol, { color: getSymbolColor(player1Symbol) }]}>{player1Symbol}</Text>
        <TextInput
          style={[styles.input, { color: getSymbolColor(player1Symbol) }]}
          placeholder="Player 1 Name"
          placeholderTextColor="#ccc"
          value={player1Name}
          onChangeText={setPlayer1Name}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={[styles.symbol, { color: getSymbolColor(player2Symbol) }]}>{player2Symbol}</Text>
        <TextInput
          style={[styles.input, { color: getSymbolColor(player2Symbol) }]}
          placeholder="Player 2 Name"
          placeholderTextColor="#ccc"
          value={player2Name}
          onChangeText={setPlayer2Name}
        />
      </View>

      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Start Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#1e1e2d',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    width: '80%',
  },
  input: {
    flex: 1,
    padding: 10,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    fontWeight: 'bold',  // Make text inside input bold
    fontSize: 16,       // Increase font size
  },
  symbol: {
    fontSize: 24,
    marginHorizontal: 10,
    fontWeight: 'bold',
  },
  submitButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#d32f2f',
    borderRadius: 5,
    marginTop: 20,
  },
  submitButtonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: "25%",
    alignItems: 'flex-start',
    zIndex: 100,
  },
});

export default PlayerSetup;
