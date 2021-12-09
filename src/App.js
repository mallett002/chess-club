import React from 'react';
import { Platform, AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
// import { persistCache } from 'apollo3-cache-persist'

import HomeScreen from './pages/home/home-screen';
import GamesStack from './pages/games/games-stack';
import ProfileScreen from './pages/profile/profile-screen';
import ChatsScreen from './pages/chats/chats-screen';
import { tabScreenOptions } from './components/nav/helpers';
import SignUpScreen from './pages/auth';

const client = new ApolloClient({
  uri: 'http://[local_base_url]:4000/graphql',
  cache: new InMemoryCache()
});

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const getTabBarStyles = () => {
  const styles = {
    borderTopWidth: 0,
    height: 70,
    paddingTop: 9,
    paddingBottom: 9,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 }
  };

  if (Platform.OS === 'ios') {
    styles.height = 90;
    styles.paddingBottom = 23;
  }

  return styles;
};

const App = () => {
  const isSignedIn = false;

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={tabScreenOptions}
          style={{ padding: 10 }}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
            style: getTabBarStyles()
          }}
        >
          {
            isSignedIn ? (
              <>
                <Tab.Screen name='Home' component={HomeScreen} />
                <Tab.Screen name='Games' component={GamesStack} />
                <Tab.Screen name='Profile' component={ProfileScreen} />
                <Tab.Screen name='Chats' component={ChatsScreen} />
              </>
            ) : (
              <>
                {/* <Stack.Screen name="SignIn" component={SignInScreen} /> */}
                <Stack.Screen name="SignUp" component={SignUpScreen} />
              </>
            )}
        </Tab.Navigator>
      </NavigationContainer>
    </ApolloProvider >
  );
}


AppRegistry.registerComponent('ChessClub', () => App);

export default App;
