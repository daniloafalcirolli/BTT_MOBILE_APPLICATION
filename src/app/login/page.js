import React from "react";
import { Text, View, Alert, Keyboard } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from "react-native-vector-icons/Octicons"

//crypt
import {sha256} from "../../templates/crypty/sha256";

//style
import style from "./style.js";
import colors from "../../config/colors.json";

//url
import {url} from "../../config/url.json";

//components
import Input from "./components/input/component";
import Button from "../../templates/components/basics/button/component";
import ChangeStatus from "./components/change_status/component.js";
import Carregamento, {executarCarregando} from "../../templates/components/basics/carregamento/component";

const Login = function({navigation}) {

    //status carregando
    const [carregando, setCarregando] = React.useState(false);

    //Informações do login
    const [type, setType] = React.useState("CPF");
    const [usuario, setUsuario] = React.useState("");
    const [code, setCode] = React.useState("");

    React.useEffect(function(){
        setCode("");
    }, [type])

    const fazerLogin = async function() {
        Keyboard.dismiss();
        if(usuario == "" || code == ""){
            return Alert.alert("Não é possivel fazer login sem algum campo, tente novamente");
        }

        let body = {
            username: usuario.toLowerCase()
        }

        if(type == "Senha"){
            body["password"] = sha256(code);
        }else{
            body["cpf"] = code;
        }

        const settings = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }

        const fAcao = {
            "200": async function(r){
                delete r["permission"];
                await AsyncStorage.setItem("user", JSON.stringify(r["response"]));
                Alert.alert(r["message"]);
                navigation.navigate("Hub");
            },
            "403": function(r){
                Alert.alert(r["message"]);
            },
            "500": function(r){
                Alert.alert(r["message"]);
            }
        }

        
        try{
            let f = await fetch(`${url}/funcionario/login`, settings);
            let r = await f.json();
            fAcao[r["code"]](r);
        }catch(err){
            Alert.alert("Não foi possivel fazer login, tente novamente.");
        }
    }

    return (
        <>
            <Carregamento
                active={carregando}
            />
            <View
                style={style["backPage"]}
            >
                <View
                    style={style["viewLabel"]}
                >
                    <Icon
                        name={"verified"}
                        size={60}
                        color={colors["color_3"]}
                    />
                    <Text
                        style={style["pageLabel"]}
                    >
                        Login
                    </Text>
                </View>
                <View
                    style={style["centerPage"]}
                >
                    <ChangeStatus
                        type={type}
                        setType={setType}
                    />
                    <View>
                        <Input
                            label={"Usuario"}
                            placeholder={"usuario..."}
                            value={[setUsuario, usuario]}
                        />
                        <Input
                            label={`${type}`}
                            placeholder={`${type.toLowerCase()}...`}
                            value={[setCode, code]}
                            password={type == "Senha" ? false : false}
                        />
                    </View>
                    <Button
                        BTNStyle={{
                            paddingHorizontal: 30,
                        }}
                        BTNTextStyle={{
                            fontSize: 26
                        }}
                        title={"LOGIN"}
                        action={executarCarregando.bind(this, fazerLogin, setCarregando)}
                    />
                </View>
            </View>
        </>
    );

}

export default Login;