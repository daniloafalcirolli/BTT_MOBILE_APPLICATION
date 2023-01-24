import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

//style
import style from "./style";

const ShowItem = function ({client, adress, status, finalData, empresaServico, action}){
    return (
        <TouchableOpacity
            style={style["component"]}
            onPress={action}
        >
            <View
                style={style["line"]}
            >
                <Icon 
                    style={style["icon"]}
                    name={"house-user"}
                    size={30}
                />
                <Text
                    style={style["info"]}
                >
                    {client}
                </Text>
            </View>
            <View
                style={style["line"]}
            >
                <Icon 
                    style={style["icon"]}
                    name={"map-marker-alt"}
                    size={30}
                />
                <Text
                    style={style["info"]}
                >
                    {adress}
                </Text>
            </View>
            <View
                style={style["line"]}
            >
                <Icon 
                    style={style["icon"]}
                    name={"wrench"}
                    size={30}
                />
                <Text
                    style={style["info"]}
                >
                    {empresaServico}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

export default ShowItem;