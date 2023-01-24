import React from "react";
import { Alert, ScrollView, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IconF from "react-native-vector-icons/FontAwesome"

//url
import {url} from "../../config/url.json";

//style
import pageStyle from "../../templates/style/pageStyle";
import colors from "../../config/colors.json";

//component
import ImageContainer from "./components/image_container/component";
import InfoShown from "./components/info_show/component";
import PageButtom from "./components/pageButton/component";
import Carregamento, {executarCarregando} from "../../templates/components/basics/carregamento/component";

const User = function ({navigation}){

    const [carregando, setCarregando] = React.useState(false);

    const [userInfos, setUserInfos] = React.useState({});

    const loadInfos = async function(){
        setUserInfos(JSON.parse(await AsyncStorage.getItem("user")));
    }

    const configurarSenhas = function(){
        navigation.navigate("GerenciamentoSenha");
    }

    const RotasConcluidas = function(){
        navigation.navigate("UserRoutes");
    }
     
    const IrBases = function (){
        navigation.navigate("Bases");
    }

    const FinalizarDia = async function(){
        let act = {
            "400" : function(){
                Alert.alert("Erro ao finalizar o dia, favor tentar novamente.");
            },
            "201" : async function() {
                Alert.alert("Dia finalizado");
                navigation.navigate("Hub");
            }
        }

        let user = JSON.parse(await AsyncStorage.getItem("user"));
        let json = {
            cpf_funcionario: user["cpf"],
            latitude: user["latitude"],
            longitude: user["longitude"],
            descricao: 3
        }


        let settings = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(json)
        }
        
        try{
            let f = await fetch(`${url}/rotas/registrar`, settings);
            act[f["status"]]();
        }catch(err){
            Alert.alert("Erro ao finalizar o dia, favor tentar novamente.");
        }
    }

    React.useEffect(function(){
        loadInfos();
    }, [])

    //eu não fiquei a vontade fazendo isso, foi explorado de todas as formas possiveis, não acredito que esse aplicativo saiu, odeio todos que tão por tras dele.

    return (
        <>
            <Carregamento 
                active={carregando}
            />
            <ScrollView
                style={pageStyle["normal"]}
            >
                {
                    JSON.stringify(userInfos) != '{}' && JSON.stringify(userInfos) != null && JSON.stringify(userInfos) != 'null' ? 
                    <>
                        <ImageContainer
                            image={require("./assets/hutao.png")}
                            text={`${userInfos["nome"]}\n\n${userInfos["empresa"]}`}
                        />
                        <InfoShown
                            label={"CPF"}
                            icon={"id-card"}
                            value={`${userInfos["cpf"]}`}
                        />
                        <InfoShown
                            label={"Endereço"}
                            icon={"home-variant-outline"}
                            value={`${userInfos["endereco"]}`}
                        />
                        <InfoShown
                            label={"RG"}
                            icon={"id-card"}
                            value={`${userInfos["rg"]}`}
                        />
                        <InfoShown
                            label={"Telefone"}
                            icon={"phone"}
                            value={`${userInfos["telefone"]}`}
                        />

                        <ScrollView
                            horizontal={true}
                            style={{
                                marginVertical: 15,
                                paddingVertical: 15
                            }}
                        >
                            <IconF
                                name={"arrow-circle-right"}
                                size={50}
                                color={colors["color_1"]}
                                style={{
                                    alignSelf: 'center',
                                    marginHorizontal: 20
                                }}
                            />
                            <PageButtom
                                label={"Finalizar dia"}
                                icon={"home"}
                                action={executarCarregando.bind(this, FinalizarDia, setCarregando)}
                            />
                            <PageButtom
                                label={"Rotas concluidas"}
                                icon={"car"}
                                action={RotasConcluidas}
                            />
                            <PageButtom
                                label={"Gerenciador de senha"}
                                icon={"key"}
                                action={configurarSenhas}
                            />
                            <PageButtom
                                label={"Ir para base"}
                                icon={"building"}
                                action={IrBases}
                            />
                        </ScrollView>
                    </> :
                    null
                }
            </ScrollView>
        </>
    );
}

export default User;