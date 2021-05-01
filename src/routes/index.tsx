import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '../hooks';

import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

export const Routes: React.FC = () => {
  const { signed, loading } = useAuth();
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }
  return signed ? <AppRoutes /> : <AuthRoutes />;
};
