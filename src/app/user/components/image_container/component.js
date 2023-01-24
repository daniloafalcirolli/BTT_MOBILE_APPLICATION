import React from "react";
import { Image, View, Text } from "react-native";

//style
import style from "./style"

const ImageContainer = function ({image, text}){
    return (
        <View
            style={style["imageContainer"]}
        >
            <Image
                source={image}
                style={style["imageBack"]}
                blurRadius={10}
            />
            <View 
                style={style["imageBlur"]}
            />
            <Image
                source={image}
                style={style["image"]}
            />
            <Text
                style={style["text"]}
            >
                {text}
            </Text>
        </View>
    )
}

export default ImageContainer;