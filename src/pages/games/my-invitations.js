import { gql, useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { Text, View, Button } from 'react-native';


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

export default function MyInvitations() {
  const {
    data: currentGamesData,
    error: currentGamesError,
    loading: currentGamesLoading,
    refetch: refetchCurrentGames
  } = useQuery(MY_INVITATIONS_QUERY, {
    variables: {
      playerId: 'some-guid-1'
    }
  });

  // useEffect(() => {
  //   refetchCurrentGames({ variables: { playerId: 'some-guid-1' } });
  // }, [createGameData]);

  return (
    <View>
      <Text>{'My Invitations'}</Text>
      {invitations ? invitations.map((invite) => <Text>{invite.invitee}</Text>): null}
    </View>
  );
}
