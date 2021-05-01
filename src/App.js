import React from 'react';
import {Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from './pages/home/home-screen';
// import GamesScreen from './pages/games/games-screen';
import Board from './pages/games/board';
import ProfileScreen from './pages/profile/profile-screen';
import ChatsScreen from './pages/chats/chats-screen';
import {tabScreenOptions} from './components/nav/helpers';

const Tab = createBottomTabNavigator();

const getTabBarStyles = () => {
  const styles = {
    borderTopWidth: 0,
    height: 70,
    paddingTop: 9,
    paddingBottom: 9,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 20,
    shadowOffset: {width: 0, height: 0}
  };  

  if (Platform.OS === 'ios') {
    styles.height = 90;
    styles.paddingBottom = 23;
  }

  return styles;
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={tabScreenOptions}
        style={{padding: 10}}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
          style: getTabBarStyles()
        }}
      >
        <Tab.Screen name='Home' component={HomeScreen} />
        <Tab.Screen name='Games' component={Board} />
        <Tab.Screen name='Profile' component={ProfileScreen} />
        <Tab.Screen name='Chats' component={ChatsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
