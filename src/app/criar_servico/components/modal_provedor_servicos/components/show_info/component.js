import React from "react";
import { TouchableOpacity, Text } from "react-native";

//style
import style from "./style";

const ShowInfo = function({text, action}){
    return(
        <TouchableOpacity
            style={style["container"]}
            onPress={action}
        >
            <Text
                style={style["text"]}
            >
                {text}
            </Text>
        </TouchableOpacity>
    );
}

export default ShowInfo;