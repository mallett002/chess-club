import React from 'react';
import { Text, View, Button } from 'react-native';

const CurrentGames = ({ games, loading }) => {
  if (loading) {
    return (
      <View>
        <Text>{'Loading current games...'}</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>{'Current Games'}</Text>
      {loading && <Text>{'Loading current games...'}</Text>}
      {games && games.length ?
        <FlatList
          data={games}
          renderItem={({ item }) => {
            return <Text>{item.gameId}</Text>
          }}
          keyExtractor={game => game.gameId}
        /> :
        <Text>{"You currently don't have any games"}</Text>
      }
    </View>
  );
}

export default CurrentGames;
