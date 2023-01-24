import React from "react";
import {ScrollView} from "react-native";

//url
import {url} from "../../../../config/url.json";

//style
import pageStyle from "../../../../templates/style/pageStyle";

//components
import BaseModa from "../../../../templates/components/modal/base/component";
import LabelModal from "../../../../templates/components/modal/nome_e_fechar/component";
import Button from "../button/component";
import ModalMateriais from "./components/modal_materiais/component";
import SelectedMaterial from "./components/selected_material/component";

const ModalMateriaisRA = function({visible, item, modalRequest, label, values}){

    const [modalMateriais, setModalMateriais] = React.useState(false);
    const [maxValue, setMaxValue] = React.useState(null);
    const openModal = function(setItem, item) {
        setItem(!item);
    }

    const getValorMaximo = async function(){
        let f = await fetch(`${url}/meta/key/serial_max_value`);
        let r = await f.json();
        setMaxValue(r["metaValue"]);
    }

    React.useEffect(function(){
        getValorMaximo();
    })

    const removeItem = function(item){
        let io = values[1].indexOf(item);
        let v = values[1];
        v.splice(io, 1);
        values[0](v);
        modalRequest();
    }

    return(
        <BaseModa
            modalRequest={modalRequest}
            visible={visible}
            content={
                <ScrollView
                    style={pageStyle["normal"]}
                >
                    <LabelModal 
                        pageTitle={label}
                        action={modalRequest}
                    />
                    <ModalMateriais
                        values={values}
                        modalRequest={openModal.bind(this, setModalMateriais, modalMateriais)}
                        visible={modalMateriais}
                        item={item}
                    />
                    <Button
                        label={"Selecionar Materiais"}
                        action={openModal.bind(this, setModalMateriais, modalMateriais)}
                    />
                    {
                        values[1] && values[1].map(function(e, index){
                            e["seriais"] == undefined ? e["seriais"] = [] : null
                            return (
                                <SelectedMaterial
                                    key={index}
                                    item={e}
                                    maxQ={e["has_serial"] ? maxValue : null}
                                    rAct={removeItem.bind(this, e)}
                                    label={e["material"]}
                                />
                            )
                        })
                    }
                </ScrollView>
            }
        />
    )
}

export default ModalMateriaisRA;