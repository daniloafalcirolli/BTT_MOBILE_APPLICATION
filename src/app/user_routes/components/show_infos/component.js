import React from "react";
import {View, Text} from "react-native";

//style
import style from "./style";

const ShowItem = function({title, content, CStyle}){
    return(
        <View
            style={[style["container"], CStyle]}
        >
            <Text
                style={style["title"]}
            >
                {title}
            </Text>
            <Text
                style={style["content"]}
            >
                {content}
            </Text>
        </View>
    );
}

export default ShowItem;