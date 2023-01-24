import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import {View, Dimensions} from "react-native";

//url
import {url} from "../../config/url.json";

//style
import pageStyle from "../../templates/style/pageStyle";

//components
import CriarSenha from "./components/criar_senha/component";
import ResetarSenha from "./components/resetar_senha/component";
import Carregamento from "../../templates/components/basics/carregamento/component";

const GerenciamentoSenha = function({navigation}){

    const [carregando, setCarregando] = React.useState(false);

    const [status, setStatus] = React.useState(true);

    const getStatus = async function() {
        let func = await AsyncStorage.getItem("user");
        let cpf = JSON.parse(func)["cpf"];
        let config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                cpf: cpf
            })
        };

        let act = {
            "404": function(){
                setStatus(false);
            },
            "200": function(){
                setStatus(true);
            },
        }

        let f = await fetch(`${url}/funcionario/validate/password`, config);
        act[f["status"]]();
    }

    React.useEffect(function(){
        getStatus();
    }, [])

    const windowHeight = Dimensions.get('window').height;

    return (
        <>
            <Carregamento
                active={carregando}
            />
            <View
                style={[
                    pageStyle["normal"],
                    {height: windowHeight, justifyContent: "center"}
                ]}
            >
                {
                    status ? <ResetarSenha carregando={setCarregando} navigation={navigation} /> : <CriarSenha carregando={setCarregando} navigation={navigation} />
                }
            </View>
        </>
    );
}

export default GerenciamentoSenha;