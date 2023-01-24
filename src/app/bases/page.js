import React from "react";
import { ScrollView } from "react-native";

//style
import pageStyle from "../../templates/style/pageStyle";

//url
import {url} from "../../config/url.json";

//components
import Item from "./components/item/component";
import ModalMapa from "./components/modal_mapa/component";

const Bases = function({navigation}){

    const [bases, setBases] = React.useState([]);
    const getEmpresas = async function(){
        let f = await fetch(`${url}/bases`);
        let r = await f.json();
        setBases(r);
    }
    React.useEffect(function(){
        getEmpresas();
    }, [])

    const [modalMapa, setModalMapa] = React.useState(false);
    const modalRequest = function(setItem, item){
        setItem(!item);
    }
    const [modalValue, setModalValue] = React.useState({});
    const showlocation = function(val){
        setModalValue(val);
        setModalMapa(!modalMapa);
    }

    return (
        <ScrollView
            style={pageStyle["normal"]}
        >
            {
                bases && <>
                    <ModalMapa
                        nav={navigation}
                        visible={modalMapa}
                        value={modalValue}
                        modalRequest={modalRequest.bind(this, setModalMapa, modalMapa)}
                    />
                    {
                        bases.map(function(e, index){
                            return (
                                <Item
                                    key={index}
                                    label={`${e["nome"]}\n${e["endereco"]}`}
                                    action={showlocation.bind(this, e)}
                                />
                            )
                        })
                    }
                </>
            }
        </ScrollView>
    );
}

export default Bases;