import React from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  gameItem: {
    display: 'flex',
    flexDirection: 'row'
  }
});

const CurrentGames = ({ games, loading, error }) => (
  <View>
    <Text>{'Current Games'}</Text>
    {error && <Text>{'There was an error loading games.'}</Text>}
    {loading && <Text>{'Loading current games...'}</Text>}
    {games && games.getGames && games.getGames.length ?
      <FlatList
        data={games.getGames}
        renderItem={({ item }) => {
          return (
            <View style={styles.gameItem}>
              <Text>{item.gameId}</Text>
              <Text>{item.opponent}</Text>
              <Text>{item.turn}</Text>
            </View>
          )
        }}
        keyExtractor={game => game.gameId}
      /> :
      <Text>{"You currently don't have any games"}</Text>
    }
  </View>
);

export default CurrentGames;
