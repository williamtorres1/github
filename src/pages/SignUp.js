import React from 'react'
import { KeyboardAvoidingView, StyleSheet, Image, TextInput, TouchableOpacity, Text } from 'react-native'
import logo from '../assets/logo.png'
export default function Login(){
    return(
        <KeyboardAvoidingView
            behavior='height'
            style={styles.container}>
                <Image source={logo}/>
                <Text style={styles.textJoin}>Join GitHub</Text>
                <Text style={styles.textCreate}>Create your account</Text>
                <TextInput
                    //textContentType={none}
                    //textContentType={username}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Username"
                    placeholderTextColor="#999"
                    style={styles.username}/>
                <TextInput
                    //textContentType={none}
                    //textContentType={username}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Email address"
                    placeholderTextColor="#999"
                    style={styles.email}/>
                <TextInput
                    secureTextEntry={true}
                    //textContentType={password}
                    autoCapitalize="none"
                    autoCorrect={false}
                    //autoCompleteType={off}
                    placeholder="Password"
                    placeholderTextColor="#999"
                    style={styles.password}
                    />
                <TouchableOpacity style={styles.signIn}>
                    <Text style={styles.signInText}>Sign In</Text>
                </TouchableOpacity>
        </KeyboardAvoidingView>
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
    textJoin: {

    },
    textCreate: {
        
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
    signUp: {
        marginTop: 5,
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