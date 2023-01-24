import React from "react";
import {View, Text, TextInput} from "react-native";

//style
import style from "../selected_material/style";

let Serial = function({num, item}){
    const [serial, setSerial] = React.useState(item["seriais"][num]);
    React.useEffect(function(){
        item["seriais"][num] = serial;
    }, [serial])
    return (
        <View>
            <Text
                style={style["label"]}
            >
                Serial {num+1}
            </Text>
            <TextInput
                style={style["inputValue"]}
                value={serial}
                onChangeText={function(e){
                    setSerial(e);
                }}
            />
        </View>
    )
};

export default Serial;