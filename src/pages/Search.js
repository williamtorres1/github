import React, { useState } from 'react';
import { StyleSheet, Image, View, TextInput, TouchableOpacity, AsyncStorage} from 'react-native'
import Axios from 'axios'
import finder from '../assets/finder.png'

export default function Search({ navigation: { navigate } }){
    const [devs, setDevs] = useState('')

    async function searchDevs(){
        // const AxiosResponse = await Axios.get(`https://api.github.com/users/${devs}`)
        const sourceContent = {
            avatar_url: 'https://avatars0.githubusercontent.com/u/39351781?v=4',
            id: 39351781,
            name: 'William Torres',
            company: 'IFPE',
            blog: 'linkedin.com/in/williamtorres1',
            location: 'Caruaru, Pernambuco - Brasil',
            email: 'williamtorres074@gmail.com',
            bio: 'Técnico em Mecatrônica. Aspirante a programador.'
        }
        console.log(sourceContent)
        const username = 'williamtorres1'
        navigate('Profile', {github_username: username})        
    }
 
    return (
        <View style={styles.searchForm}>
            <TextInput 
                style={styles.searchInput}
                placeholder="Procurar devs"
                placeholderTextColor="#999"
                autoCapitalize="none"
                autoCorrect={false}
                value={devs}
                onChangeText={setDevs}
            />
            <TouchableOpacity style={styles.loadButton} onPress={searchDevs}>
                <Image style={styles.loadImage} source={finder}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    searchForm: {
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
        backgroundColor: '#FFF',
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
        elevation: 1
    },
    loadButton: {
        width: 50,
        height: 50,        
        backgroundColor: '#9999',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    },
    loadImage: {
        resizeMode: 'center'
    }
})