import React from 'react'
import { Alert, ScrollView, View, PermissionsAndroid } from 'react-native'
import { getPreciseDistance } from 'geolib';
import Geolocation from '@react-native-community/geolocation';

//url
import {url} from "../../config/url.json";

//style
import style from "./style";
import pageStyle from "../../templates/style/pageStyle"

//components
import Button from "./components/button/component";
import Line from "./components/lines/component";
import ModalMapa from "./components/modal_mapa/component";
import ModalCancel from "./components/modal_cancel/component";
import Carregamento, {executarCarregando} from "../../templates/components/basics/carregamento/component";

const Servico = function({navigation, route}) {

    const {id} = route.params;

    const [carregando, setCarregando] = React.useState(false);

    const [servico, setServico] = React.useState();
    const getServico = async function(){
        let f = await fetch(`${url}/servico/${id}`);
        let r = await f.json();
        setServico(r);
    }
    React.useEffect(function(){
        executarCarregando(getServico, setCarregando);
    }, [])

    const openModal = function(setItem, item) {
        setItem(!item);
    }

    const [modalMapa, setModalMapa] = React.useState(false);

    const [modalCancel, setModalCancel] = React.useState(false);
    const openModalCancel = async function(){
        openModal(setModalCancel, modalCancel);
    }

    const getCurrentLocation = async function(act){
        try{
            await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            Geolocation.getCurrentPosition(
                async position => {
                    try{
                        let f = await fetch(`${url}/meta/key/raio_distancia`);
                        let r = await f.json();
                        let n = Number(getPreciseDistance({
                            latitude: Number(position["coords"]["latitude"]),
                            longitude: Number(position["coords"]["longitude"])
                        },{
                            latitude: Number(servico["cliente"]["latitude"]),
                            longitude: Number(servico["cliente"]["longitude"])
                        })/1000)

                        if(n > Number(r["metaValue"])){
                            Alert.alert("Você não está perto o suficiente para finalizar o serviço.");
                        }else{
                            act();
                        }
                    }catch(err){
                        Alert.alert("Erro ao pegar a distancia, tente novamente")
                    }
                },
                error => {
                    Alert.alert("Problemas ão adiquirir sua localização, saia do aplicativo e entre novamente.")
                },
                {
                    enableHighAccuracy: true,
                }
            )
        }catch(err){
            console.err(err)
        }
    }

    const finalizar = async function(){
        navigation.navigate("FinalizarServico", {
            id_servico: id,
            id_provedor: servico["provedor"]['id'],
            service: servico
        });
    }
    
    const cancelWithoutLocal = async function(){
        let act = {
            "400" : function(){
                return Alert.alert("Não foi possivel cancelar, favor tentar novamente.");
            },
            "200": function(){
                Alert.alert("Serviço quebrado sem ida ao local.")
                return navigation.navigate("TabP");
            }
        }

        let body = {
            cod: "",
            obs: "",
            id: id,
            status: "quebra sem ir ao local"
        }

        let settings = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }

        try{
            let f = await fetch(`${url}/servico/encerrar`, settings);
            act[f["status"]]();
        }catch(err){
            Alert.alert("Erro ao tentar cancelar, tente novamente.")
        }
    }
    
    const nav = function(name, item = {}){
        navigation.navigate(name, item)
    }

    return (
        <>
            <Carregamento
                active={carregando}
            />
            <ScrollView
                style={pageStyle["normal"]}
            >
                {
                    servico && 
                    <>
                        <View
                        style={style["infos"]}
                        >
                            <ModalCancel
                                visible={modalCancel}
                                action={openModal.bind(this, setModalCancel, modalCancel)}
                                imagens={servico["provedor"]["imagens"]}
                                id={servico["id"]}
                                nav={nav}
                                item={servico}
                                servico={servico}
                            />
                            <ModalMapa
                                action={openModal.bind(this, setModalMapa, modalMapa)}
                                visible={modalMapa}
                                coordnates={{
                                    latitude: Number(servico["cliente"]["latitude"]),
                                    longitude: Number(servico["cliente"]["longitude"])
                                }}
                            />
                            <Line 
                                label={"Cliente"}
                                info={servico["cliente"]["nome"]}
                            />
                            <Line 
                                label={"Bairro"}
                                info={servico["cliente"]["bairro"]}
                            />
                            <Line 
                                label={"Endereço"}
                                info={servico["cliente"]["endereco"]}
                            />
                            <Line 
                                label={"Numero"}
                                info={servico["cliente"]["numero"]}
                            />
                            <Line 
                                label={"Complemento"}
                                info={servico["cliente"]["complemento"]}
                            />
                            <Line 
                                label={"Contrato"}
                                info={servico["cliente"]["contrato"]}
                            />
                            <Line 
                                label={"CPF / CNPJ"}
                                info={servico["cliente"]["cpf"] == null ? servico["cliente"]["cnpj"] : servico["cliente"]["cpf"]}
                            />
                            <Line 
                                label={"Protocolo"}
                                info={servico["protocolo"]}
                            />
                            <Line 
                                label={"Provedor"}
                                info={servico["provedor"]["name"]}
                            />
                            <Line 
                                label={"Tipo serviço"}
                                info={servico["servicoProvedor"]["servico"]}
                            />
                        </View>
                        <View
                            style={style["buttons"]}
                        >
                            <Button
                                title={"Ir para"}
                                action={openModal.bind(this, setModalMapa, modalMapa)}
                            />
                            <Button
                                title={"Cancelar"}
                                action={executarCarregando.bind(this, getCurrentLocation.bind(this, openModalCancel), setCarregando)}
                            />
                            <Button
                                title={"Finalizar"}
                                action={executarCarregando.bind(this, getCurrentLocation.bind(this, finalizar), setCarregando)}
                            />
                            <Button
                                title={"Cancelar sem ir ao local"}
                                action={executarCarregando.bind(this, cancelWithoutLocal, setCarregando)}
                            />
                        </View>
                    </>
                }
            </ScrollView>
        </>
    )
}

export default Servico;