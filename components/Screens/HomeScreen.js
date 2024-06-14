import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const HomeScreen = ({ navigation }) => {
  const handlePlayWithUser = () => {
    navigation.navigate('Game');
  };

  const handlePlayWithAI = () => {
    navigation.navigate('GameAI');
  };

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Welcome to Tic Tac Toe</Text>
        <TouchableOpacity onPress={handlePlayWithUser} style={styles.button}>
          <Text style={styles.buttonText}>Play With Friend</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonAI} onPress={handlePlayWithAI}>
          <Text style={styles.buttonText}>Play With AI</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#00022e"
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 50,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'red',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonAI: {
    backgroundColor: 'red',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'yellow',
  },
});

export default HomeScreen;
