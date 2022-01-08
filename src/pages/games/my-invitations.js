import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Text, View, Button, ActivityIndicator } from 'react-native';

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

  if (error || !loading && !data || !loading && !data.getInvitations) {
    return (
      <View><Text>{'Something went wrong.'}</Text></View>
    );
  }

  if (loading) {
    return (
      <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text style={{ marginRight: 6 }}>{'Loading invitations...'}</Text>
        <ActivityIndicator
          color={'red'}
          size={'small'}
        />
      </View>
    );
  }

  const { getInvitations: { invitations, inboundGameRequests } } = data;

  return (
    <View>
      <View>
        <Text>{'My Invitations'}</Text>
        {invitations.length ? invitations.map((invite) => <Text>{invite.invitee}</Text>) : <Text>{'No invitations'}</Text>}
      </View>
      <View>
        <Text>{'Requests'}</Text>
        {inboundGameRequests.length ? inboundGameRequests.map((invite) => <Text>{invite.invitee}</Text>) : <Text>{'No one wants to play with you...'}</Text>}
      </View>
    </View>
  );
}
