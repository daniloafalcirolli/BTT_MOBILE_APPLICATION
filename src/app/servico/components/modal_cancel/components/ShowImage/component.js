import React from "react";
import {View, Image} from "react-native";

//style
import pageStyle from "../../../../../../templates/style/pageStyle";

//components
import BaseModal from "../../../../../../templates/components/modal/base/component";
import LabelModal from "../../../../../../templates/components/modal/nome_e_fechar/component";

const ShowImage = function({visible, image, modalRequest}){

    return(
        <BaseModal 
            modalRequest={modalRequest}
            visible={visible}
            content={
                <View
                    style={pageStyle["normal"]}
                >
                    {
                        image && <>
                            <LabelModal
                                action={modalRequest}
                                pageTitle={""}
                            />
                            <Image
                                style={{
                                    width: "80%",
                                    height: "80%",
                                    position:"absolute",
                                    top: "10%",
                                    left: "10%",
                                    borderRadius: 10,
                                }}
                                source={{uri: `data:image/jpeg;base64,${image}`}}
                            />
                        </>
                    }
                </View>
            }
        />
    )
}

export default ShowImage;