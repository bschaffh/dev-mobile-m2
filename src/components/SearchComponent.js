import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, FlatList, RefreshControl, Keyboard } from 'react-native';
import { findPopularMovies, findMovies } from '../api/TMDB';
import Movie from './MovieComponent';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isMorePages, setIsMorePages] = useState(true)
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        updateMoviesList([], 1);
    }, []);

    const loadPopularMovies = async (currentMovies, page) => {
        setIsLoading(true);
        const results = await findPopularMovies(page);
        setIsLoading(false);
        setMovies([...currentMovies, ...results.results]);
        setCurrentPage(results.page);
        results.page == results.total_pages
            ? setIsMorePages(false)
            : setIsMorePages(true);
    }
    
    const newMoviesSearchButton = () => {
        Keyboard.dismiss();
        newMoviesSearch();
    }

    const newMoviesSearch = () => {
        updateMoviesList([], 1);
    }

    const updateMoviesList = (currentMovies=[], page=1) => {
        if (searchQuery == "")
            loadPopularMovies(currentMovies, page);
        else
            loadMoviesByQuery(currentMovies, page);
    }

    const loadMoviesByQuery = async (currentMovies, page) => {
        setIsLoading(true);
        const results = await findMovies(searchQuery, page);
        setIsLoading(false);
        setMovies([...currentMovies, ...results.results]);
        setCurrentPage(results.page);
        results.page == results.total_pages
            ? setIsMorePages(false)
            : setIsMorePages(true);
    }

    const loadMoreMovies = async () => {
        if (isMorePages) {
            updateMoviesList(movies, currentPage + 1);
        }
    }

    return (
        <View>
            <TextInput 
                style={styles.input} 
                value={searchQuery} 
                onChangeText={(v) => {setSearchQuery(v); newMoviesSearch();}} 
                placeholder="Texte à rechercher"
            />
            <TouchableOpacity onPress={newMoviesSearchButton} style={styles.button}>
                <Text style={{fontSize: 17}}>Rechercher</Text>
            </TouchableOpacity>
                <FlatList
                    data={movies} 
                    renderItem={ 
                        ({item}) => (<Movie movie={item}/>)
                    }
                    keyExtractor={(item) => item.id}
                    onEndReached={loadMoreMovies}
                    onEndReachedThreshold={0.5}
                    onRefresh={() => updateMoviesList()}
                    refreshing={isLoading}
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