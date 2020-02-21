import React from 'react'
import { WebView } from 'react-native-webview'

export default function Profile({ navigation }){
    const github_username = navigation.getParam('github_username')
    const github_password = navigation.getParam('github_password')
    console.log(`User: ${github_username}\nPassword:${github_password}`)
    return <WebView style={{ flex: 1 }} source={{uri:`https://github.com/${github_username}`}} />
}
