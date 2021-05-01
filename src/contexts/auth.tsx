import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as auth from '../services/OAuth';
import api from '../services/api';
import { AuthContextDTO } from '../libs/AuthContextDTO';

export const AuthContext = createContext<AuthContextDTO>({} as AuthContextDTO);

export const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData() {
      const storagedToken = await AsyncStorage.getItem('@opengit:token');

      if (storagedToken) {
        api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
        setToken(storagedToken);
      }
      setLoading(false);
    }
    loadStoragedData();
  }, []);
  async function signIn() {
    const response = await auth.signIn();

    setToken(response.accessToken);
    api.defaults.headers.Authorization = `Bearer ${response.accessToken}`;

    await AsyncStorage.setItem('@opengit:token', response.accessToken);
  }

  function signOut() {
    AsyncStorage.clear().then(() => setToken(null));
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!token, token, loading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
