import React, {useState, useEffect} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
  Image,
} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import {SafeAreaView} from "react-native-safe-area-context";
import tw from "twrnc";
import {ChevronLeftIcon} from "react-native-heroicons/outline";
import {HeartIcon} from "react-native-heroicons/solid";
import {styles, theme} from "../theme";
import {LinearGradient} from "expo-linear-gradient";
import Cast from "../components/cast";
import MovieList from "../components/movieList";
import Loading from "../components/loading";
import {
  fallbackMoviePoster,
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
  image500,
} from "../api/movidb";

const ios = Platform.OS == "ios";
const topMargin = ios ? "" : " mt-3";
var {width, height} = Dimensions.get("window");

const MovieScr = () => {
  const navigation = useNavigation();
  const {params: item} = useRoute();
  const [isFav, toggleFavorite] = useState(false);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMOvies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});

  // let movieName = "Antman and the Wasp: Quantumania";

  // if item changes
  useEffect(() => {
    // call api
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  }, [item]);

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id);
    // console.log("got", data);
    if (data) setMovie(data);

    setLoading(false);
  };
  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id);
    if (data && data.cast) setCast(data.cast);
    setLoading(false);
  };
  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id);
    if (data && data?.results) setSimilarMOvies(data.results);
    setLoading(false);
  };
  return (
    <ScrollView
      contentContainerStyle={{paddingBottom: 20}}
      style={tw`flex-1 bg-neutral-900`}
    >
      {/* BACK BUTTON & MOVIE POSTER------------------------------------------ */}
      <View style={tw`w-full relative`}>
        <SafeAreaView
          style={[
            tw`absolute z-20 w-full flex-row justify-between items-center px-4`,
            {topMargin},
          ]}
        >
          <TouchableOpacity
            style={[tw`rounded-xl p-1`, styles.background]}
            onPress={() => navigation.goBack()}
          >
            <ChevronLeftIcon color="white" strokeWidth={2.5} size="28" />
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`rounded-xl p-1`}
            onPress={() => toggleFavorite(!isFav)}
          >
            <HeartIcon
              color={isFav ? theme.background : "white"}
              size="35"
              style={{alignSelf: "flex-end"}}
            />
          </TouchableOpacity>
        </SafeAreaView>

        {loading ? (
          <Loading />
        ) : (
          <View>
            <Image
              // source={require("../assets/images/moviePoster2.png")}
              source={{
                uri: image500(movie?.poster_path) || fallbackMoviePoster,
              }}
              style={{width, height: height * 0.58}}
            />
            <LinearGradient
              colors={["transparent", "rgba(23,23,23,1)"]}
              style={[tw`absolute bottom-0`, {width, height: height * 0.4}]}
              start={{x: 0.5, y: 0}}
              end={{x: 0.5, y: 1}}
            />
          </View>
        )}
      </View>
      {/* MOVIE DETAILS -------------------------------------------------------*/}
      <View style={[tw`my-3`, {marginTop: -(height * 0.09)}]}>
        <Text
          style={tw`text-white text-center text-3xl font-bold tracking-wider`}
        >
          {movie?.title}
        </Text>
        {/* status, release year, runtime -------------------------------------*/}
        {movie?.id ? (
          <Text className="text-neutral-400 font-semibold text-base text-center">
            {movie?.status} • {movie?.release_date?.split("-")[0] || "N/A"}•
            {movie?.runtime} min
          </Text>
        ) : null}

        {/* GENRES------------------------------------------------------------- */}
        <View style={tw`flex-row justify-center mx-4 mb-3`}>
          {movie?.genres?.map((genre, index) => {
            let showDot = index + 1 !== movie.genres.length;
            return (
              <Text
                key={index}
                style={tw`text-neutral-400 font-semibold text-base text-center`}
              >
                {genre.name}
                {showDot ? "•" : null}
              </Text>
            );
          })}
        </View>

        {/* DESCRIPTION-------------------------------------------------------- */}
        <Text style={tw`text-neutral-400 mx-4 text-base  tracking-wide`}>
          {movie?.overview}
        </Text>
      </View>

      {/* CAST MEMBERS---------------------------------------------------------- */}
      {cast.length > 0 && <Cast navigation={navigation} cast={cast} />}

      {/* SIMILAR MOVIES --------------------------------------------------------*/}
      {similarMovies.length > 0 && (
        <MovieList
          title={"Similar Movies"}
          hideSeeAll={true}
          data={similarMovies}
        />
      )}
    </ScrollView>
  );
};

export default MovieScr;
