import React from "react";
import {Alert, Text, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

//style
import style from "./style";

//url
import {url} from "../../../../config/url.json";

//crypt
import {sha256} from "../../../../templates/crypty/sha256";

//components
import Buttom from "../../../../templates/components/basics/button/component";
import Input from "../input/component";
import { executarCarregando } from "../../../../templates/components/basics/carregamento/component";

const CriarSenha = function({carregando, navigation}){

    const [senha, setSenha] = React.useState("");
    const [confirmarSenha, setConfirmarSenha] = React.useState("");

    const criar_senha = async function(){
        if(!(senha == confirmarSenha)){
            return Alert.alert("As senhas não coincidem, favor revisar");
        }
        
        let cpf_funcionario = JSON.parse(await AsyncStorage.getItem("user"))["cpf"];

        let body = {
            cpf: cpf_funcionario,
            password: sha256(senha)
        }

        let settings = {
            method: "POST",
            header: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        }
        
        let act = {
            "200": function(){
                Alert.alert("Senha criada com sucesso");
                navigation.navigate("TabP");
            },
            "400": function(){
                Alert.alert("Algo deu errado tente novamente");
            }
        }

        try {
            let f = await fetch(`${url}/funcionario/register/password`, settings);
            act[f["status"]]();
        } catch (error) {
            Alert.alert("Algo deu errado tente novamente");
        }

    }

    return (
        <View
            style={style["container"]}
        >
            <Text
                style={style["text"]}
            >
                Criar senha
            </Text>
            <Input
                password={true}
                label={"Senha"}
                placeholder={"Senha..."}
                value={[setSenha, senha]}
                IStyle={{marginBottom: 20}}
            />
            <Input
                password={true}
                label={"Confirmar Senha"}
                placeholder={"Confirmar Senha..."}
                value={[setConfirmarSenha, confirmarSenha]}
            />
            <Buttom
                title={"Criar senha"}
                BTNStyle={{
                    width: "100%",
                    marginTop: 30
                }}
                action={executarCarregando.bind(this, criar_senha, carregando)}
            />
        </View>
    );
}

export default CriarSenha;