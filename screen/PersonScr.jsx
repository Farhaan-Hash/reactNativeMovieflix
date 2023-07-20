import {
  View,
  Text,
  Platform,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, {useEffect, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {ChevronLeftIcon} from "react-native-heroicons/outline";
import {HeartIcon} from "react-native-heroicons/solid";
import {useNavigation, useRoute} from "@react-navigation/native";
import {styles, theme} from "../theme";
import tw from "twrnc";
import MovieList from "../components/movieList";
import Loading from "../components/loading";
import {
  fallbackPersonImage,
  fetchPersonDetails,
  fetchPersonMovies,
  image342,
} from "../api/movidb";

const ios = Platform.OS == "ios";
const verticalMargin = ios ? "" : " my-3";
var {width, height} = Dimensions.get("window");

const PersonScr = () => {
  const {params: item} = useRoute();
  const navigation = useNavigation();
  const [isFav, toggleFavorite] = useState(false);
  const [person, setPerson] = useState({});
  const [personMovies, setPersonMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get Selected Person data -----------------------------------
  useEffect(() => {
    setLoading(true);
    getPersonDetails(item.id);
    getPersonMovies(item.id);
  }, [item]);

  const getPersonDetails = async (id) => {
    const data = await fetchPersonDetails(id);
    if (data) setPerson(data);
    // console.log("got person details",data);

    setLoading(false);
  };
  const getPersonMovies = async (id) => {
    const data = await fetchPersonMovies(id);
    // console.log("got person movies");
    if (data && data.cast) {
      setPersonMovies(data.cast);
    }
  };
  return (
    <ScrollView
      style={tw`flex-1 bg-neutral-900`}
      contentContainerStyle={{paddingBottom: 20}}
    >
      {/* BACK BUtton---------------------- */}
      <SafeAreaView
        style={[
          tw` z-20 w-full flex-row justify-between items-center px-4`,
          {verticalMargin},
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

      {/* PERSON DETAILS---------------------------------------------- */}
      {loading ? (
        <Loading />
      ) : (
        <View>
          <View
            style={[
              tw`flex-row justify-center`,
              {
                shadowColor: "gray",
                shadowRadius: 40,
                shadowOffset: {width: 0, height: 5},
                shadowOpacity: 1,
              },
            ]}
          >
            <View
              style={tw` overflow-hidden rounded-full h-72 w-72 items-center border-2 border-neutral-500 `}
            >
              <Image
                source={{
                  uri: image342(person?.profile_path) || fallbackPersonImage,
                }}
                style={{height: height * 0.43, width: width * 0.74}}
              />
            </View>
          </View>
          <View style={tw`mt-6`}>
            <Text style={tw`text-3xl text-white font-bold text-center`}>
              {person?.name}
            </Text>
            <Text style={tw`text-base text-neutral-500 text-center`}>
              {person?.place_of_birth}
            </Text>
          </View>
          {/* ACTOR INFO */}
          <View
            style={tw`mx-0 pr-3 p-3  mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full`}
          >
            <View style={tw`border-r-2 border-r-neutral-400 px-2 items-center`}>
              <Text style={tw`text-white font-semibold text-base`}>
                Gender:
              </Text>
              <Text style={tw`text-neutral-300 text-sm`}>
                {person?.gender == 1 ? "Female" : "Male"}
              </Text>
            </View>
            <View style={tw`border-r-2 border-r-neutral-400 px-2 items-center`}>
              <Text style={tw`text-white font-semibold text-base`}>
                Birthday:
              </Text>
              <Text style={tw`text-neutral-300 text-sm`}>
                {" "}
                {person?.birthday}
              </Text>
            </View>
            <View style={tw`border-r-2 border-r-neutral-400 px-2 items-center`}>
              <Text style={tw`text-white font-semibold text-base`}>
                Known For
              </Text>
              <Text style={tw`text-neutral-300 text-sm`}>
                {person?.known_for_department}
              </Text>
            </View>
            <View style={tw`px-2 items-center`}>
              <Text style={tw`text-white font-semibold text-base`}>
                Popular
              </Text>
              <Text style={tw`text-neutral-300 text-sm`}>
                {person?.popularity?.toFixed(2)} %
              </Text>
            </View>
          </View>

          {/* BIOGRAPHY */}
          <View style={tw`my-6 mx-4`}>
            <Text style={tw`text-white text-lg`}>Biography</Text>
            <Text style={tw`text-neutral-400 text-base tracking-wide`}>
              {person?.biography || "N/A"}
            </Text>
          </View>

          {/* MOVIES LIST FOR THIS PERSON */}
          {personMovies && Array.isArray(personMovies) && (
            <MovieList title={"Movies"} hideSeeAll={true} data={personMovies} />
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default PersonScr;
