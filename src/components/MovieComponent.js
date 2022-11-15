import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";

import Assets from "../constants/assets";
import Colors from "../constants/colors";

const Movie = ({movie}) => {
  const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/original';
  const isPosterLocal = movie.poster_path;
  const imageSrc = !isPosterLocal ? require("../../assets/noPoster.jpg") : {uri: `${POSTER_BASE_URL}${movie.poster_path}`};
  return (
    <View style={styles.container}>
      <Image style={styles.poster} source={imageSrc} />
      <View style={styles.informationContainer}>
        <Text style={styles.title}>{movie.title}</Text>
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
    </View>
  );
};

export default Movie;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 8,
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    paddingBottom: 10
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