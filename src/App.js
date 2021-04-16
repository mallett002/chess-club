import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from './pages/home/home-screen';
import GamesScreen from './pages/games/games-screen';
import ProfileScreen from './pages/profile/profile-screen';
import ChatsScreen from './pages/chats/chats-screen';
import {tabScreenOptions} from './components/nav/helpers';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={tabScreenOptions}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name='Home' component={HomeScreen} />
        <Tab.Screen name='Games' component={GamesScreen} />
        <Tab.Screen name='Profile' component={ProfileScreen} />
        <Tab.Screen name='Chats' component={ChatsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
