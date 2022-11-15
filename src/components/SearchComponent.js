import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, FlatList } from 'react-native';
import filmsData from '../helpers/filmsData';
import Movie from './MovieComponent';

const Search = () => {
    const movies = filmsData.results
    return (
        <View>
            <TextInput style={styles.input} placeholder="Texte à rechercher"/>
            <TouchableOpacity style={styles.button}>
                <Text style={{fontSize: 17}}>Rechercher</Text>
            </TouchableOpacity>
            <FlatList
                data={movies} 
                renderItem={ 
                    ({item}) => (<Movie movie={item}/>)
                }
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}

const FONT_SIZE = 17;

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        backgroundColor: colors.primary_blue,
        padding: 10,
        marginBottom: 15,
        innerHeight: 150,
        borderRadius: 3,
        color: "white"
    },
    input :{
        marginBottom: 20,
        fontSize: FONT_SIZE
    }
})

export default Search;