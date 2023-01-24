import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"

//style
import style from "./style";

//components
import Serial from "../serial/component";

const SelectedMaterial = function({label, item, maxQ, rAct}){

    const [valor, setValor] = React.useState(item["value"]);
    React.useEffect(function(){
        item["value"] = valor;
    }, [valor])


    const serialCount = function(num = 0){
        let array = [];
        for(let i = 0; i < num; i++){
            array.push(
                <Serial
                    key={i}
                    num={i}
                    item={item}
                />
            );
        }
        return array;
    }

    return(
        <View
            style={style["container"]}
        >
            <View
                style={style["labelBase"]}
            >
                <TouchableOpacity
                    onPress={rAct}
                    style={style["iconContainer"]}
                >
                    <Icon
                        style={style["icon"]}
                        name={"close"}
                        size={30}
                    />
                </TouchableOpacity>
                <Text
                    style={style["label"]}
                >
                    {label}
                </Text>
            </View>
            <TextInput
                style={style["inputValue"]}
                value={valor}
                onChangeText={function(e){
                    setValor(e > Number(maxQ) ? 1 : e);
                }}
                keyboardType={"numeric"}
            />
            {
                item["has_serial"] && serialCount(valor).map(function(e){
                    return(e);
                })
            }
        </View>
    );
}

export default SelectedMaterial;