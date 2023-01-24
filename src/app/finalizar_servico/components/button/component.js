import React from "react";
import {TouchableOpacity, Text} from "react-native";

//style
import style from "./style";

const Button = function({action, label, active}){
    return(
        <TouchableOpacity
            style={style["container"]}
            onPress={action}
            disabled={active}
        >
            <Text
                style={style["text"]}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
}

export default Button;