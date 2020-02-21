import React, { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Image, TextInput, TouchableOpacity, Text } from 'react-native'
import logo from '../assets/logo.png'
export default function Login({ navigation }){

    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')

    return(
        <>
        <KeyboardAvoidingView
            behavior='height'
            style={styles.container}>
                <Image source={logo}/>
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Username or email address"
                    placeholderTextColor="#999"
                    style={styles.email}
                    value={user}
                    onChangeText={setUser}
                    />
                <TextInput
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Password"
                    placeholderTextColor="#999"
                    style={styles.password}
                    value={pass}
                    onChangeText={setPass}
                    />
                    
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Profile', { github_username: user, github_password: pass })
                    }}
                    style={styles.signIn}>
                    <Text style={styles.signInText}>Sign In</Text>                
                </TouchableOpacity>
        </KeyboardAvoidingView>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20
    },
    email: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginTop: 20,
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
    signIn: {
        marginTop: 5,
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#2db74c',
        alignItems: 'center',
        justifyContent: 'center',

    },
    signInText: {
        color: '#fffff9',
        fontWeight: 'bold',
        fontSize: 16
    }
  });