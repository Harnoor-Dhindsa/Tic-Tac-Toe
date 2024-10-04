import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeTwoScreen from './components/Screens/HomeTwoScreen';
import HomeThreeScreen from './components/Screens/HomeThreeScreen';
import HomeFourScreen from './components/Screens/HomeFourScreen';
import Game from './components/Game';
import GamewithAI from './components/GameWithAI';
import MainScreen from './components/Screens/MainScreen';
import Game5x5 from './components/Game5x5';
import Game10x10 from './components/Game10x10';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="HomeTwo" component={HomeTwoScreen} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="HomeThree" component={HomeThreeScreen} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="HomeFour" component={HomeFourScreen} options={{ headerShown: false, gestureEnabled: false  }} />
        <Stack.Screen name="Game" component={Game} options={{ headerShown: false, gestureEnabled: false  }} />
        <Stack.Screen name='GameAI' component={GamewithAI} options={{ headerShown: false, gestureEnabled: false  }}/>
        <Stack.Screen name='Game5x5' component={Game5x5} options={{ headerShown: false, gestureEnabled: false  }}/>
        <Stack.Screen name='Game10x10' component={Game10x10} options={{ headerShown: false, gestureEnabled: false  }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
