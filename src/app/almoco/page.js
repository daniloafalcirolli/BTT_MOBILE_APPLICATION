import React from "react";
import {View, Text, Alert} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

//components
import Button from "../../templates/components/basics/button/component";

//url
import {url} from "../../config/url.json";

//style
import style from "./style";

const Almoco = function({navigation, route}){
    
    const servico = route.params;

    const semAlmoco = function(){
        navigation.navigate("TabP");
    }

    const comAlmoco = async function(){
        const user = JSON.parse(await AsyncStorage.getItem("user"));
        let body = {
            cpf_funcionario: user["cpf"],
            latitude: servico["cliente"]["latitude"],
            longitude: servico["cliente"]["longitude"],
            descricao: 4
        }
        let act = {
            "201": function(){
                Alert.alert("Serviço finalizado com sucesso");
                navigation.navigate("TabP")
            },
            "400": function(){
                setActive(false);
                Alert.alert("Não foi possivel setar o almoço, tente novamente.");
            }
        }

        let settings2 = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
        let f = await fetch(`${url}/rotas/registrar`, settings2);
        act[f["status"]]();
    }

    return(
            <View
                style={style["container"]}
            >
                <View
                    style={style["page"]}
                >
                    <Text
                        style={style["title"]}
                    >
                        Sair agora para almoço?
                    </Text>
                    <Button
                        BTNStyle={{
                            width: "80%",
                            marginTop: 30
                        }}
                        title={"Sim"}
                        action={comAlmoco}
                    />
                    <Button
                        BTNStyle={{
                            width: "80%",
                            marginTop: 30
                        }}
                        title={"Não"}
                        action={semAlmoco}
                    />
                </View>
            </View>
    )
}

export default Almoco;