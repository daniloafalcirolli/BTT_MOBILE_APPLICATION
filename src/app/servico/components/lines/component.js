import React from "react";
import {Text, View} from "react-native";

//style
import style from "./style";

const Line = function({info, label}){
    return(
        <View
            style={style["component"]}
        >
            <Text
                style={style["label"]}
            >
                {label}
            </Text>
            <Text
                style={style["text"]}
            >
                {info}
            </Text>
        </View>
    );
}

export default Line;