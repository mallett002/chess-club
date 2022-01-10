import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { TextInput, Text, View, ActivityIndicator, StyleSheet } from 'react-native';
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
    <View style={styles.wrapper}>
      <View>
        <Text>{'My Invitations'}</Text>
        <View>
          <Text>{'Create an Invitation'}</Text>
          <TextInput
            placeholder={'username'}
          />
          <TouchableOpacity style={{ width: 80, height: 40 }}>
            <Text>
              {'Invite'}
            </Text>
          </TouchableOpacity>

        </View>
        {
          invitations.length
            ? invitations.map((invite) => <Text>{invite.invitee}</Text>)
            : <Text>{'You currently have not invited anyone.'}</Text>
        }
      </View>
      <View>
        <Text>{'Requests'}</Text>
        {
          inboundGameRequests.length
            ? inboundGameRequests.map((request) => <Text>{request.invitor}</Text>)
            : <Text>{"You currently don't have any requests to play."}</Text>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16
  },
  inviteButtonStyles: {
    width: 80,
    height: 40,
    backgroundColor: 'red',
    color: '#fff'
  }
});
