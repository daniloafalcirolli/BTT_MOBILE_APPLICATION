import React from "react";
import {Alert, Text, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

//style
import style from "./style";

//crypt
import {sha256} from "../../../../templates/crypty/sha256";

//url
import {url} from "../../.././../config/url.json";

//components
import Button from "../../../../templates/components/basics/button/component";
import Input from "../input/component";
import {executarCarregando} from "../../../../templates/components/basics/carregamento/component";

const ResetarSenha = function({carregando, navigation}){

    const [senha, setSenha] = React.useState("");
    const [senhaAntiga, setSenhaAntiga] = React.useState("");
    const [confirmarSenha, setConfirmarSenha] = React.useState("");

    const resetarSenha = async function(){
        if(!(senha == confirmarSenha)){
            return Alert.alert("As senhas não são iguais");
        }

        let cpf_funcionario = JSON.parse(await AsyncStorage.getItem("user"))["cpf"];
        let body = {
            cpf:cpf_funcionario,
            new_password: sha256(senha),
            old_password: sha256(senhaAntiga)
        }

        let settings = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify(body)
        }

        let act = {
            "400": function(){
                Alert.alert("Algo deu errado tente novamente");
            },
            "404": function(){
                Alert.alert("Usuario não encontrado");
            },
            "406": function(){
                Alert.alert("Senha antiga incorreta");
            },
            "200": function(){
                Alert.alert("Senha alterada com sucesso");
                navigation.navigate("TabP")
            }
        }

        try {
            let f = await fetch(`${url}/funcionario/reset/password`, settings);
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
                Resetar senha
            </Text>
            <Input
                label={"Senha antiga"}
                placeholder={"Senha antiga..."}
                value={[setSenhaAntiga, senhaAntiga]}
                password={true}
                IStyle={{marginBottom: 20}}
            />
            <Input
                label={"Senha"}
                placeholder={"Senha..."}
                value={[setSenha, senha]}
                password={true}
                IStyle={{marginBottom: 20}}
            />
            <Input
                label={"Confirmar Senha"}
                placeholder={"Confirmar Senha..."}
                value={[setConfirmarSenha, confirmarSenha]}
                password={true}
            />
            <Button
                title={"Resetar senha"}
                BTNStyle={{
                    width: "100%",
                    marginTop: 30
                }}
                action={executarCarregando.bind(this, resetarSenha, carregando)}
            />
        </View>
    );
}

export default ResetarSenha;