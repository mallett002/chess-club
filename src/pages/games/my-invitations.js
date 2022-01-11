import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { TextInput, Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { colors } from '../../constants/colors';

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

  // invitations: what I send out
  // inboundGameRequest: what come in
  const { getInvitations: { invitations: myRequests, inboundGameRequests } } = data;
  const things = [{ invitor: 'jeffreyDSerb' }, { invitor: 'bmallYourPal' }, { invitor: 'dickTracy' }]

  return (
    <View style={styles.wrapper}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{'My Invitations'}</Text>
        <View style={styles.sectionContent}>
          {
            things.length
              ? things.map((request, i) => <View key={i} style={styles.invitationItem}>
                <Text>{request.invitor}</Text>
                <TouchableOpacity style={{
                  backgroundColor: colors.DESTINATION_CELL,
                  borderRadius: 2,
                  paddingVertical: 2,
                  paddingHorizontal: 6
                }}>
                  <Text style={{color: '#FFF', paddingBottom: 2}}>{'Accept'}</Text>
                </TouchableOpacity>
              </View>)
              : <Text style={styles.noDataText}>{"You currently don't have any requests to play."}</Text>
          }
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{'My Requests'}</Text>
        <View style={styles.sectionContent}>
          {
            myRequests.length
              ? myRequests.map((request) => <Text>{request.invitee}</Text>)
              : <Text style={styles.noDataText}>{'You currently have not invited anyone.'}</Text>
          }
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 16,
    paddingHorizontal: 16
  },
  section: {
    marginBottom: 16
  },
  sectionContent: {
    paddingLeft: 8
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600'
  },
  noDataText: {
    fontSize: 14,
    fontWeight: '100',
    color: 'black'
  },
  invitationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '70%',
    marginVertical: 4
  },
  inviteButtonStyles: {
    width: 80,
    height: 40,
    backgroundColor: 'red',
    color: '#fff'
  }
});
