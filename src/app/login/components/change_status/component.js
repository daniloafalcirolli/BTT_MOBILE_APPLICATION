import React from "react";
import {View, Text, TouchableOpacity, KeyboardAvoidingView} from "react-native";

//style
import style from "./style"

const ChangeStatus = function({type, setType}){


    const setCPF = function(){
        setType("CPF");
    }

    const setSenha = function(){
        setType("Senha");
    }

    return(
        <View
            style={style["container"]}
        >
            <TouchableOpacity
                style={[style["containerText"], style["left"], type == "CPF" ? style["active"] : null]}
                onPress={setSenha}
            >
                <Text
                    style={style["text"]}
                >
                    Senha
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[style["containerText"], style["right"], type == "Senha" ? style["active"] : null]}
                onPress={setCPF}
            >
                <Text
                    style={style["text"]}
                >
                    CPF
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default ChangeStatus;