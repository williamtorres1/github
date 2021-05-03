import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';

import api from '../services/api';
import { useAuth } from '../hooks';

interface GithubResponse {
  login: string;
  id: number;
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
  site_admin: string | false;
  name: string | null;
  company: string | null;
  blog: string;
  location: string | null;
  email: string | null;
  hireable: boolean | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: Date;
  updated_at: Date;
  private_gists?: number;
  total_private_repos?: number;
  owned_private_repos?: number;
  disk_usage?: number;
  collaborators?: number;
  two_factor_authentication?: boolean;
  plan?: {
    name: string;
    space: number;
    collaborators: number;
    private_repos: number;
  };
}

interface User {
  id: number;
  username: string;
  name: string | null;
  avatar: string;
  company: string | null;
  blog: string;
  location: string | null;
  email: string | null;
  biography: string | null;
  twitter: string | null;
  repositories: string;
  public_repositories_number: number;
  private_repositories_number: number | undefined;
  stars: string;
}

export const Search: React.FC = () => {
  const navigation = useNavigation();

  const { signOut } = useAuth();

  const [alreadySearch, setAlreadySearch] = useState(true);
  const [developer, setDeveloper] = useState('');
  const [allDevelopers, setAllDevelopers] = useState<User[]>([]);

  async function fetchGithubDeveloperData(): Promise<User | void> {
    console.log('Buscando dados na api');
    try {
      const { data } = await api.get<GithubResponse>(String(developer));

      const user = {
        id: Number(data.id),
        username: String(data.login),
        name: String(data.name),
        avatar: String(data.avatar_url),
        company: String(data.company),
        blog: String(data.blog),
        location: String(data.location),
        email: String(data.email),
        biography: String(data.bio),
        twitter: String(data.twitter_username),
        repositories: String(data.repos_url),
        public_repositories_number: Number(data.public_repos),
        private_repositories_number: Number(data.total_private_repos),
        stars: String(data.starred_url),
      };

      return user;
    } catch (err) {
      console.log('Houve um erro: ', err);
      return Alert.alert('Dev n existe');
    }
  }

  async function fetchAsyncStorageData(): Promise<User[] | null> {
    console.log('Verificando dados no AsyncStorage');
    const AsyncStorageData = await AsyncStorage.getItem('@opengit:users');

    if (!AsyncStorageData) {
      console.log('Não tem nada salvo no AsyncStorage');
      return null;
    }
    console.log('Já tem algum usuário salvo no Async Storage');
    const AsyncStorageDataParsed = JSON.parse(AsyncStorageData);
    return AsyncStorageDataParsed;
  }

  async function saveDeveloperDataInAsyncStorage(): Promise<void> {
    console.log('Salvando novos devs no Async Storage');
    console.log('Transformando em strings');
    const allDevelopersStringified = JSON.stringify(allDevelopers);
    await AsyncStorage.setItem('@opengit:users', allDevelopersStringified);
  }

  async function verifyDeveloperAlreadySaved(
    dataFromAsyncStorage: User[],
  ): Promise<User | false> {
    console.log('Verificando se o usuário pesquisado existe no Async Storage');
    const savedDeveloper = dataFromAsyncStorage.find(
      data => data.username === developer,
    );

    if (!savedDeveloper) {
      console.log('>> Dev não existe no Async Storage');
      return false;
    }
    console.log('>> Dev existe no Async Storage');
    return savedDeveloper;
  }

  async function searchDeveloper() {
    console.log(`Pesquisando pelo dev: ${developer}`);
    const responseAsyncStorageData = await fetchAsyncStorageData();

    const developerData = await fetchGithubDeveloperData();

    if (!responseAsyncStorageData) {
      console.log('Não tem nada salvo no banco');
      if (developerData) {
        console.log('Alterando o state allDevelopers com: ', [developerData]);
        setAllDevelopers([developerData]);
        await saveDeveloperDataInAsyncStorage();
        console.log('>> Navegando para próxima tela');
        navigation.navigate('Profile', { user: developerData });
      }
    }

    const developerAlreadySaved = await verifyDeveloperAlreadySaved(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      responseAsyncStorageData!,
    );

    if (!developerAlreadySaved) {
      if (developerData) {
        setAllDevelopers([...allDevelopers, developerData]);
        await saveDeveloperDataInAsyncStorage();
        navigation.navigate('Profile', { user: developerData });
      }
    }

    navigation.navigate('Profile', { user: developerAlreadySaved });
  }

  // function handleSignOut() {
  //   signOut();
  // }

  async function handleCleanStorage() {
    // await AsyncStorage.removeItem('@opengit:users');
    const response = await AsyncStorage.getItem('@opengit:users');
    console.log(response);
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchForm}>
        <TextInput
          style={styles.searchInput}
          placeholder="Procurar devs"
          placeholderTextColor="#616467"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
          value={developer}
          onChangeText={setDeveloper}
          onSubmitEditing={searchDeveloper}
        />
        <TouchableOpacity style={styles.loadButton} onPress={searchDeveloper}>
          <Feather name="search" size={30} color="#000" />
        </TouchableOpacity>
      </View>

      {alreadySearch && (
        <>
          <View style={styles.cleanButton}>
            <TouchableOpacity onPress={handleCleanStorage}>
              <Text style={styles.cleanButtonText}>Limpar</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#999',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchForm: {
    width: '85%',
    height: 40,
    flexDirection: 'row',
    marginVertical: 30,
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
  cleanButton: {
    width: 100,
    height: 40,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginVertical: 10,
  },
  cleanButtonText: {
    fontSize: 20,
    color: '#333',
  },
});
