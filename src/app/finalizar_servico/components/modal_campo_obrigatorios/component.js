import React from 'react';
import { ScrollView } from 'react-native';

//style
import pageStyle from '../../../../templates/style/pageStyle';

//component
import BaseModal from "../../../../templates/components/modal/base/component";
import LabelModal from "../../../../templates/components/modal/nome_e_fechar/component";
import ShowItem from "./components/show_item/component";

const ModalCamposObrigatorios = function({visible, value, modalRequest}) {

    return (
        <BaseModal
            modalRequest={modalRequest}
            visible={visible}
            content={
                <ScrollView
                    style={pageStyle["normal"]}
                >
                    <LabelModal 
                        pageTitle={"Campos\nObrigatorios"}
                        action={modalRequest}
                    />
                    {
                        value.map(function(e, index) {
                            return(
                                <ShowItem
                                    key={index}
                                    label={e["campo"]}
                                    value={e}
                                />
                            );
                        })
                    }
                </ScrollView>
            }
        />
    )
}

export default ModalCamposObrigatorios;