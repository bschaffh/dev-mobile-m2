import Search from "./SearchComponent";
import { createStackNavigator} from "@react-navigation/stack";
import { StyleSheet, Text, View } from 'react-native';
import MovieDetails from "./MovieDetailsComponent";

const StackNavigator = createStackNavigator();
function RootStack() {
  return (
    <StackNavigator.Navigator
      initialRouteName="Recherche" >
      <StackNavigator.Screen
        name="Recherche"
        component={Search} />
    <StackNavigator.Screen
        name="Film"
        component={MovieDetails} />
    </StackNavigator.Navigator>
  );
}



export default RootStack;