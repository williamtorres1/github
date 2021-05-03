import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { useAuth } from '../hooks';

export const Login: React.FC = () => {
  const { signIn } = useAuth();

  function handleSignIn() {
    signIn();
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <FontAwesome name="github-square" size={45} color="#fff" />
        <Text style={styles.buttonText}>Login com o GitHub!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    width: '70%',
    backgroundColor: '#000',
    height: 50,
    borderRadius: 15,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 50,
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#fffff9',
  },
});
