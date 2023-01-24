import React from "react";
import { Alert, ScrollView, View, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

//url
import {url} from "../../../../config/url.json";

//key
import {googlekey} from "../../../../config/key.json";

//style
import colors from "../../../../config/colors.json";
import style from "./style";
import pageStyle from "../../../../templates/style/pageStyle";

//components
import BaseModal from "../../../../templates/components/modal/base/component";
import LabelModal from "../../../../templates/components/modal/nome_e_fechar/component";
import Input from "../input/component";
import Button from "../button/component";
import Carregamento, {executarCarregando} from "../../../../templates/components/basics/carregamento/component";

const ModalCreateCliente = function({value, visible, action}){

    const [carregando, setCarregando] = React.useState(false);

    const [cpfcnpj, setCpfCnpj] = React.useState("");
    const [endereco, setEndereco] = React.useState({})
    const [contrato, setContrato] = React.useState("");
    const [nome, setNome] = React.useState("");

    //Cpf ou cnpj selecionado
    const [state, setState] = React.useState({
        type: "CPF",
        json: "cpf"
    })
    const changeState = function(){
        if(state["type"] == "CPF"){
            setState({
                type: "CNPJ",
                json: "cnpj"
            })
        }else{
            setState({
                type: "CPF",
                json: "cpf"
            })
        }
    }
    React.useEffect(function(){
        if(state["json"] == "cpf" && cpfcnpj.length == 11){
            validarCPFCNPJ();
        }else if(state["json"] == "cnpj" && cpfcnpj.length == 14){
            validarCPFCNPJ();
        }
    }, [cpfcnpj])

    const CriarCliente = async function(){
        if(
            nome == "" || nome == undefined ||
            endereco == "" || endereco == undefined ||
            JSON.stringify(contrato) == "{}" || contrato == undefined ||
            cpfcnpj == "" || cpfcnpj == undefined
        ){
            return Alert.alert("Algum campo não está preenchido");
        }

        let act = {
            "201": async function(f) {
                setContrato("");
                setCpfCnpj("");
                setEndereco({});
                setNome("")
                let r = await f.json();
                value(r);
                action();
            },
            "400": function(){
                return Alert.alert("Não foi possivel criar o cliente, tente novamente.");
            }
        }

        let body = {
            nome: nome.toUpperCase(),
            contrato: contrato,
            endereco: endereco["endereco"].toUpperCase(),
            latitude: endereco["coord"]["lat"] + "",
            longitude: endereco["coord"]["lng"] + ""
        }
        body[state["json"]] = cpfcnpj;

        let settings = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }

        let f = await fetch(`${url}/cliente`, settings);
        act[f["status"]](f);
    }

    let validarCPFCNPJ = async function(){
        let body = {};
        body[state["json"]] = cpfcnpj;
        let settings = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        }

        let act = {
            "302": async (f) => {
                Alert.alert("Esse CPF/CNPJ ja estão cadastrados, voltando para a tela de criação de serviço");
                let r = await f.json();
                value(r);
                setCpfCnpj("");
                action();
            },
            "404": () => {
                return null;
            }
        }

        let f = await fetch(`${url}/cliente/validate`, settings);
        act[f.status](f);
    }

    return(
        <BaseModal 
            action={action}
            visible={visible}
            content={
                <>
                    <Carregamento
                        active={carregando}
                    />
                    <ScrollView
                        style={pageStyle["normal"]}
                    >
                        <LabelModal
                            action={action}
                            pageTitle={"Criar\nCliente"}
                        />
                        <Button
                            title={state["type"]}
                            action={changeState}
                        />
                        <Input
                            label={state["type"]}
                            value={[setCpfCnpj, cpfcnpj]}
                        />
                        <View
                            style={style["container"]}
                        >
                            <Text
                                style={style["text"]}
                            >
                                Endereço
                            </Text>
                            <GooglePlacesAutocomplete
                                onPress={(data, details = null) => {
                                    setEndereco({
                                        endereco: details.name,
                                        coord: details.geometry.location
                                    })
                                }}
                                styles={{
                                    container: {
                                        alignSelf: "center",
                                        width: "100%",
                                    },
                                    textInput: {
                                        borderTopLeftRadius: 0,
                                        borderTopRightRadius: 0,
                                        backgroundColor: colors["background_color_1"],
                                        fontSize: 30,
                                        color: colors["color_2"]
                                    }
                                }}
                                listViewDisplayed={true}
                                keepResultsAfterBlur={true}
                                keyboardShouldPersistTaps='always'
                                query={{
                                    key: googlekey,
                                    language: 'pt-br',
                                }}
                                fetchDetails={true}
                                enablePoweredByContainer={false}
                            />
                        </View>
                        <Input
                            label={"Nome"}
                            value={[setNome, nome]}
                        />
                        <Input
                            label={"Contrato"}
                            value={[setContrato, contrato]}
                        />
                        <Button
                            title={"Criar\nCliente"}
                            action={executarCarregando.bind(this, CriarCliente, setCarregando)}
                        />
                    </ScrollView>
                </>
            }
        />
    )
}

export default ModalCreateCliente;