import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity} from "react-native";
import { useSelector } from "react-redux";
import { getPosterSource } from "../api/TMDB";

import Assets from "../constants/assets";
import Colors from "../constants/colors";

const MovieListElement = ({movie, onPress}) => {
  const favoriteMovies = useSelector((state) => state.favorite.favoriteMovies);

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image style={styles.poster} source={getPosterSource(movie.poster_path)} />
      <View style={styles.informationContainer}>
        <View style={styles.movieHeader}>
          <Text style={styles.title}>{movie.title}</Text>
          {
            favoriteMovies.includes(movie.id) && 
              <Image source={Assets.icons.favoriteHeartFull} style={styles.fullHeart}/>
          }
        </View>
        <Text style={styles.overview} numberOfLines={4}>
          {movie.overview}
        </Text>
        <View style={styles.statsContainer}>
          <View style={styles.statContainer}>
            <Image style={styles.icon} source={Assets.icons.voteAverage} />
            <Text style={styles.voteAverage}>{movie.vote_average}</Text>
          </View>
          <View style={styles.statContainer}>
            <Text style={styles.voteCount}>{movie.vote_count}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MovieListElement;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 8,
  },
  movieHeader:{
    flexDirection: 'row'
  },
  fullHeart:{
    tintColor: Colors.primary_blue,
    resizeMode: 'contain', 
    flex: 1,
    height: 25,
    width: 25,
    margin: 5
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    paddingBottom: 10,
    flex: 4
  },
  informationContainer: {
    flex: 1,
    marginLeft: 12,
    marginTop: 0,
  },
  statsContainer: {
    flexDirection: "row",
    marginTop: 12,
  },
  statContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  poster: {
    width: 120,
    height: 180,
    marginLeft: 5,
    borderRadius: 8,
    backgroundColor: Colors.primary_blue,
  },
  voteAverage: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary_blue,
  },
  voteCount: {
    fontSize: 14,
    alignSelf: "flex-end",
    fontStyle: "italic",
  },
  overview: {
    fontSize: 16,
  },
  icon: {
    tintColor: Colors.primary_blue,
    width: 20,
    height: 20,
    marginRight: 4,
  },
});