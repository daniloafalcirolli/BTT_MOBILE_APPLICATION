import React from "react";
import {View, ScrollView, Alert} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {launchCamera} from 'react-native-image-picker';

//style
import style from "./style";

//url
import {url} from "../../../../config/url.json";

//components
import BaseModal from "../../../../templates/components/modal/base/component";
import LabelModal from "../../../../templates/components/modal/nome_e_fechar/component";
import Input from "./components/input/component";
import Button from "../button/component";
import ShowItem from "./components/show_item/component";
import ShowImage from "./components/ShowImage/component";

const ModalCancel = function({visible, id, action, imagens, nav, item, servico}){
    const [btnAtivo, setBtnAtivo] = React.useState(false);
    const [codigo, setCodigo] = React.useState("");
    const [obs, setObs] = React.useState("");

    const confirmarAlmoco = async function(){
        let cpf_funcionario = JSON.parse(await AsyncStorage.getItem("user"))["cpf"];
        let body = {
            cpf_funcionario: cpf_funcionario
        }
        let settings = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
        let act = {
            "404":function(){
                nav("Almoco", servico);
            },
            "302": function(){
                Alert.alert("Você ja almoçou hoje.");
                nav("TabP");
            },
            "406": function(){
                Alert.alert("Algo deu errado, clique novamente em finalizar serviço para verificar se seu almoço ja foi computado");
            },
            "400": function(){
                Alert.alert("Algo deu errado, clique novamente em finalizar serviço para verificar se seu almoço ja foi computado");
            }
        }
        let f = await fetch(`${url}/rotas/funcionario/almoco`, settings);
        act[f["status"]]();
    }

    //Requests de finalizar o serviço
    const setarRotaFuncionario = async function(){
        const user = JSON.parse(await AsyncStorage.getItem("user"));
        let body2 = {
            cpf_funcionario: user["cpf"],
            latitude: item["cliente"]["latitude"],
            longitude: item["cliente"]["longitude"]
        }
        let act2 = {
            "201": function(){
                setCodigo("");
                setObs("");
                nav("TabP");
            },
            "400": function(){
                Alert.alert("Não foi possivel finalizar o serviço tente novamente");
            }
        }

        let settings2 = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body2)
        }
        let f2 = await fetch(`${url}/rotas/registrar`, settings2);
        act2[f2["status"]]();
        setBtnAtivo(false);
    }
    const cancelarServico = async function(){
        setBtnAtivo(true);
        if(codigo == "" || obs == ""){
            setBtnAtivo(false);
            return Alert.alert("Algum campo não está preenchido, revise-o e tente novamente.");
        }


        //imagens
        let filterImage = imagens.filter(function(e){
            return e["status_servico"] == "quebra"
        }).some(function(e){
            return e["b64"] == undefined;
        })
        if(filterImage){
            setBtnAtivo(false);
            return Alert.alert("Alguma foto não foi tirada");
        }

        let body = {
            cod: codigo,
            obs: obs,
            id: id,
            status: "quebra",
            imagens: []
        }

        imagens.filter(function(e){
            return e["status_servico"] == "quebra"
        }).forEach(function(e){
            body["imagens"].push({
                id_imagem_provedor: e["id"],
                content: e["b64"],
                fileType: e["fileType"],
                fileName: e["fileName"],
            })
        })

        let act = {
            "400" : function(){
                setBtnAtivo(false);
                return Alert.alert("Não foi possivel cancelar, favor tentar novamente.");
            },
            "200": async function(){
                const user = JSON.parse(await AsyncStorage.getItem("user"));
                let body2 = {
                    cpf_funcionario: user["cpf"],
                    latitude: item["cliente"]["latitude"],
                    longitude: item["cliente"]["longitude"]
                }
                let act2 = {
                    "201": setarRotaFuncionario,
                    "400": function(){
                        setBtnAtivo(false);
                        Alert.alert("Não foi possivel finalizar o serviço tente novamente");
                    }
                }
        
                let settings2 = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body2)
                }
                let f2 = await fetch(`${url}/rotas/registrar`, settings2);
                act2[f2["status"]]();
            }
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
            setBtnAtivo(false);
            Alert.alert("Erro ao tentar cancelar, tente novamente.");
        }
    }

    const [imageModal, setImageModal] = React.useState(false);
    const openModal = function(setItem, item){
        setItem(!item);
    }
    
    const [image, setImage] = React.useState("");
    const salvarImagem = async function(baseValue){
        try{
            await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
            const result = await launchCamera({
                includeBase64: true,
                mediaType: "photo",
            });
            if (!result["didCancel"]) {
                baseValue["b64"] = result["assets"][0]["base64"];
                baseValue["fileType"] = result["assets"][0]["type"].split("/")[1];
                baseValue["fileName"] = result["assets"][0]["fileName"];
            }
        }catch(err){
            console.error(err);
        }
    }
    const mostrarImagem = function(name){
        const filter = imagens.filter(function(e){
            return name == e["name"]
        })
        if(filter.length == 1){
            if(filter[0]["b64"] != undefined) {
                setImage(filter[0]["b64"]);
                return openModal(setImageModal, imageModal);
            }
        }
    }
    const removerImagem = function(baseValue){
        const filter = imagens.filter(function(e){
            return baseValue["name"] == e["name"];
        })
        if(filter.length == 1){
            delete filter[0]["b64"];
            delete filter[0]["fileName"];
            delete filter[0]["fileType"];
        }
    }

    return (
        <BaseModal 
            visible={visible}
            modalRequest={action}
            transparent={true}
            content={
                <View
                    style={style["container"]}
                >
                    <ShowImage 
                        visible={imageModal}
                        modalRequest={openModal.bind(this, setImageModal, imageModal)}
                        image={image}
                    />
                    <View
                        style={style["view"]}
                    >
                        <ScrollView
                            style={style["page"]}
                        >
                            <LabelModal
                                action={action}
                                pageTitle={"Quebra"}
                            />
                            <View
                                style={style["inputContainer"]}
                            >
                                <Input
                                    text={"Codigo"}
                                    value={[setCodigo, codigo]}
                                />
                                <Input
                                    text={"Observação"}
                                    value={[setObs, obs]}
                                    nol={3}
                                    ml={true}
                                />
                            </View>
                            {
                                imagens.filter(function(e){
                                    return e["status_servico"] == "quebra";
                                }).map(function(e, index){
                                    return(
                                        <ShowItem
                                            key={index}
                                            label={e["name"]}
                                            hasContent={e["b64"] != undefined}
                                            actionCamera={salvarImagem.bind(this, e)}
                                            actionImage={mostrarImagem.bind(this, e["name"])}
                                            actionRemove={removerImagem.bind(this, e)}
                                        />
                                    )
                                })
                            }
                            <Button
                                title={"Cancelar"}
                                action={cancelarServico}
                                active={btnAtivo}
                                outStyle={{
                                    marginVertical: 40,
                                }}
                            />
                        </ScrollView>
                    </View>
                </View>
            }
        />
    );
}

export default ModalCancel;