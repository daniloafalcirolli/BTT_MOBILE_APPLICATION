import React from 'react';
import { Alert, View } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';

//key
import {googlekey} from "../../../../config/key.json";

//style
import pageStyle from '../../../../templates/style/pageStyle';
import style from "./style";

//component
import BaseModal from "../../../../templates/components/modal/base/component";
import LabelModal from "../../../../templates/components/modal/nome_e_fechar/component";

const ModalMapa = function({visible, coordnates, action}) {

    const [currentCoordinates, setCurrentCoordinates] = React.useState();

    const getCurrentLocation = async function(){
        try{
            Geolocation.getCurrentPosition(
                position => {
                    setCurrentCoordinates({
                        latitude: Number(position["coords"]["latitude"]),
                        longitude: Number(position["coords"]["longitude"])
                    });
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

    React.useEffect(function(){
        getCurrentLocation();
    }, []);

    return (
        <BaseModal
            visible={visible}
            action={action}
            modalRequest={action}
            content={
                <View
                    style={pageStyle["normal"]}
                >
                    <LabelModal 
                        pageTitle={""}
                        action={action}
                    />
                    <MapView
                        showsUserLocation={true}
                        style={style["map"]}
                        initialRegion={{
                            latitude: -15.014511,
                            longitude: -47.197961,
                            latitudeDelta: 16,
                            longitudeDelta: 16
                        }}
                    >
                        <Marker 
                            coordinate={coordnates}
                            title={"Lugar atual"}
                        />
                        {(coordnates && currentCoordinates) && <>
                            <MapViewDirections
                                mode={"DRIVING"}
                                origin={currentCoordinates}
                                destination={coordnates}
                                strokeWidth={5}
                                strokeColor={"blue"}
                                apikey={googlekey}
                            />
                            <Marker 
                                coordinate={currentCoordinates}
                                title={"Ponto de ida"}
                            />
                        </>}
                    </MapView>
                </View>
            }
        />
    )
}

export default ModalMapa;