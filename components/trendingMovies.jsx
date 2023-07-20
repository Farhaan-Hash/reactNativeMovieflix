import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import tw from "twrnc";
import Carousel from "react-native-snap-carousel";
// import {ViewPropTypes} from "deprecated-react-native-prop-types";
import {useNavigation} from "@react-navigation/native";
import {image500} from "../api/movidb";

var {width, height} = Dimensions.get("window");
const TrendingMovies = ({data}) => {
  const navigation = useNavigation();

  const handleClick = (item) => {
    navigation.navigate("Movie", item);
  };

  return (
    <View style={tw`mb-8`}>
      <Text style={tw`text-white text-xl mx-4 mb-5 mt-3`}>Trending</Text>
      <Carousel
        data={data}
        renderItem={({item}) => (
          <MovieCard item={item} handleClick={handleClick} />
        )}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{display: "flex", alignItems: "center"}}
      />
    </View>
  );
};

export default TrendingMovies;

const MovieCard = ({item, handleClick}) => {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Image
        source={{uri: image500(item.poster_path)}}
        style={[tw`rounded-3xl`, {width: width * 0.6, height: height * 0.4}]}
      />
    </TouchableWithoutFeedback>
  );
};
