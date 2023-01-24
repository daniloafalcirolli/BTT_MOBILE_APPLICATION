import React from "react";
import { View, Text, TextInput } from "react-native";

//style
import style from "./style.js"
import colors from "../../../../config/colors.json"

const Input = function ({label, placeholder, value, IStyle, password = false}){
    return (
        <View
            style={[style["view"], IStyle]}
        >
            <Text
                style={style["label"]}
            >
                {label}
            </Text>
            <TextInput
                
                placeholderTextColor={colors["background_color_2"]}
                style={style["input"]}
                placeholder={placeholder}
                autoCapitalize={"none"}
                secureTextEntry={password}
                onChangeText={function(e){
                    value[0](e)
                }}
                value={value[1]}
            />
        </View>
    );
}

export default Input;