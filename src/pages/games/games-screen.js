import { gql, useMutation, useQuery } from '@apollo/client';
import React, {useEffect} from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

import CurrentGames from './current-games';

const CREATE_GAME_MUTATION = gql`
  mutation createGame($playerOne: ID!, $playerTwo: ID!) {
    createGame(playerOne: $playerOne, playerTwo: $playerTwo) {
      gameId
      playerOne
      playerTwo
      turn
    }
  }`;

const CURRENT_GAMES_QUERY = gql`
  query GetGames($playerId: ID!){
    getGames(playerId: $playerId) {
      gameId
      playerOne
      playerTwo
      turn
	  }
  }
`;

const styles = StyleSheet.create({
  page: {},
  title: {
    fontSize: 32,
    fontWeight: 'bold'
  }
});

export default function GamesScreen() {
  const [ createGameMutation, { data: createGameData, error: createGameError } ] = useMutation(CREATE_GAME_MUTATION);
  const {
    data: currentGamesData,
    error: currentGamesError,
    loading: currentGamesLoading,
    refetch: refetchCurrentGames
  } = useQuery(CURRENT_GAMES_QUERY, {
    variables: {
      playerId: 'some-guid-1'
    }
  });

  useEffect(() => {
    refetchCurrentGames({variables: { playerId: 'some-guid-1' }});
  }, [createGameData]);

  return (
    <View>
      <Text style={styles.title}>Games</Text>
      <CurrentGames 
        games={currentGamesData}
        loading={currentGamesLoading} 
        error={currentGamesError}
      />
      <Text>Invitations</Text>
      <Button
        onPress={async () => {
          await createGameMutation({
            variables: {
              playerOne: "some-guid-1",
              playerTwo: "some-guid-2"
            }
          });
        }}
        title='Create Game (for now)'
        color='#841584'
      />
    </View>
  );
}
