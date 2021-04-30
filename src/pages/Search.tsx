import React, { useState, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  Image,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import api from '../services/api';
import finder from '../assets/finder.png';

interface GithubResponse {
  login: string;
  id: string;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: string;
  name: string;
  company: string | null;
  blog: string;
  location: string;
  email: string | null;
  hireable: string;
  bio: string;
  twitter_username: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: Date;
  updated_at: Date;
}

export const Search: React.FC = () => {
  const navigation = useNavigation();

  const [dev, setDev] = useState('');
  useEffect(() => {
    // Renderizar devs recem pesquisados
  }, []);
  async function getDevDataFromGithubApi(): Promise<void> {
    const { data } = await api.get<GithubResponse>(dev);
    const user = {
      id: data.id,
      name: data.name,
      username: data.login,
      avatar: data.avatar_url,
      company: data.company,
      blog: data.blog,
      location: data.location,
      email: data.email,
      biography: data.bio,
      repositories: data.repos_url,
      stars: data.starred_url,
    };
    navigation.navigate('Profile', user);
  }
  async function verifyDevExist(): Promise<void> {
    // Verificar no AsyncStorage se o usuário pesquisado já tá salvo
    const allDevs = await AsyncStorage.getItem('@Github/users');
    if (!allDevs) {
      await AsyncStorage.setItem('@Github/users', dev);
      await getDevDataFromGithubApi();
    }
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#999' }}>
      <View style={styles.searchForm}>
        <TextInput
          style={styles.searchInput}
          placeholder="Procurar devs"
          placeholderTextColor="#616467"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
          value={dev}
          onChangeText={setDev}
          onSubmitEditing={verifyDevExist}
        />
        <TouchableOpacity style={styles.loadButton} onPress={verifyDevExist}>
          <Image style={styles.searchButton} source={finder} />
        </TouchableOpacity>
      </View>

      <View style={styles.list}>
        <TouchableOpacity onPress={() => AsyncStorage.clear()}>
          <Text>Limpar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchForm: {
    flex: 1,
    position: 'absolute',
    top: 5,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: 'row',
  },
  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#fafafa',
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    elevation: 1,
    marginTop: 10,
  },
  loadButton: {
    width: 50,
    height: 50,
    backgroundColor: '#fafafa',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    marginTop: 10,
  },
  searchButton: {
    resizeMode: 'center',
  },
  list: {
    top: 90,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#DDD',
  },
  text: {
    marginTop: 5,
    marginBottom: 7,
    color: '#FFF',
  },
});
