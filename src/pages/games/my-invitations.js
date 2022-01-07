import { gql, useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { Text, View, Button } from 'react-native';

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

export default function MyInvitations() {
  const { data, error, loading, refetch } = useQuery(INVITATIONS_QUERY);

  // TODO: get invitations here and pass down to MyInvitations component
  console.log({invites: data.getInvitations});

  return (
    <View>
      <Text>{'My Invitations'}</Text>
      {invitations ? invitations.map((invite) => <Text>{invite.invitee}</Text>): null}
    </View>
  );
}
