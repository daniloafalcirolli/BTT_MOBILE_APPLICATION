import React from 'react';
import { ScrollView, Text, RefreshControl} from 'react-native';

//style
import style from "./style";
import pageStyle from '../../../../templates/style/pageStyle';

//url
import {url} from "../../../../config/url.json";

//component
import BaseModal from "../../../../templates/components/modal/base/component";
import LabelModal from "../../../../templates/components/modal/nome_e_fechar/component";
import InputModal from "../../../../templates/components/modal/input/component";
import ShowInfo from "./components/modal_show_info/component";


const ModalCliente = function({visible, value, action}) {

    const [refresh, setRefresh] = React.useState(false);
    const onRefresh = async function(){
        setRefresh(true);
        await getInfos();
        setRefresh(false);
    }

    const [searchInput, setSearchInput] = React.useState("");
    const [clientes, setClientes] = React.useState([]);

    const filter = clientes.filter((item) => JSON.stringify(item).toLocaleLowerCase().includes(searchInput.toLocaleLowerCase()));

    const getInfos = async function(){
        let f = await fetch(`${url}/cliente`);
        let r = await f.json();
        setClientes(r);
    }

    React.useEffect(function(){
        getInfos();
    }, [])

    return (
        <BaseModal
            visible={visible}
            modalRequest={action}
            content={
                <ScrollView
                    style={pageStyle["normal"]}
                    refreshControl={
                        <RefreshControl
                          refreshing={refresh}
                          onRefresh={onRefresh}
                        />
                    }
                >
                    <LabelModal
                        pageTitle={"Selecionar\nClientes"}
                        action={action}
                    />
                    <InputModal 
                        value={[setSearchInput, searchInput]}
                    />
                    {
                        filter.length != 0 ? 
                        filter.map(function(e, index){
                            return(
                                <ShowInfo
                                    key={index}
                                    action={function(){
                                        value(e);
                                        action();
                                    }}
                                    value={e}
                                />
                            )
                        }) :
                        clientes.map(function(e, index){
                            return(
                                <ShowInfo
                                    key={index}
                                    action={function(){
                                        value(e);
                                        action();
                                    }}
                                    value={e}
                                />
                            )
                        })
                    }
                </ScrollView>
            }
        />
    )
}

export default ModalCliente;