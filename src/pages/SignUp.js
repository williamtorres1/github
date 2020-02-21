import React from 'react'
import { KeyboardAvoidingView, StyleSheet, Image, TextInput, TouchableOpacity, Text } from 'react-native'
import logo from '../assets/logo.png'
export default function Login(){
    return(
        <KeyboardAvoidingView
            behavior='height'
            style={styles.container}>
                <Image source={logo}/>
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Pick a username"
                    placeholderTextColor="#999"
                    style={styles.username}/>
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Your email address"
                    placeholderTextColor="#999"
                    style={styles.email}/>
                <TextInput
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Create a password"
                    placeholderTextColor="#999"
                    style={styles.password}
                    />
                <TouchableOpacity style={styles.signUp}>
                    <Text style={styles.signUpText}>Sign up</Text>
                </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
      alignItems: 'center',
    justifyContent: 'center',
    },
    text: {
        color: '#999',
        fontWeight: 'bold',
        fontSize: 16,
    },
    username: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginTop: 20,
        paddingHorizontal: 15,
    },
    email: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginTop: 5,
        paddingHorizontal: 15,
    },
    password: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginTop: 5,
        paddingHorizontal: 15,
    },
    signUp: {
        marginTop: 20,
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#2EBC4f',
        alignItems: 'center',
        justifyContent: 'center',

    },
    signUpText: {
        color: '#ffffe3',
        fontWeight: 'bold',
        fontSize: 16
    }
  });