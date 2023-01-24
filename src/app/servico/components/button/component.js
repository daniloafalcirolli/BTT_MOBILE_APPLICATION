import React from "react";
import { TouchableOpacity, Text } from "react-native";

//style
import style from "./style";

const Button = function ({title, action, outStyle = {}, active}){
    return (
        <TouchableOpacity
            style={[style["view"], outStyle]}
            onPress={action}
            disabled={active}
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