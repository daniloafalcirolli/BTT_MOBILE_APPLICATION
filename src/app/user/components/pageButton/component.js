import React from "react";
import { TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

//style
import style from "./style";

const PageButton = function({label, icon, action, CStyle}){
    return(
        <TouchableOpacity
            style={[style["container"], CStyle]}
            onPress={action}
        >
            <Icon 
                name={icon}
                style={style["icon"]}
            />
            <Text
                style={style["text"]}
            >
                {label}
            </Text>
        </TouchableOpacity>
    )
}

export default PageButton;