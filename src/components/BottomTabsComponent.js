import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Colors from "../constants/colors";
import {RootStack, FavStack} from "./RootStackComponent";
import FavoritePage from "./FavoritePageComponent";

const BottomTabs = (props) => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator intialRouteName="Recherche" screenOptions={{tabBarActiveTintColor: Colors.primary_blue}}>
            <Tab.Screen 
                name="Recherche"
                component={RootStack}/>
            <Tab.Screen
                name="Favoris"
                component={FavStack}/>
        </Tab.Navigator>
    );
}

export default BottomTabs;