import React from "react";
import { ScrollView } from "react-native";

//url
import {url} from "../../../../config/url.json";

//style
import style from "./style";
import pageStyle from '../../../../templates/style/pageStyle';

//component
import BaseModal from "../../../../templates/components/modal/base/component";
import LabelModal from "../../../../templates/components/modal/nome_e_fechar/component";
import InputModal from "../../../../templates/components/modal/input/component";
import ShowInfo from "./components/show_info/component";

const ModalProvedorServicos = function({visible, value, id, action}){
    const [searchInput, setSearchInput] = React.useState("");
    const [servicos, setServicos] = React.useState([]);

    const getInfos = async function(){
        if(id == undefined)
            return;

        let f = await fetch(`${url}/provedor/${id}`);
        let r = await f.json();
        setServicos(r["servicos"]);
    }

    React.useEffect(function(){
        getInfos();
    })

    return(
        <BaseModal
            visible={visible}
            modalRequest={action}
            content={
                <ScrollView
                    style={pageStyle["normal"]}
                >
                    <LabelModal
                        pageTitle={"Selecionar\Servico do\nProvedor"}
                        action={action}
                    />
                    <InputModal
                        value={[setSearchInput, searchInput]}
                    />
                    {
                        servicos.map(function(e, index){
                            return(
                                <ShowInfo
                                    key={index}
                                    text={e["servico"]}
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

export default ModalProvedorServicos;