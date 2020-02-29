import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, Image, View, TextInput, TouchableOpacity  } from 'react-native'
import Axios from 'axios'
import finder from '../assets/finder.png'

import AsyncStorage from '@react-native-community/async-storage';

export default function Search({ navigation: { navigate } }){
    const [devs, setDevs] = useState('');
    const [usersSearcheds, setUsersSearcheds] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('@github/recents')
        .then(users => {
            // console.log(JSON.parse(users));
            setUsersSearcheds(JSON.parse(users));
        })
        .catch(error => {
            console.log(error)
        });
    }, []);
    async function searchDevs(){
        const AxiosResponse = await Axios.get(`https://api.github.com/users/${devs}`)
        const {
                name = login,
                login, 
                avatar_url, 
                id,
                company,
                location, 
                email,
                blog,
                bio,
                repos_url,
                public_repos,
                starred_url,
            } = AxiosResponse.data


        const sourceContent = {
            avatar_url: avatar_url,
            id: id,
            name: name,
            username: login,
            company: company,
            blog: blog,
            location: location,
            email: email,
            bio: bio,
            repos_url: repos_url,
            starred_url: starred_url,
            numberRepos: public_repos
        }


        const recents = JSON.parse(await AsyncStorage.getItem('@github/recents'));
        console.log(recents);
        if(recents){
            recents.push(devs);
            await AsyncStorage.removeItem('@github/recents');
            await AsyncStorage.setItem('@github/recents', JSON.stringify(recents) );
            await setUsersSearcheds(recents);
        }else {
            await AsyncStorage.removeItem('@github/recents');
            await AsyncStorage.setItem('@github/recents', JSON.stringify([devs]) );
            await setUsersSearcheds(devs);
        }
        navigate('Profile', {dev: sourceContent})
                
    }
 
    return (
        <View style={{flex: 1}}>
            
            <View style={styles.searchForm}>
                <TextInput 
                    style={styles.searchInput}
                    placeholder="Procurar devs"
                    placeholderTextColor="#616467"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={devs}
                    onChangeText={setDevs}
                />
                <TouchableOpacity style={styles.loadButton} onPress={searchDevs}>
                    <Image style={styles.searchButton} source={finder}/>
                </TouchableOpacity>
            </View>

            <View style={styles.usersSearcheds}>
                {usersSearcheds.map( (user, index) => (
                    <Text key={index} style={styles.usersSearcheds}>{user}</Text>
                ))}
            </View>
        
        </View>
    )
}

const styles = StyleSheet.create({
    searchForm: {
        flex: 1,
        position: 'absolute',
        top: 5,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row',
    },
    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#fafafa',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4
        },
        elevation: 1,
        marginTop: 10
    },
    loadButton: {
        width: 50,
        height: 50,        
        backgroundColor: '#fafafa',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
        marginTop: 10
    },
    searchButton: {
        resizeMode: 'center'
    },


    usersSearcheds:{
        paddingVertical: 75,
        paddingHorizontal: 20        
    }
})
