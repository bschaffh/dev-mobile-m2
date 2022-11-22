import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator, ScrollView } from 'react-native';
import DisplayError from './DisplayErrorComponent';
import { getMovieDetailsById, getPosterSource, POSTER_BASE_URL } from '../api/TMDB';
import Colors from "../constants/colors";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { addFavoriteMovie, removeFavoriteMovie } from '../store/reducers/favoriteReducer';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-root-toast';

const MovieDetails = ({route}) => {
    const { movieId } = route.params;
    const favoriteMovies = useSelector((state) => state.favorite.favoriteMovies);
    const dispatch = useDispatch();
    let [movie, setMovie] = useState();
    let [isError, setIsError] = useState(false);
    let [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getMovieDetails()
    }, []);

    const getMovieDetails = async () => {
        try {
            setIsLoading(true);
            const movieDetails = await getMovieDetailsById(movieId);
            setMovie(movieDetails);
            setIsLoading(false);
            console.log(movieDetails)
        }
        catch(error){
            console.log(error);
            setIsError(true);
            setIsLoading(false);
        }
    }

    const getFavoriteButtonText = () => {
        return favoriteMovies.includes(movie.id) ? "RETIRER DES FAVORIS" : "AJOUTER AUX FAVORIS";
    }

    const getFavoriteButtonHandle = () => {
        if (favoriteMovies.includes(movie.id)){
            dispatch(removeFavoriteMovie(movie.id));
            showToaster("Film retiré des favoris");
        }
        else{
            dispatch(addFavoriteMovie(movie.id));
            showToaster("Film ajouté aux favoris");
        }
    }

    const getProductionCompanyLogoSource = (company) => {
        if (company.logo_path)
            return {uri : `${POSTER_BASE_URL}${company.logo_path}`};
        return require("../../assets/missingImage.png");
    }

    const showToaster = (message) => {
        Toast.show(message, {
            duration: 700,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0
        });
        
    }

    return (
        <ScrollView style={styles.container}>
            {isError ? <DisplayError message="Impossible de récupérer les informations du film"/> : 
            (
                isLoading ? (
                <View style={styles.containerLoading}>
                    <ActivityIndicator size="large"/>
                </View>
                ) :
                <View>
                    <View style={styles.mainInfosContainer}>
                        <Image style={styles.moviePoster} source={getPosterSource(movie.backdrop_path)}/>
                        <View style={styles.movieMainInfos}>
                            <View style={styles.mainInfoTextContainer}>
                                <Text style={styles.movieTitle}>{movie.title}</Text>
                                <Text>{movie.tagline}</Text>
                            </View>
                            <View style={styles.rankingContainer}>
                                <View style={styles.rank}>
                                    <Text style={{fontWeight: 'bold', fontSize: 17, color: "white"}}>
                                        {Math.round(movie.vote_average * 10) / 10}
                                    </Text>
                                    <Text style={{color: 'white'}}> /10</Text>
                                </View>
                                <Text style={{fontSize: 12}}>{movie.vote_count} votes</Text>
                            </View>
                        </View>
                    </View>


                    <View style={styles.detailsContainer}>
                        <TouchableOpacity style={styles.favoriteButton} onPress={getFavoriteButtonHandle}>
                            <Text style={styles.favoriteButtonText}>{getFavoriteButtonText()}</Text>
                        </TouchableOpacity>
                        <Text style={styles.detailName}>Release Date</Text>
                        <Text style={styles.detailValue}>{movie.release_date}</Text>
                        <Text style={styles.detailName}>Genres</Text>
                        <Text style={styles.detailValue}>{movie.genres.map(g => g.name).join(" - ")}</Text>
                        <Text style={styles.detailName}>Revenue</Text>
                        <Text style={styles.detailValue}>{movie.revenue} $</Text>
                        <Text style={styles.detailName}>Production Companies</Text>
                        <View style={{ flexDirection: 'column'}}>
                            {
                                movie.production_companies.map(
                                    (company, i) => 
                                    <View key={i} style={{flexDirection :'row', marginBottom: 5}}>
                                        <Image source={getProductionCompanyLogoSource(company)} style={styles.productionCompanyLogo}/>
                                        <Text style={styles.productionCompanyName} key={i}>{company.name}</Text>
                                    </View>
                                )
                            }
                        </View>
                    </View>
                </View>
            )
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        margin: 15
    },
    containerLoading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    mainInfosContainer: {
        backgroundColor: "white",
        marginBottom: 12,
        borderRadius: "6%"
    },
    movieMainInfos:{
        padding: 10,
        flexDirection: 'row'
    },
    movieTitle: {
        fontSize: 20,
        marginBottom: 4,
        fontWeight: "bold"
    },
    moviePoster: {
        height: 200,
        resizeMode: 'contain'
    },
    mainInfoTextContainer:{
        flex: 2
    },
    rankingContainer:{
        marginLeft: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    rank:{
        color: 'white',
        backgroundColor: Colors.primary_blue,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
        alignSelf: 'stretch',
        borderRadius: '4%',
        flexDirection: 'row'
    },
    detailsContainer: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: "6%"
    },
    favoriteButton:{
        backgroundColor: Colors.primary_blue,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        borderRadius: "4%",
        marginBottom: 20
    },
    favoriteButtonText:{
        color: 'white',
        justifyContent: 'center',
        fontSize: 18
    },
    detailName: {
        color: Colors.primary_blue,
        fontWeight: "bold",
        fontSize: 15
    },
    detailValue:{
        fontSize: 14,
        justifyContent: 'center',
        marginBottom: 15
    },
    productionCompanyName:{
        fontSize: 14,
        justifyContent: 'center',
        marginTop: 8,
        marginLeft: 6
    },
    productionCompanyLogo: {
        height: 35,
        width: 35,
        resizeMode: "contain"
    }

})

export default MovieDetails;