import React from "react";
import { Alert, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

//style
import pageStyle from "../../templates/style/pageStyle";

//url
import {url} from "../../config/url.json";


//components
import ShowItem from "./components/show_infos/component";
import DataP from './components/date_picker/component';
import Map from "./components/map/component";
import LabelModal from "../../templates/components/modal/nome_e_fechar/component";

const UserRoutes = function({navigation}){

    const [usuario, setUsuario] = React.useState(null);
    const [data, setData] = React.useState("");
    const [rotas, setRotas] = React.useState(null);
    const [addValue, setAddValue] = React.useState(false);

    const pegarUsuario = async function(){
        const funcionario = JSON.parse(await AsyncStorage.getItem("user"));
        setUsuario(funcionario);
    }

    const getAddValue = async function(){
        let f = await fetch(`${url}/meta/key/valor_adicional_gasolina`);
        let r = await f.json();
        setAddValue(r);
    }

    const getRotas = async function(){
        try{
            let body = {
                data: data.replace("/", "-"),
                cpf_funcionario: usuario["cpf"]
            }
            let settings = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }
            let f = await fetch(`${url}/rotas/individual`, settings);
            let r = await f.json();
            setRotas(r);
        }catch(err){
            Alert.alert("Não foi possivel adiquirir sua rota, tente novamente mais tarde.")
        }
    }

    React.useEffect(function(){
        if(usuario && data){
            getAddValue();
            getRotas();
        }
    }, [data])

    React.useEffect(function(){
        pegarUsuario();
    }, [])

    const VoltarPagina = function(){
        navigation.goBack();
    }

    return (
        <ScrollView
            style={pageStyle["normal"]}
        >
            <LabelModal
                pageTitle={"Relatorio do\nFuncionario"}
                action={VoltarPagina}
            />
            {
                usuario && <>
                    <ShowItem 
                        title={"Consumo"}
                        content={`${usuario["consumo"]}Km/L`}
                    />
                    <ShowItem 
                        title={"Preço da Gasolina"}
                        content={`R$ ${(Number(usuario["preco_gasolina"]).toFixed(2)).replace(".", ",")}`}
                    />
                </>
            }
            <DataP
                value={setData}
            />
            {
                rotas && <Map
                    info={rotas}
                    ajuste={addValue["metaValue"]}
                />    
            }
        </ScrollView>
    );
}

export default UserRoutes; 