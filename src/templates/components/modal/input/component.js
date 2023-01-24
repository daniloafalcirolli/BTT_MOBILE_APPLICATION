import React from "react";
import {TextInput, View} from "react-native";

//style
import style from "./style";

const InputModal = function({value}){
    return (
        <View
            style={style["component"]}
        >
            <TextInput 
                style={style["input"]}
                value={value[1]}
                onChangeText={function(e){
                    value[0](e)
                }}
            />
        </View>
    );
}

export default InputModal;