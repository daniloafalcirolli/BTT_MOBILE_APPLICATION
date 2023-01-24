import React from "react";
import {View, Text, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

//style
import style from "./style";

const CheckBox = function({label, action, check}){

    const invert = function(){
        check[0](!check[1]);
    }

    return(
        <View
            style={style["container"]}
        >
            <TouchableOpacity
                style={style["containerIcon"]}
                onPress={invert}
            >
                {
                    <Icon
                        style={[style["icon"], {opacity: check[1] ? 1 : 0}]}
                        name={"check"}
                    />
                }
            </TouchableOpacity>
            <Text
                style={style["label"]}
            >
                {label}
            </Text>
        </View>
    )
}

export default CheckBox;