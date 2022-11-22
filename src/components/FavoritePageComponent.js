import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { getMovieDetailsById } from "../api/TMDB";
import MovieListElement from "./MovieListElementComponent";

const FavoritePage = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [movies, setMovies] = useState([]);
    const favoriteMoviesId = useSelector((state) => state.favorite.favoriteMovies);

    useEffect(() => {
        setMovies([]);
        getMoviesDetails([]);
    }, []);

    useEffect(() => {
        getMoviesDetails([]);
    }, [favoriteMoviesId]);
    
    const getMoviesDetails = async (currentMovies) => {
        try {
            setIsLoading(true);

            let newMovies = [];
            for(const movieId of favoriteMoviesId){
                const movieDetails = await getMovieDetailsById(movieId);
                newMovies.push(movieDetails);
            }
            setMovies([...currentMovies, ...newMovies]);
            setIsLoading(false);
        }
        catch(error){
            console.log(error);
            setIsLoading(false);
        }
    }
    
    const navigateToFilmDetails = (movieId) => {
        props.navigation.navigate('FilmA', {
            movieId: movieId
        });
    }
    
    return (
        <FlatList
                style={styles.container}
                data={movies} 
                renderItem={ 
                    ({item}) => (<MovieListElement onPress={() => navigateToFilmDetails(item.id)} movie={item}/>)
                }
                keyExtractor={(item) => item.id}
                onRefresh={getMoviesDetails}
                refreshing={isLoading}
            />  
    );
};

const styles = StyleSheet.create({
    container:{
        margin: 10
    }
});

export default FavoritePage;