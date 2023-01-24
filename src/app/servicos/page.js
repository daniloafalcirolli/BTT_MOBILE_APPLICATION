import React from "react";
import {ScrollView} from "react-native";
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

//url
import {url} from "../../config/url.json";

//style
import pageStyle from "../../templates/style/pageStyle";

//components
import Input from "./components/input/component";
import ShowItem from "./components/show_item/component";

const Servicos = function({navigation}){

    const [servicos, setServicos] = React.useState();
    const getServices = async function(){
        let user = JSON.parse(await AsyncStorage.getItem("user"));
        let f = await fetch(`${url}/servico/funcionario/${user["cpf"]}`);
        let r = await f.json();
        setServicos(r);
    }
    React.useEffect(function(){
        getServices();
    })

    const isFocused = useIsFocused();

    React.useEffect(function(){
        getServices();
     }, [isFocused])
    
    const [buscador, setBuscador] = React.useState("");
    const filter = servicos && servicos.filter((item) => JSON.stringify(item).toLocaleLowerCase().includes(buscador.toLocaleLowerCase()));

    const irParaServico = function(id){
        navigation.navigate("Servico", {id:id})
    }

    return(
        <ScrollView
            style={pageStyle["normal"]}
        >
            <Input 
                value={[setBuscador, buscador]}
            />

            {
                servicos && (
                    filter.length != 0 ? 
                    filter.map(function(e, index){
                        return(
                            <ShowItem
                                key={index}
                                client={e["cliente_nome"]}
                                adress={e["cliente_endereco"]}
                                empresaServico={`${e["provedor"]} - ${e["provedor_servico"]}`}
                                action={irParaServico.bind(this, e["id"])}
                            />
                        )
                    }) :
                    servicos.map(function(e, index){
                        return(
                            <ShowItem
                                key={index}
                                client={e["cliente_nome"]}
                                adress={e["cliente_endereco"]}
                                empresaServico={`${e["provedor"]} - ${e["provedor_servico"]}`}
                                action={irParaServico.bind(this, e["id"])}

                            />
                        );
                    })
                )
            }
            
        </ScrollView>
    );
}

export default Servicos;