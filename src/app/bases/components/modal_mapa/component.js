import React from "react";
import {View, Alert} from "react-native";
import MapView, {Marker} from "react-native-maps"
import MapViewDirections from "react-native-maps-directions";
import { getPreciseDistance } from 'geolib';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Geolocation from '@react-native-community/geolocation';

//components
import BaseModal from "../../../../templates/components/modal/base/component";
import LabelModal from "../../../../templates/components/modal/nome_e_fechar/component";
import Button from "../../../../templates/components/basics/button/component";
import Carregamento, {executarCarregando} from "../../../../templates/components/basics/carregamento/component";

//url
import {url} from "../../../../config/url.json";

//key
import {googlekey} from "../../../../config/key.json";

//style
import pageStyle from "../../../../templates/style/pageStyle";

const ModalMapa = function({modalRequest, value, visible, nav}){

    const [carregando, setCarregando] = React.useState(false);
    
    const [cp, setCP] = React.useState(null);

    React.useEffect(function(){
        getCurrentLocation();
    }, [value])

    const getRaio = async function(){
        let f = await fetch(`${url}/meta/key/raio_distancia`);
        let r = await f.json();
        let n = Number(getPreciseDistance(cp,{
            latitude: Number(value["latitude"]),
            longitude: Number(value["longitude"])
        })/1000)
        if(n > Number(r["metaValue"])){
            return false;
        }else{
            return true;
        }
    }

    const getCurrentLocation = async function(){
        try{
            Geolocation.getCurrentPosition(
                position => {
                    setCP({
                        latitude: Number(position["coords"]["latitude"]),
                        longitude: Number(position["coords"]["longitude"])
                    });
                },
                error => {
                    setCP({
                        latitude: 0,
                        longitude: 0,
                    });
                    Alert.alert("Problemas ão adiquirir sua localização, saia do aplicativo e entre novamente.")
                },
                {
                    enableHighAccuracy: true,
                }
            )
        }catch(err){
            Alert.alert("Problemas ão adiquirir sua localização, saia do aplicativo e entre novamente.")
        }
    }

    const cheguei = async function(){
        await getCurrentLocation();
        if(await getRaio()){
            const act = {
                "400": function(){
                    Alert.alert("Não foi possivel salvar sua rota, tente novamente");
                },
                "202": function(){
                    Alert.alert("Rota salva retornando para a pagina de serviços");
                    navigation.navigate("Hub");
                }
            }

            const user = JSON.parse(await AsyncStorage.getItem("user"));
            let body = {
                cpf_funcionario: user["cpf"],
                latitude: value["latitude"],
                longitude: value["longitude"],
                descricao: 1
            }
            let settings = {
                method: "POST",
                header: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            }
            let f = await fetch(`${url}/rotas/registrar`, settings);
            act[f["status"]]();
        }else{
            Alert.alert("Não é possivel salvar a rota a essa distancia")
        }
    }

    return (
        <BaseModal
            visible={visible}
            modalRequest={modalRequest}
            content={
                <>
                    <Carregamento 
                        active={carregando}
                    />
                    <View
                        style={[pageStyle["normal"], {flex: 1}]}
                    >
                        <LabelModal
                            pageTitle={""}
                            action={modalRequest}
                        />
                        {
                            value && <>
                                <MapView
                                    style={{flex: 1, position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: -99}}
                                    initialRegion={{
                                        latitude: Number(value["latitude"]),
                                        longitude: Number(value["longitude"]),
                                        latitudeDelta: 0.9,
                                        longitudeDelta: 0.9,
                                    }}
                                    showsUserLocation={true}
                                >
                                    <Marker 
                                        coordinate={{
                                            latitude: Number(value["latitude"]),
                                            longitude: Number(value["longitude"]),
                                        }}
                                        title={"Seu destino"}
                                    />
                                    <Marker 
                                        coordinate={cp}
                                        title={"Você"}
                                    />
                                    <MapViewDirections
                                        mode={"DRIVING"}
                                        origin={cp}
                                        destination={{
                                            latitude: Number(value["latitude"]),
                                            longitude: Number(value["longitude"]),
                                        }}
                                        strokeWidth={6}
                                        strokeColor={"blue"}
                                        apikey={googlekey}
                                    />
                                </MapView>
                                <Button
                                    BTNStyle={{
                                        position: "absolute",
                                        top: 20,
                                        bottom: 0,
                                        width: "70%",
                                        height: 90,
                                        alignSelf: "center"
                                    }}
                                    title={"Cheguei!"}
                                    action={executarCarregando.bind(this, cheguei, setCarregando)}
                                />
                            </>
                        }
                    </View>        
                </>
            }
        />
    )
}

export default ModalMapa;