import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";

//style
import style from "./style";

const ShowInfo = function({value, action}) {
    return (
        <TouchableOpacity
            style={style["container"]}
            onPress={action}
        >
            <Text
                style={style["principalText"]}
            >
                {value["nome"]}
            </Text>
            <View
                style={style["otherTexts"]}
            >
                <Text
                    style={style["texts"]}
                >
                    {value["endereco"]}
                </Text>
                <Text
                    style={style["texts"]}
                
                >
                    {(value["cpf"] != null ? `CPF: ${value["cpf"]}` : null) || (value["cnpj"] != null ? `CNPJ: ${value["cnpj"]}` : null)}
                </Text>
                <Text
                    style={style["texts"]}
                >
                    Contrato: {value["contrato"]}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default ShowInfo;