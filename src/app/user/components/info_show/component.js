import React from "react";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

//style
import style from "./style";

const InfoShown = function ({label, icon, value}){
    return (
        <View
            style={style["component"]}
        >
            <View
                style={style["topView"]}
            >
                <Icon 
                    name={icon}
                    size={30}
                    style={style["icon"]}
                />
                <Text
                    style={style["label"]}
                >
                    {label}
                </Text>
            </View>
            <Text
                style={style["info"]}
            >
                {value}
            </Text>
        </View>
    );
}

export default InfoShown;