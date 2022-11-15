import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, FlatList, RefreshControl, Keyboard } from 'react-native';
import { findPopularMovies, findMoviesByQuery } from '../api/TMDB';
import DisplayError from './DisplayErrorComponent';
import MovieListElement from './MovieListElementComponent';

const Search = (props) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isMorePages, setIsMorePages] = useState(true)
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        updateMoviesList([], 1);
    }, []);

    const newMoviesSearchButton = () => {
        Keyboard.dismiss();
        newMoviesSearch();
    }

    const newMoviesSearch = () => {
        updateMoviesList([], 1);
    }

    const updateMoviesList = (currentMovies=[], page=1) => {
        setIsError(false);
        if (searchQuery == "")
            loadPopularMovies(currentMovies, page);
        else
            loadMoviesByQuery(currentMovies, page);
    }
    
    const loadPopularMovies = async (currentMovies, page) => {
        setIsLoading(true);
        try {
            const results = await findPopularMovies(page);
            setMovies([...currentMovies, ...results.results]);
            setCurrentPage(results.page);
            results.page == results.total_pages
                ? setIsMorePages(false)
                : setIsMorePages(true);
        }
        catch(error){
            setIsError(true);
            setMovies([]);
            setIsMorePages(true);
            setCurrentPage(1);
        }
        setIsLoading(false);
    }

    const loadMoviesByQuery = async (currentMovies, page) => {
        setIsLoading(true);
        try {
            const results = await findMoviesByQuery(searchQuery, page);
            setMovies([...currentMovies, ...results.results]);
            setCurrentPage(results.page);
            results.page == results.total_pages
                ? setIsMorePages(false)
                : setIsMorePages(true);
        }
        catch(error){
            setIsError(true);
            console.log(error);
            setMovies([]);
            setIsMorePages(true);
            setCurrentPage(1);
        }
        setIsLoading(false);
    }

    const loadMoreMovies = async () => {
        if (isMorePages) {
            updateMoviesList(movies, currentPage + 1);
        }
    }

    const navigateToFilmDetails = (movieId) => {
        props.navigation.navigate('Film', {
            movieId: movieId
        });
    }

    return (
        <View style={styles.container}>
            <TextInput 
                style={styles.input} 
                value={searchQuery} 
                onChangeText={(v) => {setSearchQuery(v); newMoviesSearch();}} 
                placeholder="Texte à rechercher"
            />
            <TouchableOpacity onPress={newMoviesSearchButton} style={styles.button}>
                <Text style={{fontSize: 17}}>Rechercher</Text>
            </TouchableOpacity>
            {isError ? <DisplayError message="Impossible de trouver les films"/> :
            <FlatList
                data={movies} 
                renderItem={ 
                    ({item}) => (<MovieListElement onPress={() => navigateToFilmDetails(item.id)} movie={item}/>)
                }
                keyExtractor={(item) => item.id}
                onEndReached={loadMoreMovies}
                onEndReachedThreshold={0.5}
                onRefresh={() => updateMoviesList()}
                refreshing={isLoading}
            />  }     
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
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10
    }
})
export default Search;