import React from "react";
import {ScrollView} from "react-native";

//style
import pageStyle from "../../../../../../templates/style/pageStyle";

//components
import BaseModal from "../../../../../../templates/components/modal/base/component";
import LabelModal from "../../../../../../templates/components/modal/nome_e_fechar/component";
import ShowItem from "../show_item/component";
import InputModal from "../../../../../../templates/components/modal/input/component";

const ModalMateriais = function({visible, item, modalRequest, values}){

    const [buscador, setBuscador] = React.useState("");
    const filtro = item.filter(function(e){
        return e["material"].toLowerCase().includes(buscador.toLocaleLowerCase());
    })

    const adicionarMaterial = function(material){
        let filter = values[1].filter(function(e){
            return e["material"] == material["material"]
        });

        if(filter.length == 0){
            let v = values[1];
            v.push(material);
            values[0](v);
        }
        
        modalRequest();
    }

    return(
        <BaseModal
            modalRequest={modalRequest}
            visible={visible}
            content={
                <ScrollView
                    style={pageStyle["normal"]}
                >
                    <LabelModal
                        pageTitle={"Materiais"}
                        action={modalRequest}
                    />
                    <InputModal
                        value={[setBuscador, buscador]}
                    />
                    {
                        filtro ? filtro.map(function(e, index){
                            return(
                                <ShowItem
                                    key={index}
                                    label={e["material"]}
                                    action={adicionarMaterial.bind(this, e)}
                                />
                            )
                        }) : item.map(function(e, index){
                            return(
                                <ShowItem
                                    key={index}
                                    label={e["material"]}
                                    action={adicionarMaterial.bind(this, e)}
                                />
                            )
                        })
                    }
                </ScrollView>
            }
        />
    )
}

export default ModalMateriais;