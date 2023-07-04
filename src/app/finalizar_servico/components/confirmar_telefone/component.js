import React from "react";
import {View, Text} from "react-native";

//url
import {url} from "../../../../config/url.json"

//style
import pageStyle from '../../../../templates/style/pageStyle';

//components
import Button from "../../../../templates/components/basics/button/component";
import LabelModal from "../../../../templates/components/modal/nome_e_fechar/component";
import Input from "./components/input/component";
import BaseModal from "../../../../templates/components/modal/base/component";

const ConfirmarTelefone = function({service, visible, modalRequest, label, actionAfterConfirm}){

    const [telefone, setTelefone] = React.useState(service["cliente"]["telefone"]+"")
    const [telefone2, setTelefone2] = React.useState(service["cliente"]["telefone2"]+"");

    const salvar = async function(){
        let s = service["cliente"]
        s["telefone"] = telefone;
        s["telefone2"] = telefone2;

        let settings = {
            "METHOD":"PUT",
            "headers":"Content-Type",
            "body": JSON.stringify(s)
        }
        let f = await fetch(`${url}/cliente`, settings);
        if(f["status"] == "200"){
            Alert.alert("Numero salvo com sucesso");
            actionAfterConfirm();
        }else if(f["status"] == "404"){
            Alert.alert("Cliente inexistente");
        }else{
            Alert.alert("Não foi possivel alterar o numero, tente novamente");
        }
    }

    return(
        <BaseModal
            modalRequest={modalRequest}
            visible={visible}
            content={
                <View
                    style={pageStyle["normal-spaced"]}
                >
                    <LabelModal
                        pageTitle={label}
                        action={modalRequest}
                    />
                    <View>
                        <Input
                            label={"Telefone 1"}
                            value={telefone}
                            setValue={setTelefone}
                        />
                        <Input
                            label={"Telefone 2"}
                            value={telefone2}
                            setValue={setTelefone2}
                        />
                    </View>
                    <Button
                        title={"Alterar"}
                        action={actionAfterConfirm}
                    />
                    <Button
                        title={"Finalizar"}
                        action={salvar}
                    />
                </View>
            }
        />
    )
}

export default ConfirmarTelefone;