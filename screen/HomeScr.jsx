import React, {useEffect, useState} from "react";

import {StatusBar} from "expo-status-bar";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import tw from "twrnc";
import {styles} from "../theme";
import TrendingMovies from "../components/trendingMovies";
import MovieList from "../components/movieList";
import {SafeAreaView} from "react-native-safe-area-context";
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import Loading from "../components/loading";
import {
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from "../api/movidb";
const ios = Platform.OS == "ios";

const HomeScr = () => {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  // API CALL-------------------------------------------------------
  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    // console.log("Trending movies:", data);
    if (data && data?.results) setTrending(data.results);
    setLoading(false);
  };
  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();
    // console.log("Upcoming movies:", data);
    if (data && data?.results) setUpcoming(data.results);
    setLoading(false);
  };
  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    // console.log("Top Rated movies:", data);
    if (data && data?.results) setTopRated(data.results);
    setLoading(false);
  };

  return (
    <View style={tw`flex-1 bg-neutral-800`}>
      {/* Search bar & Logo---------------------------------------------------------------------- */}
      <SafeAreaView style={ios ? tw`-mb-2` : `mb-3`}>
        <StatusBar style="light" />
        <View style={tw`flex-row justify-between items-center mx-4`}>
          <Bars3CenterLeftIcon color="white" size="30" strokeWidth={2} />
          <Text style={tw`text-white text-3xl font-bold`}>
            <Text style={styles.text}>M</Text>ovieFlix
          </Text>

          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon size="30" color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicators={false}
          contentContainerStyle={{paddingBottom: 10}}
        >
          {/* TRENDING MOVIES--------------------------------------------------------------------- */}
          {trending.length > 0 && <TrendingMovies data={trending} />}
          {/* Upcoming Movies--------------------------------------- */}
          {upcoming.length > 0 && (
            <MovieList title="Upcoming" data={upcoming} />
          )}
          {/* Top Rated Movies--------------------------------------- */}
          {topRated.length > 0 && (
            <MovieList title="Top Rated" data={topRated} />
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default HomeScr;
