import React from "react";
import {View} from "react-native";
import MapView, {Marker} from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import AsyncStorage from "@react-native-async-storage/async-storage";

//key
import {googlekey} from "../../../../config/key.json";

//style
import style from "./style";

//components
import ShowItem from "../show_infos/component";

const Map = function({info, ajuste}){

    const [firstCoord, setFirstCoord] = React.useState(null);
    const [lastCoord, setLastCoord] = React.useState(null);
    const [middleCoords, setMiddleCoords] = React.useState(null);

    const [laterInfos, setLaterInfos] = React.useState(null);

    React.useEffect(function(){
        setLaterInfos(null)
        if(info.length >= 1){
            setFirstCoord({
                latitude: Number(info[0]["latitude"]),
                longitude: Number(info[0]["longitude"])
            });
        }else{
            setFirstCoord(null);
        }
        if(info.length >= 2){
            setLastCoord({
                latitude: Number(info[info.length -1]["latitude"]),
                longitude: Number(info[info.length -1]["longitude"])
            });
        }else{
            setLastCoord(null);
        }
        if(info.length >= 3){
            let array = [];
            for(let i = 1; i < info.length-1; i++){
                array.push({
                    latitude: Number(info[i]["latitude"]),
                    longitude: Number(info[i]["longitude"])
                })
            }
            setMiddleCoords(array);
        }else{
            setMiddleCoords(null);
        }
    }, [info])

    return(
        <>
            <View
                style={style["container"]}
            >
                <MapView
                    style={style["map"]}
                    initialRegion={firstCoord && {
                        latitude: firstCoord["latitude"],
                        longitude: firstCoord["longitude"],
                        latitudeDelta: 0.4,
                        longitudeDelta: 0.4
                    }}
                >
                    {
                            info && info.map(function(e, index){
                                return (
                                    <Marker
                                        key={index}
                                        title={`Ponto ${index+1}`}
                                        coordinate={{
                                            latitude: Number(e["latitude"]),
                                            longitude: Number(e["longitude"])
                                        }}
                                    />
                                );
                            })
                    }
                    {
                        <MapViewDirections
                            origin={firstCoord ? firstCoord: {}}
                            destination={lastCoord ? lastCoord : {}}
                            waypoints={middleCoords ? middleCoords : []}
                            apikey={googlekey}
                            mode={"DRIVING"}
                            strokeWidth={6}
                            strokeColor={"blue"}
                            onReady={async function(result){
                                let func = JSON.parse(await AsyncStorage.getItem("user"));

                                //distancia
                                let kml = func["consumo"];
                                let distance = result.distance;
                                let fDistance = distance / kml;

                                //valor a ser pago
                                let valor_pago = `${(fDistance * Number(func["preco_gasolina"])).toFixed(2)}`

                                let json = {
                                    distancia: result.distance.toFixed(3),
                                    kml: fDistance.toFixed(3),
                                    valor_pago: valor_pago
                                }
                                setLaterInfos(json);
                            }}
                        />
                    }
                </MapView>
            </View>
            {
                laterInfos && <>
                    <ShowItem
                        title={"Gasolina Gasta"}
                        content={`${laterInfos["kml"]} L`}
                    />
                    <ShowItem
                        title={"Distancia percorrida"}  
                        content={`${laterInfos["distancia"]} Km`}
                    />
                    <ShowItem
                        title={"Valor total"}
                        content={`R$ ${laterInfos["valor_pago"]}`}
                    />
                    <ShowItem
                        title={"Porcentagem de valor adicional"}
                        content={`${ajuste}%`}
                    />
                    <ShowItem
                        title={"Valor em dinheiro recebido a mais"}
                        content={`R$ ${((laterInfos["valor_pago"]*10)/100).toFixed(2)}`}
                    />
                    <ShowItem
                        title={"Valor total a ser pago"}
                        content={`R$ ${(((laterInfos["valor_pago"] * ajuste)/100)+Number(laterInfos["valor_pago"])).toFixed(2)}`}
                        CStyle={{marginBottom: 20}}
                    />
                </>
            }
        </>
    );
}

export default Map;