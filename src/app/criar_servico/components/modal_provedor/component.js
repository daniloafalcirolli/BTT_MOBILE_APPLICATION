import React from "react";
import {ScrollView} from "react-native";

//style
import style from "./style";
import pageStyle from '../../../../templates/style/pageStyle';

//url
import {url} from "../../../../config/url.json";

//components
import BaseModal from "../../../../templates/components/modal/base/component";
import LabelModal from "../../../../templates/components/modal/nome_e_fechar/component";
import InputModal from "../../../../templates/components/modal/input/component";
import ShowInfo from "./components/show_info/component";

const ModalProvedores = function({visible, value, reset, action}){

    const [searchInput, setSearchInput] = React.useState("");
    const [provedores, setProvedores] = React.useState([]);

    const filter = provedores.filter((item) => JSON.stringify(item).toLocaleLowerCase().includes(searchInput.toLocaleLowerCase()));

    const getProvedores = async function(){
        let f = await fetch(`${url}/provedor`);
        let r = await f.json();
        setProvedores(r);
    }

    React.useEffect(function(){
        getProvedores();
    }, [])

    return(
        <BaseModal
            visible={visible}
            modalRequest={action}
            content={
                <ScrollView
                    style={pageStyle["normal"]}
                >
                    <LabelModal 
                        pageTitle={"Selecionar\nProvedor"}
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
                                    text={e.name}
                                    action={function(){
                                        reset({});
                                        value(e);
                                        action();
                                    }}
                                />
                            )
                        }) :
                        provedores.map(function(e,index){
                            return(
                                <ShowInfo
                                    key={index}
                                    text={e.name}
                                    action={function(){
                                        value(e);
                                        action();
                                    }}
                                />
                            )
                        })
                    }
                </ScrollView>
            }
        />
    );
}

export default ModalProvedores;