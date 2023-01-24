import React from "react";
import { View, TextInput } from "react-native";

//style
import colors from "../../../../config/colors.json";
import style from "./style";

const SearchInput = function ({value}){
    return (
        <View
            style={style["component"]}
        >
            <TextInput 
                style={style["input"]}
                onChangeText={function(e){
                    value[0](e)
                }}
                placeholder={"Pesquisa..."}
                placeholderTextColor={colors["color_2"]}
                value={value[1]}
            />
        </View>
    );
}

export default SearchInput;