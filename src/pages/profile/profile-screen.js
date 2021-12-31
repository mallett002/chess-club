import React, { useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';

import { AppContext } from '../../utils/context';
import { removeTokenFromStorage } from '../../utils/token-utils';

function ProfileScreen() {
  const [loading, setLoading] = useState(false);
  const { setAccessToken, setUsername, setPlayerId } = useContext(AppContext);

  const logUserOut = async () => {
    setLoading(true);
    setAccessToken('');
    setUsername('');
    setPlayerId('');
    await removeTokenFromStorage();
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator
          color={'red'}
          size={'large'}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>{'Profile!'}</Text>
      <Text
        onPress={logUserOut}
        style={styles.logoutText}
      >
        {'Logout'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoutText: {
    color: 'red'
  }
});

export default ProfileScreen;
