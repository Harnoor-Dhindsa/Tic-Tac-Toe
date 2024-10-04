import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';


const MainScreen = ({ navigation }) => {

  const handlePlaytwo = () => {
    navigation.navigate('HomeTwo');
  };

  const handlethree = () => {
    navigation.navigate('HomeThree');
  };

  const handlePlayfour = () => {
    navigation.navigate('HomeFour');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WELCOME TO</Text>
      <Text style={styles.Subtitle}>TIC TAC TOE</Text>
      <Text style={styles.Subtitletwo}>TIC TAC TOE</Text>
      <TouchableOpacity style={styles.button} onPress={handlePlaytwo}>
        <Text style={styles.buttonText}>2 PLAYER</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handlethree}>
        <Text style={styles.buttonText}>3 PLAYER</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handlePlayfour}>
        <Text style={styles.buttonText}>4 PLAYER</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.bottomIcons}><AntDesign name="github" size={14} color="white" /> <AntDesign name="codepen" size={14} color="white" /> <AntDesign name="linkedin-square" size={14} color="white" /></Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.bottomText}>HARNOOR DHINDSA</Text>
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
    fontSize: 26,
    fontWeight: '600',
    color: '#d9534f',
    textAlign: 'center',
  },
  Subtitle: {
    fontSize: 56,
    fontWeight: '900',
    color: '#d9534f',
    marginBottom: 50,
    textAlign: 'center',
  },
  Subtitletwo: {
    fontSize: 56,
    fontWeight: '900',
    color: '#fff',
    marginTop: -121,
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
    textAlign: 'center',
    marginBottom: 5, 
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  bottomIcons: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 50,
  },
  bottomText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 5,
  },
});

export default MainScreen;
