import React from 'react'
import { View, Text, Image, StyleSheet, Button } from 'react-native'

import Company from '../assets/company.png'
import Location from '../assets/pin.png'
import Mail from '../assets/mail.png'
import Blog from '../assets/link.png'



export default function Profile({ navigation, route }){
    const user = route.params.dev
    return (
        <>
        {/* Infos do perfil */}
        <View>
            <Image style={styles.avatar} source={{uri: user.avatar_url}}/>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.bio}>{user.bio}</Text>


            <Text style={styles.text}>
                <Image source={Company} style={styles.image}/>
                {user.company}
            </Text>
            <Text style={styles.text}>
                <Image source={Location} style={styles.image}/>
                {user.location}
            </Text>
                <Text style={styles.text}>                
                <Image source={Mail} style={styles.image}/>
                {user.email}
            </Text>            
            <Text style={styles.text}>
                <Image source={Blog} style={styles.image}/>
                {user.blog}
            </Text>
        </View>

        <Button onPress={<WebView source={{ uri: `https://github.com/${user.login}?tab=repositories`}}/>}/>
        <Button onPress={}/>
        
        </>
    )
}

const styles = StyleSheet.create({
    avatar:{
        width: 100,
        height: 100,
        borderRadius: 5,
        borderWidth: 5,
        borderColor: '#999',
    },
    text:{
        textAlign: 'left',
        color: '#000',
        marginBottom: 10,
        borderWidth: 2,
        borderColor: '#999',
        marginRight: 125
    },
    name:{
        fontWeight: 'bold',
        fontSize: 20,
    },
    bio:{
        color: '#666',
        marginTop: 16,
        textAlign: 'left'
    },
    image: {
        width: 16,
        height: 16,
    },

    container:{
        flex: 1,

    },
    repos: {
        justifyContent: 'center'

    },
    stars: {
        justifyContent: 'space-evenly'

    }
})