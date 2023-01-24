import React from "react";
import { TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

//style
import style from "./style";

const BotaoAbrirModal = function({icon, label, action}){
    return(
        <TouchableOpacity
            style={style["container"]}
            onPress={action}
        >
            <Icon
                style={style["icon"]}
                name={icon}
                size={70}
            />
            <Text
                style={style["text"]}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
}

export default BotaoAbrirModal;