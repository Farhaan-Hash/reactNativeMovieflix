import {View, Text, Dimensions} from "react-native";
import React from "react";
import tw from "twrnc";
import * as Progress from "react-native-progress";
import {theme} from "../theme";

var {width, height} = Dimensions.get("window");
const Loading = () => {
  return (
    <View
      style={[
        tw`absolute flex-row justify-center items-center`,
        {height, width},
      ]}
    >
      <Progress.CircleSnail
        animated={true}
        thickness={12}
        size={160}
        color={theme.background}
      />
    </View>
  );
};

export default Loading;
