import React from "react";
import {View, Text, TextInput} from "react-native";

//style
import style from "./style";

const ShowItem = function({label, value}){

    const [item, setItem] = React.useState(value["value"]);

    React.useEffect(function(){
        value["value"] = item;
    }, [item])

    return(
        <View
            style={style["container"]}
        >
            <Text
                style={style["label"]}
            >
                {label}
            </Text>
            <TextInput
                style={style["input"]}
                value={item}
                onChangeText={function(text){
                    setItem(text);
                }}
            />
        </View>
    )
}

export default ShowItem;