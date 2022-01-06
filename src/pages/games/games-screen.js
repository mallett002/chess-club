import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { Text, View, Button } from 'react-native';

import CurrentGames from './current-games';
import MyInvitations from './my-invitations';

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

const INVITATIONS_QUERY = gql`
  query GetInvitations {
    getInvitations {
      invitations {
        invitationId
        invitee
      }
      inboundGameRequests {
        invitationId
        invitor
      }
    }
  }
`;

export default function GamesScreen({ navigation }) {
  const [createGameMutation, { data: createGameData, error: createGameError }] = useMutation(CREATE_GAME_MUTATION);
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
  const {
    data: invitationsData,
    error: invitationsError,
    loading: invitationsLoading,
    refetch: refetchInvitations
  } = useQuery(INVITATIONS_QUERY);

  // TODO: get invitations here and pass down to MyInvitations component
  console.log({invitationsData});

  useEffect(() => {
    refetchCurrentGames({ variables: { playerId: 'some-guid-1' } });
  }, [createGameData]);

  return (
    <View>
      <MyInvitations />
      {/* <CurrentGames
        navigation={navigation}
        games={currentGamesData}
        loading={currentGamesLoading} 
        error={currentGamesError}
      /> */}
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
