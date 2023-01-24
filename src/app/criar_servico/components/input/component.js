import React from "react";
import {TextInput, View, Text} from "react-native";

//style
import style from "./style";

const Input = function({value, label}){
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
                value={value[1]}
                onChangeText={function(e){
                    value[0](e);
                }}
            />
        </View>
    );
}

export default Input;