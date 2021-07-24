import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { Text, View, Button } from 'react-native';

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

export default function GamesScreen() {
  const [ createGameMutation, {data, error} ] = useMutation(CREATE_GAME_MUTATION);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Games!</Text>
      <Text>Invitations</Text>
      <Text>Current Games</Text>
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
