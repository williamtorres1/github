/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react';
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
// import { useAuth } from '../hooks';

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

  // const { signOut } = useAuth();

  const [alreadySearch, setAlreadySearch] = useState(true);
  const [developer, setDeveloper] = useState('');
  const [allDevelopers, setAllDevelopers] = useState<User[]>([]);

  // useEffect(() => {
  //   fetchAsyncStorageData().then(response => {
  //     // if (response) {
  //     //   setAlreadySearch(true);
  //     //   setAllDevelopers(response);
  //     // }
  //   });
  // }, []);

  async function fetchGithubDeveloperData(): Promise<User | void> {
    try {
      console.log('>> Buscando dados no github, usuário: ', developer);
      const { data } = await api.get<GithubResponse>(String(developer));

      const user = {
        id: data.id,
        username: data.login,
        name: data.name,
        avatar: data.avatar_url,
        company: data.company,
        blog: data.blog,
        location: data.location,
        email: data.email,
        biography: data.bio,
        twitter: data.twitter_username,
        repositories: data.repos_url,
        public_repositories_number: data.public_repos,
        private_repositories_number: data.total_private_repos,
        stars: data.starred_url,
      };

      return user;
    } catch (err) {
      Alert.alert(
        'Algo deu errado, ao que tudo indica este usuário não existe',
      );
      throw new Error(String(err));
    }
  }

  async function fetchAsyncStorageData(): Promise<User[] | null> {
    // eslint-disable-next-line prettier/prettier
    console.log('>> Buscando dados no Async Storage, chave: \'@opengit:users\'');
    const AsyncStorageData = await AsyncStorage.getItem('@opengit:users');
    if (!AsyncStorageData) {
      console.log('>> Async Storage vazio');
      return null;
    }
    console.log('>> Realizando parse dos dados no Async Storage');
    const AsyncStorageDataParsed = JSON.parse(AsyncStorageData);
    console.log('>> Dados depois do parse: ', AsyncStorageDataParsed);
    return AsyncStorageDataParsed;
  }

  async function saveDeveloperDataInAsyncStorage(): Promise<void> {
    console.log('>> Transformando array em string');
    const allDevelopersStringified = JSON.stringify(allDevelopers);
    await AsyncStorage.setItem('@opengit:users', allDevelopersStringified);
  }

  async function verifyDeveloperAlreadySaved(
    dataFromAsyncStorage: User[] | null,
  ): Promise<User | false> {
    console.log(
      '>> Verificando se o usuário pesquisado existe no Async Storage',
    );
    const savedDeveloper = dataFromAsyncStorage?.find(data => {
      console.log(
        `>> data.username: ${data.username} --- developer: ${developer}`,
      );
      return data.username === developer;
    });

    if (!savedDeveloper) {
      console.log('>> Dev não existe no Async Storage');
      return false;
    }
    console.log('>> Dev existe no Async Storage');
    return savedDeveloper;
  }

  async function searchDeveloper() {
    console.log('>> Chamando a função -searchDeveloper-');
    console.log('>> Recebendo dados do Async Storage');
    const responseAsyncStorageData = await fetchAsyncStorageData();

    if (!responseAsyncStorageData) {
      const developerData = await fetchGithubDeveloperData();
      if (developerData) {
        console.log('>> Salvando usuário em array');
        setAllDevelopers(Array(developerData));
        await saveDeveloperDataInAsyncStorage();
        console.log('>> Navegando para próxima rota');
        navigation.navigate('Profile', { user: developerData });
      }
    }

    const developerAlreadySaved = await verifyDeveloperAlreadySaved(
      responseAsyncStorageData,
    );

    const developerData = await fetchGithubDeveloperData();
    if (developerData) {
      if (!developerAlreadySaved) {
        setAllDevelopers([...allDevelopers, developerData]);
        await saveDeveloperDataInAsyncStorage();
      }
      navigation.navigate('Profile', { user: developerData });
    }
  }

  // function handleSignOut() {
  //   signOut();
  // }

  async function handleCleanStorage() {
    await AsyncStorage.removeItem('@opengit:users');
  }

  async function handleShowStorage() {
    const response = await AsyncStorage.getItem('@opengit:users');
    console.log(
      '>> Mostrando o que tem na chave <@opengit:users> : ',
      response,
    );
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
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.cleanButton}>
            <TouchableOpacity onPress={handleCleanStorage}>
              <Text style={styles.cleanButtonText}>Limpar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.cleanButton}>
            <TouchableOpacity onPress={handleShowStorage}>
              <Text style={styles.cleanButtonText}>Mostrar</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    marginHorizontal: 20,
  },
  cleanButtonText: {
    fontSize: 20,
    color: '#333',
  },
});
