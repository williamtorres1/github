import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { Routes } from './routes';
import { AuthProvider } from './contexts/auth';

export const App: React.FC = () => (
  <NavigationContainer>
    <AuthProvider>
      <Routes />
    </AuthProvider>
  </NavigationContainer>
);
