import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import Company from '../assets/company.png'
import Location from '../assets/pin.png'
import Mail from '../assets/mail.png'
import Blog from '../assets/link.png'

export default function Profile({ navigation }){
    // const github_username = navigation.getParam('github_username')
    return (
        <View>
            <Image style={styles.avatar} source={{uri: "https://avatars0.githubusercontent.com/u/39351781?v=4"}}/>
            <Text style={styles.name}>William Torres</Text>
            <Text style={styles.bio}>Técnico em Mecatrônica. Aspirante a programador. @williamtorres074@gmail.com</Text>


            <Text style={styles.text}>
                <Image source={Company} style={styles.image}/>
                IFPE
            </Text>
            <Text style={styles.text}>
                <Image source={Location} style={styles.image}/>
                Caruaru, Pernambuco - Brasil
            </Text>
            <Text style={styles.text}>
                <Image source={Mail} style={styles.image}/>
                williamtorres074@gmail.com

            </Text>
            <Text style={styles.text}>
                <Image source={Blog} style={styles.image}/>
                linkedin.com/in/williamtorres1
            </Text>
        </View>
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
    }
})