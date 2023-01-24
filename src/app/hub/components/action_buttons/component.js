import React from "react";
import { TouchableOpacity, Text } from "react-native";

//icon
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

//style
import style from "./style"

const ActionButton = function ({title, action, icon}){
    return (
        <TouchableOpacity
            style={style["component"]}
            onPress={action}
        >
            <Icon 
                name={icon}
                size={70}
                style={style["icon"]}
            />
            <Text
                style={style["text"]}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
}

export default ActionButton;