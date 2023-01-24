import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";

//style
import style from "./style";

const ShowItem = function({actionCamera, actionImage, actionRemove, label, hasContent = false}) {
    return (
        <View
            style={style["container"]}
        >
            <Text
                style={style["label"]}
            >
                {label}
            </Text>
            <View
                style={style["iconView"]}
            >
                <TouchableOpacity
                    onPress={actionCamera}
                >
                    <Icon
                        name={"camera"}
                        style={style["icon"]}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={actionImage}
                >
                    <Icon
                        name={"image"}
                        style={[style["icon"], hasContent ? style["active"] : null]}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={actionRemove}
                >
                    <Icon
                        name={"window-close"}
                        style={style["icon"]}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ShowItem;