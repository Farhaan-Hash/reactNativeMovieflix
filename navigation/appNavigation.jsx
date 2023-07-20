import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScr from "../screen/HomeScr";
import MovieScr from "../screen/MovieScr";
import PersonScr from "../screen/PersonScr";
import SearchSrc from "../screen/SearchSrc";

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{headerShown: false}}
          component={HomeScr}
        />

        <Stack.Screen
          name="Movie"
          options={{headerShown: false}}
          component={MovieScr}
        />
        <Stack.Screen
          name="Person"
          options={{headerShown: false}}
          component={PersonScr}
        />
        <Stack.Screen
          name="Search"
          options={{headerShown: false}}
          component={SearchSrc}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigation;
