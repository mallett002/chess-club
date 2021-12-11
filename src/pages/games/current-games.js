import React from 'react';
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  gameItem: {
    display: 'flex',
    flexDirection: 'row'
  }
});

const CurrentGames = ({ navigation, games, loading, error }) => {
  const navigateToGame = (gameId) => {
    navigation.navigate('Board', {gameId});
  };

  if (error) {
    console.log({error});
    return (
      <View><Text>{'There was an error loading games.'}</Text></View>
    );
  }

  if (loading) {
    return (
      <Text>{'Loading current games...'}</Text>
    );
  }

  return (
    <View>
      <Text>{'Current Games'}</Text>
      {games && games.getGames && games.getGames.length ?
        <FlatList
          data={games.getGames}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.gameItem}
                onPress={() => navigateToGame(item.gameId)}
              >
                <Text>{item.gameId}</Text>
                <Text>{item.opponent}</Text>
                <Text>{item.turn}</Text>
              </TouchableOpacity>
            )
          }}
          keyExtractor={game => game.gameId}
        /> :
        <Text>{"You currently don't have any games"}</Text>
      }
    </View>
  )
};

export default CurrentGames;
