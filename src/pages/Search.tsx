import React, { useState, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  Image,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import api from '../services/api';

import finder from '../assets/finder.png';

export default function Search() {
  const navigation = useNavigation();

  const [dev, setDev] = useState('');
  const [usersSearcheds, setUsersSearcheds] = useState([]);

  useEffect(() => {
    async function setUsersSearchedFunction() {
      const users = JSON.parse(await AsyncStorage.getItem('@GitHub/users'));
      if (users) {
        setUsersSearcheds(users);
      }
    }
    setUsersSearchedFunction();
  }, []);
  async function saveDev() {
    try {
      const user = await handleSearchDev();
      console.log(`>> Salvando ${user.name}.`);
      if (usersSearcheds.length === 0) {
        setUsersSearcheds([user]);
      } else {
        setUsersSearcheds([...usersSearcheds, user]);
      }
      await AsyncStorage.setItem(
        '@GitHub/users',
        JSON.stringify(usersSearcheds),
      );
      return user;
    } catch (err) {
      console.error(err);
    }
  }
  async function verifyDevExist() {
    try {
      if (
        usersSearcheds.length < 1 &&
        usersSearcheds.every(element => element !== dev)
      ) {
        console.log(`O dev ${dev} vai ser armazenado`);
        const user = await saveDev();
        navigation.navigate('Profile', user);
      }
    } catch (err) {
      console.error(err);
    }
  }
  async function handleSearchDev() {
    const { data } = await api.get(dev);
    const user = {
      id: data.id,
      name: data.name,
      username: data.login,
      avatar: data.avatar_url,
      company: data.company,
      blog: data.blog,
      location: data.location,
      biography: data.bio,
      repositories: data.repos_url,
      stars: `https://api.github.com/users/${dev}/starred`,
    };
    return user;
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
        {/* {usersSearcheds &&
          usersSearcheds.map((user, index) => (
            <Text key={index} style={styles.text}>
              {user}
            </Text>
          ))} */}
        {/* <FlatList
          data={usersSearcheds}
          keyExtractor={({item: user}, index) => index}
          renderItem={({item: user}, index) => {
            console.log(user);
            return (
              <Text key={index} style={styles.list}>
                {user}
              </Text>
            );
          }}
        /> */}
      </View>
    </View>
  );
}

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
