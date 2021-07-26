import { gql, useMutation, useQuery } from '@apollo/client';
import React from 'react';
import { Text, View, Button } from 'react-native';

import CurrentGames from './current-games';

const CREATE_GAME_MUTATION = gql`
  mutation createGame($playerOne: ID!, $playerTwo: ID!) {
    createGame(playerOne: $playerOne, playerTwo: $playerTwo) {
      gameId
      moves {
        color
        from
        to
        flags
        piece
        san
      }
      players
      positions {
        type
        color
        label
      }
      turn
    }
  }`;

const CURRENT_GAMES_QUERY = gql`
  query GetGames($playerId: ID!){
    getGames(playerId: $playerId) {
      gameId
  	  players
  	  state
	  }
  }
`;

export default function GamesScreen() {
  const [createGameMutation, { data: createGameData, error: createGameError }] = useMutation(CREATE_GAME_MUTATION);
  const {
    data: currentGamesData,
    error: currentGamesError,
    loading: currentGamesLoading
  } = useQuery(CURRENT_GAMES_QUERY, {
    variables: {
      playerId: 'some-guid-1'
    }
  });

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Games</Text>
      <CurrentGames games={currentGamesData} loading={currentGamesLoading} />
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
