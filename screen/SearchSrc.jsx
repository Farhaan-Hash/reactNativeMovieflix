import {
  View,
  Text,
  Platform,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import React, {useCallback, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import tw from "twrnc";
import {XMarkIcon} from "react-native-heroicons/outline";
import {useNavigation} from "@react-navigation/native";
import Loading from "../components/loading";
import {fallbackMoviePoster, fetchSearchMovies, image185} from "../api/movidb";
import {debounce} from "lodash";

const ios = Platform.OS == "ios";
const topMargin = ios ? "" : " mt-5";
var {width, height} = Dimensions.get("window");
const SearchSrc = () => {
  const navigation = useNavigation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // let movieName = "Ant-man and the Wasp: Quantumania";
  const handleSearch = (searchQuery) => {
    if (searchQuery && searchQuery.length > 2) {
      setLoading(true);
      fetchSearchMovies({
        query: searchQuery,
        include_adult: "false",
        language: "en-US",
        page: "1",
      }).then((data) => {
        setLoading(false);
        if (data && data?.results) {
          setResults(data.results);
        }
        // console.log("search results", data);
      });
    } else {
      setLoading(false);
      setResults([]);
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []); //from lodash library

  return (
    <SafeAreaView style={[tw` bg-neutral-800 flex-1`, {topMargin}]}>
      <View
        style={tw` mx-4 mb-3 mt-6 flex-row justify-between items-center border border-neutral-500 rounded-full`}
      >
        <TextInput
          style={tw`pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wide`}
          onChangeText={handleTextDebounce}
          placeholderTextColor={"lightgray"}
          placeholder="Search Movie"
        />
        <TouchableOpacity
          style={tw`rounded-full p-3 m-1 bg-neutral-500`}
          onPress={() => navigation.navigate("Home")}
        >
          <XMarkIcon size="25" color="white" />
        </TouchableOpacity>
      </View>
      {/* RESULTS---------------------------------------------- */}

      {loading ? (
        <Loading />
      ) : results.length ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 15}}
        >
          <Text style={tw`text-white font-semibold mb-3 ml-1`}>
            Results ({results.length})
          </Text>
          <View style={tw`flex-row justify-between flex-wrap`}>
            {results?.map((item, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => navigation.push("Movie", item)}
              >
                <View style={tw`mb-4`}>
                  <Image
                    style={[
                      tw`rounded-3xl`,
                      {width: width * 0.44, height: height * 0.3},
                    ]}
                    source={{
                      uri: image185(item?.poster_path) || fallbackMoviePoster,
                    }}
                  />
                  <Text style={tw` text-neutral-300 ml-1`}>
                    {item?.title && item.title.length > 20
                      ? item.title.slice(0, 20) + "..."
                      : item.title}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View style={tw`flex-row justify-center`}>
          <Image
            source={require("../assets/images/movieTime.png")}
            style={tw`h-96 w-96`}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchSrc;
