import React from 'react';
import { useRoute } from '@react-navigation/core';
import { WebView } from 'react-native-webview';

export const Repos: React.FC = () => {
  const route = useRoute();
  console.log(route.params);
  const github_username = route.params.login;
  return (
    <WebView
      style={{ flex: 1 }}
      source={{ uri: `https://github.com/${github_username}?tab=repositories` }}
    />
  );
};
