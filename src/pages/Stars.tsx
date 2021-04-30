import React from 'react';
import { WebView } from 'react-native-webview';

export default function Stars({ navigation, route }) {
  const github_username = route.params.login;
  return (
    <WebView
      style={{ flex: 1 }}
      source={{ uri: `https://github.com/${github_username}?tab=stars` }}
    />
  );
}
