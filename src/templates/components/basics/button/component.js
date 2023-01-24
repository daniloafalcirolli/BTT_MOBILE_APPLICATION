import React from "react";
import { TouchableOpacity, Text } from "react-native";

//style
import style from "./style";

const Button = function ({title, action, BTNStyle, BTNTextStyle}){
    return (
        <TouchableOpacity
            style={[style["view"], BTNStyle]}
            onPress={action}
        >
            <Text
                style={[style["text"], BTNTextStyle]}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
}

export default Button;