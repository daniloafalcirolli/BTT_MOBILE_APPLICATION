import React from "react";
import {Alert, ScrollView, PermissionsAndroid} from "react-native";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

//style
import pageStyle from "../../../../templates/style/pageStyle"

//components
import BaseModal from "../../../../templates/components/modal/base/component";
import LabelModal from "../../../../templates/components/modal/nome_e_fechar/component";
import ShowItem from "./components/show_item/component";
import ShowImage from "./components/ShowImage/component";

const ModalImagensObrigatorias = function({item, visible, modalRequest}){

    const [modalImagem, setModalImagem] = React.useState(false);
    const abrirModal = function(setItem, item){
        setItem(!item);
    }
    
    const [imagem, setImagem] = React.useState("");
    const SalvarImagem = async function(baseValue){
        try{
            await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
            const result = await launchCamera({
                includeBase64: true,
                mediaType: "photo",
            });
            console.log(result["assets"][0]["type"].split("/")[1], result["assets"][0]["fileName"])
            if (!result["didCancel"]) {
                baseValue["b64"] = result["assets"][0]["base64"];
                baseValue["fileType"] = result["assets"][0]["type"].split("/")[1];
                baseValue["fileName"] = result["assets"][0]["fileName"];
            }
        }catch(err){
            console.error(err);
        }
    }
    const MostarImagem = function(name){
        const filter = item.filter(function(e){
            return name == e["name"]
        })
        if(filter.length == 1){
            if(filter[0]["b64"] != undefined) {
                setImagem(filter[0]["b64"]);
                return abrirModal(setModalImagem, modalImagem);
            }
        }
    }
    const RemoverImagem = function(baseValue){
        const filter = item.filter(function(e){
            return baseValue["name"] == e["name"];
        })
        if(filter.length == 1){
            delete filter[0]["b64"];
            delete filter[0]["fileName"];
            delete filter[0]["fileType"];
        }
    }

    return(
        <BaseModal
            visible={visible}
            modalRequest={modalRequest}
            content={
                <>
                    <ShowImage 
                        visible={modalImagem}
                        modalRequest={abrirModal.bind(this, setModalImagem, modalImagem)}
                        image={imagem}
                    />
                    <ScrollView
                        style={pageStyle["normal"]}
                    >
                        <LabelModal
                            action={modalRequest}
                            pageTitle={"Imagems\nObrigatorias"}
                        />
                        {
                            item && item.filter(function(e){
                                return e["status_servico"] == "finalizado";
                            }).map(function(e, index){
                                return(
                                    <ShowItem
                                        key={index}
                                        label={e["name"]}
                                        hasContent={e["b64"] ? true : false}
                                        actionImage={MostarImagem.bind(this, e["name"])}
                                        actionCamera={SalvarImagem.bind(this, e)}
                                        actionRemove={RemoverImagem.bind(this, e)}
                                    />
                                )
                            })
                        }
                    </ScrollView>
                </>
            }
        />
    )
}

export default ModalImagensObrigatorias;