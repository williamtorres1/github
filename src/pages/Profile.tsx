import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { User } from '../libs/User';

interface Params {
  user: User;
}

export const Profile: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { user } = route.params as Params;

  return (
    <View style={styles.container}>
      <View style={styles.firstContainer}>
        <Image style={styles.avatar} source={{ uri: user.avatar }} />
        <View style={{ flexDirection: 'column' }}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.username}>{user.username}</Text>
        </View>
        {user.biography && <Text style={styles.bio}>{user.biography}</Text>}
      </View>

      <View style={styles.infoContainer}>
        {user.company && (
          <View style={{ flexDirection: 'row' }}>
            <MaterialIcons name="work" size={30} color="#000" />
            <Text style={styles.text}>{user.company}</Text>
          </View>
        )}

        {user.location && (
          <View style={{ flexDirection: 'row' }}>
            <MaterialIcons name="location-on" size={30} color="#E55043" />
            <Text style={styles.text}>{user.location}</Text>
          </View>
        )}

        {user.email && (
          <View style={{ flexDirection: 'row' }}>
            <Ionicons name="mail" size={30} color="#000" />
            <Text style={styles.text}>{user.email}</Text>
          </View>
        )}

        {user.blog && (
          <View style={{ flexDirection: 'row' }}>
            <Feather name="link" size={30} color="#000" />
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(user.blog);
              }}
            >
              <Text style={styles.text}>{user.blog}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.repositoriesButton}
          onPress={() => {
            navigation.navigate('Repos', { login: user.username });
          }}
        >
          <FontAwesome name="code-fork" size={30} color="#28a745" />
          <Text style={styles.buttonText}>Repositories</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.repositoriesButton}
          onPress={() => {
            navigation.navigate('Stars', { login: user.username });
          }}
        >
          <FontAwesome name="star" size={30} color="#1e2327" />
          <Text style={styles.buttonText}>Stars</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  firstContainer: {
    flexDirection: 'row',
    backgroundColor: '#fefefe',
    padding: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CCCED0',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 28,
    paddingHorizontal: 15,
    marginTop: 15,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#999',
    paddingHorizontal: 15,
  },

  infoContainer: {
    flexDirection: 'column',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 20,
    marginBottom: 40,
  },
  bio: {
    marginBottom: 10,
  },
  text: {
    paddingHorizontal: 5,
    fontSize: 20,
    lineHeight: 35,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  repositoriesButton: {
    height: 37,
    width: '45%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#CCCED0',
    backgroundColor: '#f2f5f7',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginRight: 10,
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 18,
    color: '#575c60',
    fontWeight: 'bold',
    marginLeft: 20,
  },
});
