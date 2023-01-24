import React from "react";
import {ActivityIndicator} from "react-native";

//style
import style from "./style";
import colors from "../../../../config/colors.json";

const Carregamento = function({active}) {
    return (
        <>
            {
                active && <ActivityIndicator
                    size={"large"}
                    color={colors["color_1"]}
                    style={style}
                />
            }
        </>
    );
}

const executarCarregando = function(funcao, setItem){
    setItem(true);
    setTimeout(async ()=>{
        await funcao();
        setItem(false);
    }, 1500)
}

export default Carregamento;
export {executarCarregando};
