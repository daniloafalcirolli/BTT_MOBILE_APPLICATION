import React from 'react';
import {Text, View } from 'react-native';

//style
import style from "./style";

const ShowCliente = function({value}) {
    return (
        <View
            style={style["container"]}
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
                    {
                    (value["cpf"] != null ? `CPF: ${value["cpf"]}` : null)
                    ||
                    (value["cnpj"] != null ? `CNPJ: ${value["cnpj"]}` : null)
                    }
                </Text>
                <Text
                    style={style["texts"]}
                >
                    Contrato: {value["contrato"]}
                </Text>
            </View>
        </View>
    )
}

export default ShowCliente;