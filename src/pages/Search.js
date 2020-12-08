import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  Image,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import api from '../services/api';

import finder from '../assets/finder.png';

export default function Search() {
  const navigation = useNavigation();

  const [dev, setDev] = useState('');
  const [usersSearcheds, setUsersSearcheds] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    async function setUsersSearchedFunction() {
      setUsersSearcheds(
        JSON.parse(await AsyncStorage.getItem('@GitHub/users')),
      );
    }
    setUsersSearchedFunction();
  }, []);

  // useEffect(() => {
  //   AsyncStorage.getItem('@github/recents')
  //     .then(users => {
  //       if (JSON.parse(users)) {
  //         setUsersSearcheds(JSON.parse(users));
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }, []);
  async function saveDev() {
    const user = await handleSearchDev();
    console.log(`>> Salvando ${user.name}.`);
    setUsersSearcheds([...usersSearcheds, user]);
    await AsyncStorage.setItem('@GitHub/users', JSON.stringify(usersSearcheds));
  }
  async function verifyDevExist() {
    try {
      if (usersSearcheds.every(element => element !== dev)) {
        console.log(`O dev ${dev} vai ser armazenado`);
        await saveDev();
      }

      console.log(JSON.parse(await AsyncStorage.getItem('@GitHub/users')));

      // setAllUsers([JSON.parse(await AsyncStorage.getItem('@GitHub/users'))]);
      // await AsyncStorage.setItem(
      //   '@GitHub/users',
      //   JSON.stringify(await handleSearchDev()),
      // );
      // console.log(await AsyncStorage.getItem('@GitHub/users'));
      // if (allUsers) {
      //   console.log('>> Já existem usuários armazenados');
      //   if (
      //     allUsers.every(searchedDev => {
      //       console.log('searchedDev', searchedDev);
      //       return searchedDev.username === dev;
      //     })
      //   ) {
      //     console.log(`>> O dev: ${dev} não foi armazenado ainda!`);
      //     await saveDev();
      //   } else {
      //     console.log('>> Entrou no else de novo');
      //   }
      // } else {
      //   console.log('>> Não há nenhum usuário salvo.');
      //   await saveDev();
      // }
    } catch (err) {
      console.error(err);
    }
  }
  async function handleSearchDev() {
    const {data} = await api.get(dev);
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

    // function userExist(element) {
    //   return element !== devs;
    // }

    // const recents = JSON.parse(await AsyncStorage.getItem('@github/recents'));
    // if (recents) {
    //   if (recents.every(userExist)) {
    //     console.log(`O usuário ${devs} será armazenado.`);
    //     recents.push(devs);
    //     await AsyncStorage.setItem('@github/recents', JSON.stringify(recents));
    //     setUsersSearcheds(recents);
    //   } else {
    //     console.log(`O usuário ${devs} já existe no banco de dados`);
    //   }
    // } else {
    //   await AsyncStorage.removeItem('@github/recents');
    //   await AsyncStorage.setItem('@github/recents', JSON.stringify([devs]));
    //   setUsersSearcheds([devs]);
    // }

    // navigate('Profile', {dev: sourceContent});
  }

  return (
    <View style={{flex: 1, backgroundColor: '#999'}}>
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
