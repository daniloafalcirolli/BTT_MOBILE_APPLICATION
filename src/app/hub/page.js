import React from "react";
import { Alert, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

//style
import pageStyle from "../../templates/style/pageStyle";
import style from "./style";

//url
import {url} from "../../config/url.json";

//component
import ActionButton from "./components/action_buttons/component";
import Carregamento, {executarCarregando} from "../../templates/components/basics/carregamento/component";

const Hub = function ({navigation}){

    const [carregando, setCarregando] = React.useState(false);

    const removerConta = async function (){
        await AsyncStorage.setItem("user", "");
        navigation.navigate("Login");
    }

    function pegarData(){
        let d = new Date();
        return `${d.getFullYear()}-${d.getMonth()+1 < 10 ? `0${d.getMonth()+1}` : d.getMonth()+1}-${d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()}`;
    }
    const verificarDiaIniciado = async function(){
        //verificar se o dia ja iniciou
        let act1 = {
            "404": async ()=> {
                //iniciar dia
                return await iniciarDia();
            },
            "400" : function() {
                return Alert.alert("Não foi possivel iniciar o dia, tente novamente.");
            },
            "302" : () => {
                Alert.alert("O dia ja foi iniciado, retornando a sessão do usuario.");
                return navigation.navigate("TabP");
            }
        }

        try{
            let user = JSON.parse(await AsyncStorage.getItem("user"));
            let json1 = {
                cpf_funcionario: user["cpf"],
                data: pegarData(),
            }
    
            let settings1 = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(json1)
            }
    
            let f1 = await fetch(`${url}/rotas/validate`, settings1);
            act1[f1["status"]]();
        }catch(err){
            Alert.alert("Não foi possivel iniciar o dia, tente novamente.")
        }
    }
    const iniciarDia = async function(){
        let act2 = {
            "400": ()=>{
                Alert.alert("Erro ai iniciar o dia tente novamente");
            },
            "201": ()=>{
                Alert.alert("Dia iniciado.");
                navigation.navigate("TabP");
            }
        }

        let user = JSON.parse(await AsyncStorage.getItem("user"));
        let json2 = {
            cpf_funcionario: user["cpf"],
            latitude: user["latitude"],
            longitude: user["longitude"],
            descricao: 2
        }

        let settings2 = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(json2)
        }

        try{
            let f2 = await fetch(`${url}/rotas/registrar`, settings2);
            act2[f2["status"]]();
        }catch(err){
            Alert.alert("Não foi possivel iniciar o dia, tente novamente.")
        }
    }

    const irRelatorio = function(){
        navigation.navigate("UserRoutes");
    }

    return (
        <>
            <Carregamento
                active={carregando}
            />
            <View
                style={[pageStyle["normal-spaced"], style["page"]]}
            >
                <View
                    style={style["container_buttons"]}
                >
                    <ActionButton
                        title={"Iniciar Dia"}
                        icon={"account-check"}
                        action={executarCarregando.bind(this, verificarDiaIniciado, setCarregando)}
                    />
                    <ActionButton 
                        title={"Relatorio do funcionario"}
                        icon={"account-cog"}
                        action={irRelatorio}
                    />
                    <ActionButton
                        title={"Sair"}
                        icon={"account-cancel"}
                        action={removerConta}
                    />
                </View>
            </View>
        </>
    );
}

export default Hub;