import React, {useContext} from 'react';
import { Text, View } from 'react-native';

import {AppContext} from '../../utils/context';

export default function HomeScreen() {
  const {username} = useContext(AppContext);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{`Let's play ${username}!`}</Text>
    </View>
  );
}
