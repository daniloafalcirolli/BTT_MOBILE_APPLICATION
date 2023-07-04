import React from "react";
import {Alert, Modal, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {url} from "../../config/url.json";

//style
import style from "./style";
import pageStyle from "../../templates/style/pageStyle";

//components
import BotaoAbrirModal from "./components/botao_abrir_modal/component";
import Button from "./components/button/component";

import ModalImagensObrigatorias from "./components/modal_imagens_obrigatorias/component";
import ModalCamposObrigatorios from "./components/modal_campo_obrigatorios/component";
import ConfirmarTelefone from "./components/confirmar_telefone/component";
import ModalMateriaisRA from "./components/modal_materiais_RA/component";
import CheckBox from "./components/check_box/component";

const FinalizarServico = function({navigation, route}){

    const {id_servico, id_provedor, service} = route.params;
    const [active, setActive] = React.useState(false);
    const [provedor, setProvedor] = React.useState();
    const getProvedor = async function(){
        let f = await fetch(`${url}/provedor/${id_provedor}`);
        let r = await f.json();
        setProvedor(r);
    }
    React.useEffect(function(){
        getProvedor();
    }, [])

    const modalRequest = function(setItem, item){
        setItem(!item)
    }

    const [modalImagensObrigatorias, setModalImagensObrigatorias] = React.useState(false);
    const [modalCamposObrigatorios, setModalCamposObrigatorios] = React.useState(false);
    const [modalMateriaisAplicados, setModalMateriaisAplicados] = React.useState(false);
    const [materiaisAplicados, setMateriaisAplicados] = React.useState([]);
    const [modalMateriaisRetirados, setModalMateriaisRetirados] = React.useState(false)
    const [materiaisRetirados, setMateriaisRetirados] = React.useState([]);
    const [modalConfirmarTelefone, setModalConfirmarTelefone] = React.useState(false);

    const SetarRota = async function(){
        const user = JSON.parse(await AsyncStorage.getItem("user"));
        let body2 = {
            cpf_funcionario: user["cpf"],
            latitude: service["cliente"]["latitude"],
            longitude: service["cliente"]["longitude"],
            descricao: 0
        }
        let act2 = {
            "201": function(){
                Alert.alert("Serviço finalizado com sucesso");
                setModalConfirmarTelefone(true);
            },
            "400": function(){
                setActive(false);
                Alert.alert("Não foi possivel setar a rota do serviço tente novamente");
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
                navigation.navigate("Almoco", service);
            },
            "302": function(){
                Alert.alert("Você ja almoçou hoje.");
                navigation.navigate("TabP");
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

    const FinalizarServico = async function(){
        setActive(true);

        let body = {
            id: id_servico,
            imagens: [],
            campos_aplicados: [],
            materiais_aplicados: [],
            materiais_retirados: []
        }

        //imagens
        let filterImage = provedor["imagens"].filter(function(e){
            return e["status_servico"] == "finalizado"
        }).some(function(e){
            return e["b64"] == undefined;
        })
        if(filterImage){
            setActive(false);
            return Alert.alert("Alguma foto não foi tirada");
        }

        //campos
        let filterCampos = provedor["campos"].some(function(e){
            return e["value"] == undefined || e["value"] == "";
        })
        if(filterCampos){
            setActive(false);
            return Alert.alert("Algum campo não está preenchido");
        }

        if(usadoMaterial){
            //Materiais Aplicados
            let filterAplicados = materiaisAplicados.some(function(e){
                return e["value"] == undefined || e["value"] == "";
            })
            let filterAplicadosSerial = false;
            for(let ma of materiaisAplicados){
                if(ma["has_serial"]){
                    for(let i = 0; i < ma["value"]; i++){
                        if(ma["seriais"][i] == undefined || ma["seriais"][i] == ""){
                            filterAplicadosSerial = true;
                            break;
                        }
                    }
                }
            }

            if(filterAplicados || filterAplicadosSerial){
                setActive(false);
                return Alert.alert("Algum material está sem quantidade ou serial");
            }
            //materiaisAplicados
            for(let ma of materiaisAplicados){
                let json;
                if(ma["has_serial"]){
                    for(let i = 0; i < ma["value"]; i++){
                        json = {
                            id: ma["id"],
                            value: `${ma["seriais"][i]}`
                        }
                        body["materiais_aplicados"].push(json);
                    }
                }else{
                    json = {
                        id: ma["id"],
                        value: `${ma["value"]}`
                    }
                    body["materiais_aplicados"].push(json);
                }
            }
        }
        
        if(usadoRetirados){
            //Materiais Retirados
            let filterRetirados = materiaisRetirados.some(function(e){
                return e["value"] == undefined || e["value"] == "";
            })
            let filterRetiradosSerial = false;
            for(let mr of materiaisRetirados){
                if(mr["has_serial"]){
                    for(let i = 0; i < mr["value"]; i++){
                        if(mr["seriais"][i] == undefined || mr["seriais"][i] == ""){
                            filterRetiradosSerial = true;
                            break;
                        }
                    }
                }
            }
            if(filterRetirados || filterRetiradosSerial){
                setActive(false);
                return Alert.alert("Algum material está sem quantidade ou serial");
            }
            //materiaisRetirados
            for(let mr of materiaisRetirados){
                let json;
                if(mr["has_serial"]){
                    for(let i = 0; i < mr["value"]; i++){
                        json = {
                            id: mr["id"],
                            value: `${mr["seriais"][i]}`
                        }
                        body["materiais_retirados"].push(json);
                    }
                }else{
                    json = {
                        id: mr["id"],
                        value: `${mr["value"]}`
                    }
                    body["materiais_retirados"].push(json);
                }
            }
        }

        //imagens
        let imageFilter = provedor["imagens"].filter(function(e){
            return e["status_servico"] == "finalizado"
        });
        for(let i = 0; i < imageFilter.length; i++){
            body["imagens"].push({
                id_imagem_provedor: imageFilter[i]["id"],
                content: imageFilter[i]["b64"],
                fileType: imageFilter[i]["fileType"],
                fileName: imageFilter[i]["fileName"],
            })
        }

        //campos
        for(let i = 0; i < provedor["campos"].length; i++){
            body["campos_aplicados"].push({
                id: provedor["campos"][i]["id"],
                value: provedor["campos"][i]["value"],
            })
        }

        let act = {
            "200": SetarRota,
            "400": function(){
                setActive(false);
                Alert.alert("Não foi possivel finalizar o serviço tente novamente");
            }
        }

        let settings = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
        let f = await fetch(`${url}/servico/encerrar`, settings);
        act[f["status"]]();

    }

    const [usadoMaterial, setUsadoMaterial] = React.useState(true);
    const [usadoRetirados, setUsadoRetirados] = React.useState(true);

    return (
        <View
            style={[pageStyle["normal"], style["page"]]}
        >
            {
                provedor && <>
                    <View
                        style={style["containerButtons"]}
                    >
                        <ConfirmarTelefone
                            modalRequest={modalRequest.bind(this, setModalConfirmarTelefone, modalConfirmarTelefone)}
                            visible={modalConfirmarTelefone}
                            label={"Confirmar\nTelefone\ndo Cliente"}
                            service={service}
                            actionAfterConfirm={confirmarAlmoco}
                        />
                        <ModalMateriaisRA
                            modalRequest={modalRequest.bind(this, setModalMateriaisRetirados, modalMateriaisRetirados)}
                            visible={modalMateriaisRetirados}
                            values={[setMateriaisRetirados, materiaisRetirados]}
                            item={provedor["materiais_retirados"]}
                            label={"Materiais\nRetirados"}
                        />
                        <BotaoAbrirModal 
                            icon={"dropbox"}
                            action={modalRequest.bind(this, setModalMateriaisRetirados, modalMateriaisRetirados)}
                            label={"Materiais\nRetirados"}
                        />

                        <ModalMateriaisRA
                            modalRequest={modalRequest.bind(this, setModalMateriaisAplicados, modalMateriaisAplicados)}
                            visible={modalMateriaisAplicados}
                            values={[setMateriaisAplicados, materiaisAplicados]}
                            item={provedor["materiais_aplicados"]}
                            label={"Materiais\nAplicados"}
                        />
                        <BotaoAbrirModal
                            icon={"wrench"}
                            label={"Materiais\nAplicados"}
                            action={modalRequest.bind(this, setModalMateriaisAplicados, modalMateriaisAplicados)}
                        />
                        
                        <ModalCamposObrigatorios 
                            value={provedor["campos"]}
                            visible={modalCamposObrigatorios}
                            modalRequest={modalRequest.bind(this, setModalCamposObrigatorios, modalCamposObrigatorios)}
                        />
                        <BotaoAbrirModal
                            icon={"gear"}
                            label={"Campos\nObrigatorios"}
                            action={modalRequest.bind(this, setModalCamposObrigatorios, modalCamposObrigatorios)}
                        />

                        <ModalImagensObrigatorias 
                            visible={modalImagensObrigatorias}
                            modalRequest={modalRequest.bind(this, setModalImagensObrigatorias, modalImagensObrigatorias)}
                            item={provedor["imagens"]}
                        />
                        <BotaoAbrirModal 
                            icon={"image"}
                            label={"Imagems\nObrigatorios"}
                            action={modalRequest.bind(this, setModalImagensObrigatorias, modalImagensObrigatorias)}
                        />
                    </View>
                    <CheckBox
                        label={"Foi aplicado algum material?"}
                        check={[setUsadoMaterial, usadoMaterial]}
                    />
                    <CheckBox
                        label={"Foi retirado algum material?"}
                        check={[setUsadoRetirados, usadoRetirados]}
                    />
                    <Button
                        label={"Finalizar\nServiço"}
                        action={FinalizarServico}
                        active={active}
                    />
                </>
            }
        </View>
    );
}

export default FinalizarServico;