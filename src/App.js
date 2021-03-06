import React, { useEffect, useState } from 'react';
import { Platform, AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
// import { persistCache } from 'apollo3-cache-persist'

import { AppContext } from './utils/context';
import HomeScreen from './pages/home/home-screen';
import GamesStack from './pages/games/games-stack';
import ProfileScreen from './pages/profile/profile-screen';
import ChatsScreen from './pages/chats/chats-screen';
import { tabScreenOptions } from './components/nav/helpers';
import SignUpScreen from './pages/auth/SignUp';
import LogInScreen from './pages/auth/LogIn';
import { decodeJwt, getTokenFromStorage } from './utils/token-utils';

// Todo: Pull off to own file
const client = new ApolloClient({
  uri: 'http://[redacted]/graphql',
  cache: new InMemoryCache()
});

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

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function LoggedInTabScreens() {
  return (
    <Tab.Navigator
      screenOptions={tabScreenOptions}
      style={{ padding: 10 }}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        style: getTabBarStyles()
      }}
    >
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen name='Games' component={GamesStack} />
      <Tab.Screen name='Profile' component={ProfileScreen} />
      <Tab.Screen name='Chats' component={ChatsScreen} />
    </Tab.Navigator>
  );
}

function App() {
  const [accessToken, setAccessToken] = useState('');
  const [username, setUsername] = useState('');
  const [playerId, setPlayerId] = useState('');
  const context = {
    accessToken,
    setAccessToken,
    username,
    setUsername,
    playerId,
    setPlayerId
  };

  useEffect(() => {
    const persistAuthState = async () => {
      if (!accessToken) {
        const storageToken = await getTokenFromStorage();

        if (storageToken) {
          const { sub, playerId } = decodeJwt(storageToken);

          setAccessToken(storageToken);
          setUsername(sub);
          setPlayerId(playerId);
        }
      }
    };

    persistAuthState();
  }, [accessToken]);

  return (
    <AppContext.Provider value={context}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
          >
            {accessToken ? (
              <Stack.Screen name="Home" component={LoggedInTabScreens} />
            ) : (
              <>
                <Stack.Screen name="LogIn" component={LogInScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    </AppContext.Provider>
  );
}


AppRegistry.registerComponent('ChessClub', () => App);

export default App;
