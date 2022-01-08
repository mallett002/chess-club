import { gql, useQuery } from '@apollo/client';
import React, {useState} from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
  const [showInvitations, setShowInvitations] = useState(true);
  const [showRequests, setShowRequests] = useState(true);

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
        <TouchableOpacity onPress={() => setShowInvitations(!showInvitations)}>
          <Text>{'My Invitations'}</Text>
        </TouchableOpacity>
        {showInvitations ?
          invitations.length ?
            invitations.map((invite) => <Text>{invite.invitee}</Text>) : <Text>{'You currently have not invited anyone'}</Text>
          : null
        }
      </View>
      <View>
        <Text>{'Requests'}</Text>
      </View>
    </View>
  );
}
