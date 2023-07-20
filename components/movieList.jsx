import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from "react-native";
import React from "react";
import tw from "twrnc";
import {styles} from "../theme";
import {useNavigation} from "@react-navigation/native";
import {fallbackMoviePoster, image185} from "../api/movidb";

var {width, height} = Dimensions.get("window");

const MovieList = ({title, data, hideSeeAll}) => {
  const navigation = useNavigation();
  // let movieName = "Antman and the Wasp: Quantumania";
  return (
    <View style={tw`mb-8`}>
      <View style={tw`mx-4 flex-row justify-between items-center`}>
        <Text style={tw`text-white text-xl`}>{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={[tw`text-lg`, styles.text]}>See All</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 15}}
      >
        {/* MOVIE ROW--------------------------------------- */}
        {data.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.push("Movie", item)}
            >
              <View style={tw`mr-4 mt-4`}>
                <Image
                  // source={require("../assets/images/moviePoster2.png")}
                  source={{
                    uri: image185(item.poster_path) || fallbackMoviePoster,
                  }}
                  style={[
                    tw`rounded-3xl`,
                    {width: width * 0.33, height: height * 0.22},
                  ]}
                />

                <Text style={tw`text-neutral-300 ml-1`}>
                  {item.title && item.title.length > 14
                    ? item.title.slice(0, 14) + "..."
                    : item.title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MovieList;
