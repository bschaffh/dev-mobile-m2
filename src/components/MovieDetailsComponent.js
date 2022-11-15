import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DisplayError from './DisplayErrorComponent';
import { getMovieDetailsById } from '../api/TMDB';

const MovieDetails = (props) => {
    const { movieId } = props.route.params;
    let [movie, setMovie] = useState();
    let [isError, setIsError] = useState(false);

    useEffect(() => {
        setIsError(false);
        console.log(movieId);
        /*(async () => {
            try {
                const movieDetails = await getMovieDetailsById(movieId);
                setMovie(movieDetails);
            }
            catch(error){
                setIsError(true);
            }
        })*/
        const getMovieDetails = async () => {
            const movieDetails = await getMovieDetailsById(movieId);
            setMovie(movieDetails)
        }

        getMovieDetails()
        .catch(console.error);

    }, []);

    return (
        <View>
            {isError ? <DisplayError message="Impossible de récupérer les informations du film"/> : <Text>Film {movieId} </Text>}
        </View>
    );
}

export default MovieDetails;