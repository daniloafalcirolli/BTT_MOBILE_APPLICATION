import React from "react";
import {View, Text, TextInput} from "react-native";

import style from "./style";

const Input = function({text, value, nol = 1, ml = false}){
    return(
        <View
            style={style["container"]}
        >
            <Text
                style={style["text"]}
            >
                {text}
            </Text>
            <TextInput
                numberOfLines={nol}
                multiline={ml}
                disableFullscreenUI={true}
                style={style["input"]}
                value={value[1]}
                onChangeText={function(e){
                    value[0](e);
                }}
            />
        </View>
    );
}

export default Input;