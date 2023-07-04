import React from "react";
import {View, Text, TextInput} from "react-native";

//style
import style from "./style";

const Input = function({label, value, setValue}){
    return(
        <View
            style={style["container"]}
        >
            <Text
                style={style["label"]}
            >
                {label}
            </Text>
            <TextInput
                style={style["input"]}
                value={value}
                onChangeText={function(text){
                    setValue(text);
                }}
            />
        </View>
    )
}

export default Input;