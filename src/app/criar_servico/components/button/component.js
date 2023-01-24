import React from "react";
import { TouchableOpacity, Text } from "react-native";

//style
import style from "./style";

const Button = function({title, action, styleF}){
    return(
        <TouchableOpacity
            onPress={action}
            style={[style["container"], styleF]}
        >
            <Text
                style={style["text"]}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
}

export default Button;