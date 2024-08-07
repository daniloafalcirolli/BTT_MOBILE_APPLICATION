import React from "react";
import { TouchableOpacity, Text } from "react-native";

//style
import style from "./style";

const Item = function({label, action}){
    return(
        <TouchableOpacity
            style={style["container"]}
            onPress={action}
        >
            <Text
                style={style["label"]}
            >
                {label}
            </Text>
        </TouchableOpacity>
    )
}

export default Item;