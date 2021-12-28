import { useContext, useEffect } from 'react';

import { AppContext } from './context';
import { persistTokenInStorage, decodeJwt } from './token-utils';

export const useAuthentication = (data) => {
  const { setAccessToken, setUsername, setPlayerId } = useContext(AppContext);

  const authenticateUser = async (token) => {
    await persistTokenInStorage(token);
    const { sub, playerId } = decodeJwt(token);

    setAccessToken(token);
    setUsername(sub);
    setPlayerId(playerId);
  };

  useEffect(() => {
    if (data && data.createPlayer && data.createPlayer.token) {
      authenticateUser(data.createPlayer.token);
    }
  }, [data]);
};
