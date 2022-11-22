import Search from "./SearchComponent";
import { createStackNavigator} from "@react-navigation/stack";
import MovieDetails from "./MovieDetailsComponent";
import FavoritePage from "./FavoritePageComponent";
import { FadeOut } from "react-native-reanimated";

const StackNavigator = createStackNavigator();

export function RootStack() {
  return (
    <StackNavigator.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="RechercheScreen" >
      <StackNavigator.Screen
        name="RechercheScreen"
        component={Search} />
    <StackNavigator.Screen
        name="Film"
        component={MovieDetails} />
    </StackNavigator.Navigator>
  );
}

export function FavStack() {
  return (
    <StackNavigator.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="RechercheA" >
      <StackNavigator.Screen
        name="RechercheA"
        component={FavoritePage} />
    <StackNavigator.Screen
        name="FilmA"
        component={MovieDetails} />
    </StackNavigator.Navigator>
  );
}

