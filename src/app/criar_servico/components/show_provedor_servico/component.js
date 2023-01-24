import React from 'react';
import {Text, View } from 'react-native';

//style
import style from "./style";

const ShowCliente = function({provedor, servico}) {
    return (
        <View
            style={style["container"]}
        >
            <Text
                style={style["principalText"]}
            >
                {provedor}
            </Text>
            <View
                style={style["otherTexts"]}
            >
                <Text
                    style={style["texts"]}
                >
                    {servico}
                </Text>
            </View>
        </View>
    )
}

export default ShowCliente;