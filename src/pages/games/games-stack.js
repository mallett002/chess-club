import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import GamesScreen from './games-screen';
import Board from './board';

const Stack = createStackNavigator();

const GamesStack = () => (
  <Stack.Navigator>
    <Stack.Screen name='Games' component={GamesScreen} />
    <Stack.Screen name="board" component={Board} />
  </Stack.Navigator>
);

export default GamesStack;
