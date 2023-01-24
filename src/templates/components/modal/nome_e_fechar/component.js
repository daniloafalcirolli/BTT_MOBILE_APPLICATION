import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

//style
import style from "./style";

const LabelModal = function({pageTitle, action}){
    return (
        <>
            <TouchableOpacity
                style={style.iconContainer}
                onPress={action}
            >
                <Icon 
                    name={"ios-close"}
                    style={style.icon}
                />
            </TouchableOpacity>
            <Text
                style={style.text}
            >
                {pageTitle}
            </Text>
        </>
    );
}

export default LabelModal;