import React from 'react'
import { View, Text } from 'react-native'
import OAuthManager from 'react-native-oauth'
const ClientID = require('../credentials/github.json').ClientID
const ClientSecret = require('../credentials/github.json').ClientSecret

const config = {
    github: {
        client_id: ClientID,
        client_secret: ClientSecret
    }
}

export default function Login(){
    return(
        <View>
            <Text>Hello again, friend of a friend</Text>
        </View>
    )
}