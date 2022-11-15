import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";

import Assets from "../constants/assets";
import Colors from "../constants/colors";

const DisplayError = ({ message }) => (
  <View style={styles.container}>
    <Image source={Assets.icons.error} style={styles.icon} />
    <Text style={styles.errorText}>{message}</Text>
  </View>
);

export default DisplayError;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    tintColor: Colors.primary_blue,
  },
  errorText: {
    fontSize: 16,
  },
});