import React from "react";
import { View, Text, TextInput } from "react-native";

//style
import style from "./style.js"
import colors from "../../../../config/colors.json"

const Input = function ({label, placeholder, value, password = false}){
    return (
        <View
            style={style["view"]}
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
                onChangeText={function(e){
                    value[0](e)
                }}
                value={value[1]}
                autoCapitalize={"none"}
                autoCorrect={false}
                secureTextEntry={password}
            />
        </View>
    );
}

export default Input;