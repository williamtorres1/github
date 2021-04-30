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

import { User } from '../libs/User';

import location from '../assets/location.png';
import link from '../assets/link.png';
import mail from '../assets/mail.png';
import work from '../assets/work.png';

export const Profile: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const user = route.params as User;

  return (
    <View style={{ flex: 1, backgroundColor: '#fafafa' }}>
      <View style={styles.container}>
        <Image style={styles.avatar} source={{ uri: user.avatar }} />
        <View style={{ flexDirection: 'column' }}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.username}>{user.username}</Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        {user.biography && <Text style={styles.bio}>{user.biography}</Text>}

        {user.company && (
          <View style={{ flexDirection: 'row' }}>
            <Image source={work} />
            <Text style={styles.text}>{user.company}</Text>
          </View>
        )}

        {user.location && (
          <View style={{ flexDirection: 'row' }}>
            <Image source={location} />
            <Text style={styles.text}>{user.location}</Text>
          </View>
        )}

        {user.email && (
          <View style={{ flexDirection: 'row' }}>
            <Image source={mail} />
            <Text style={styles.text}>{user.email}</Text>
          </View>
        )}

        {user.blog && (
          <View style={{ flexDirection: 'row' }}>
            <Image source={link} />
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(user.blog);
              }}
            >
              <Text style={styles.text}>{user.blog}</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.repositoriesButton}
            onPress={() => {
              navigation.navigate('Repos', { login: user.username });
            }}
          >
            <Text style={styles.buttonText}>Repositories</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.starsButton}
            onPress={() => {
              navigation.navigate('Stars', { login: user.username });
            }}
          >
            <Text style={styles.buttonText}>Stars</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    marginBottom: 20,
  },
  bio: {
    marginBottom: 10,
  },
  text: {
    paddingHorizontal: 5,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  repositoriesButton: {
    height: 37,
    width: 130,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#CCCED0',
    backgroundColor: '#f2f5f7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  starsButton: {
    height: 37,
    width: 70,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#CCCED0',
    backgroundColor: '#f2f5f7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#575c60',
    fontWeight: 'bold',
  },
});
