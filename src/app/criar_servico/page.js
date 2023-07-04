import React from 'react';
import { Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

//style
import style from "./style";
import pageStyle from "../../templates/style/pageStyle";

//components
import Button from "./components/button/component";
import ModalClientes from "./components/modal_clientes/component.js";
import ShowCliente from "./components/show_cliente/component";
import ModalProvedores from "./components/modal_provedor/component";
import ModalProvedorServico from "./components/modal_provedor_servicos/component";
import ShowProvedorServico from "./components/show_provedor_servico/component";
import Input from "./components/input/component";
import ModalCreateCliente from './components/modal_create_cliente/component';
import Carregamento, {executarCarregando} from "../../templates/components/basics/carregamento/component";

//url
import {url} from "../../config/url.json";

const CriarServicos = function() {

    const [carregando, setCarregando] = React.useState(false);

    const openModal = function(setItem, item){
        setItem(!item)
    }

    const [modalCreateCliente, setModalCreateCliente] = React.useState(false);

    const [ModalCliente, setModalCliente] = React.useState(false);
    const [ModalClienteValue, setModalClienteValue] = React.useState({});
    const openModalCliente = function(){
        setModalCliente(!ModalCliente)
    }

    const [ModalProvedor, setModalProvedor] = React.useState(false);
    const [ModalProvedorValue, setModalProvedorValue] = React.useState({});
    const openModalProvedor = function(){
        setModalProvedor(!ModalProvedor)
    }

    const [ModalProvedorServicos, setModalProvedorServicos] = React.useState(false);
    const [ModalProvedorServicosValue, setModalProvedorServicosValue] = React.useState({});
    const openModalProvedorServicos = function(){
        setModalProvedorServicos(!ModalProvedorServicos)
    }

    const [protocolo, setProtocolo] = React.useState("");

    const handleFinish = async function(){
        if(
            JSON.stringify(ModalClienteValue) == "{}" ||
            JSON.stringify(ModalProvedorValue) == "{}" ||
            JSON.stringify(ModalProvedorServicosValue) == "{}" ||
            protocolo == ""
        ){
            return Alert.alert("Algum campo não está selecionado, revise-o e tente novamente");
        }

        let user = JSON.parse(await AsyncStorage.getItem("user"))

        let json = {
            "id_cliente": ModalClienteValue["id"],
            "cpf_funcionario": user["cpf"],
            "id_provedor": ModalProvedorValue["id"],
            "id_servico_provedor": ModalProvedorServicosValue["id"],
            "protocolo": protocolo
        }

        let act = {
            "201": function(){
                setModalClienteValue({});
                setModalProvedorValue({});
                setModalProvedorServicosValue({});
                setProtocolo("");
                return Alert.alert("Serviço criado com sucesso!");
            },
            "401": function(){
                return Alert.alert("Você não tem autorização para criar um serviço, vá a central e fale com seu superior.");
            },
            "412": function(){
                return Alert.alert("Algum campo não estra preenchido, revise-o e tente novamente.");
            },
        }

        try{
            let settings = {
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json",
                },
                "body": JSON.stringify(json),
            }
            let f = await fetch(`${url}/servico/create`, settings);
            act[f["status"]]();
        }catch(err){
            return Alert.alert("Algo deu errado tente novamente mais tarde...")
        }
    }

    return (
        <>
            <Carregamento
                active={carregando}
            />
            <ScrollView
                style={[pageStyle["normal"], style["page"]]}
            >
                <ModalCreateCliente 
                    visible={modalCreateCliente}
                    action={openModal.bind(this, setModalCreateCliente, modalCreateCliente)}
                    value={setModalClienteValue}
                />
                <Button 
                    title={"Criar Cliente"}
                    action={openModal.bind(this, setModalCreateCliente, modalCreateCliente)}
                />
                <ModalClientes
                    visible={ModalCliente}
                    action={openModal.bind(this, setModalCliente, ModalCliente)}
                    value={setModalClienteValue}
                />
                <Button 
                    title={"Selecionar Cliente"}
                    action={openModalCliente}
                />
                {
                    ModalClienteValue["nome"] == undefined ?
                    null :
                    <ShowCliente
                        value={ModalClienteValue}
                    />
                }

                <ModalProvedores
                    visible={ModalProvedor}
                    action={openModal.bind(this, setModalProvedor, ModalProvedor)}
                    value={setModalProvedorValue}
                    reset={setModalProvedorServicosValue}
                />
                <Button
                    title={"Selecionar Provedor"}
                    action={openModalProvedor}
                />

                <ModalProvedorServico
                    visible={ModalProvedorServicos}
                    action={openModal.bind(this, setModalProvedorServicos, ModalProvedorServico)}
                    value={setModalProvedorServicosValue}
                    id={ModalProvedorValue.id}
                />
                {
                    JSON.stringify(ModalProvedorValue) == "{}" ? null :
                    <Button 
                        title={"Selecionar Servicos do Provedor"}
                        action={openModalProvedorServicos}
                    />
                }

                {
                    JSON.stringify(ModalProvedorValue) != "{}" && JSON.stringify(ModalProvedorServicosValue) != "{}" ?
                    <ShowProvedorServico
                        provedor={ModalProvedorValue.name}
                        servico={ModalProvedorServicosValue.servico}
                    />
                    :
                    null
                }

                <Input
                    label={"Protocolo"}
                    value={[setProtocolo, protocolo]}
                />

                <Button
                    title={"Salvar Serviço"}
                    action={executarCarregando.bind(this, handleFinish, setCarregando)}
                    styleF={{marginBottom:30}}
                />

            </ScrollView>
        </>
    )
}

export default CriarServicos;