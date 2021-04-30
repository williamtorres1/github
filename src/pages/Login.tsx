import React from 'react';
import { View } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authorize } from 'react-native-app-auth';

import { config } from '../services/OAuth';

export const Login: React.FC = () => {
  const navigation = useNavigation();

  useFocusEffect(() => {
    async function getAuthorizationFromGithubOAuth() {
      try {
        const authState = await authorize(config);
        await AsyncStorage.setItem(
          '@opengit:access_token',
          JSON.stringify(authState),
        );
        navigation.navigate('Search', authState);
        console.log({ authState });
      } catch (err) {
        console.error(err);
      }
    }
    getAuthorizationFromGithubOAuth();
  });

  return <View style={{ flex: 1 }} />;
};
