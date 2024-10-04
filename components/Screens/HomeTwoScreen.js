import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HomeTwoScreen = ({ navigation }) => {
  const handlePlayWithFriend = () => {
    navigation.navigate('Game');
  };

  const handlePlayWithAI = () => {
    navigation.navigate('GameAI');
  };

  const handleBack = () => {
    navigation.goBack();
  };
  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back-circle-sharp" size={50} color="white" />
        </TouchableOpacity>
      <Text style={styles.title}>2 PLAYER MODE</Text>
      <Text style={styles.titletwo}>2 PLAYER MODE</Text>
      <TouchableOpacity onPress={handlePlayWithFriend} style={styles.button}>
        <Text style={styles.buttonText}>with FRIEND</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handlePlayWithAI}>
        <Text style={styles.buttonText}>with AI</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: "#1e1e2d"
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: '#d9534f',
    marginBottom: 50,
    textAlign: 'center',
  },
  titletwo: {
    fontSize: 36,
    fontWeight: '900',
    color: '#fff',
    marginTop: -90,
    marginBottom: 50,
    textAlign: 'center',
    zIndex: 100,
  },
  button: {
    backgroundColor: '#d9534f',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#fff',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 0,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  backButton: {
    position: 'absolute',
    top: "25%",
    alignItems: 'flex-start',
    zIndex: 100,
  },
});

export default HomeTwoScreen;
