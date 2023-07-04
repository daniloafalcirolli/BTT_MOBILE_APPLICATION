import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

//style
import colors from "../../config/colors.json"

//pages
import User from "../user/page";
import Servicos from "../servicos/page";
import CriarServicos from "../criar_servico/page";

const Tab = createMaterialTopTabNavigator();

const TabP = function({navigation}){

    let components = [
        {
            component: User,
            name: "User",
            nome: "Funcionario"
        },
        {
            component: Servicos,
            name: "Servicos",
            nome: "Serviços"
        },
        {
            component: CriarServicos,
            name: "CriarServicos",
            nome: "Criar Servicos"
        },
    ]

    return (
        <Tab.Navigator
            initialRouteName={"TabP"}
            screenOptions={{
                tabBarStyle:{
                    backgroundColor: colors["background_color_2"]
                },
                tabBarPressColor: colors["color_1"],
                tabBarInactiveTintColor: colors["color_1"],
                tabBarActiveTintColor: colors["color_3"],
                tabBarIndicatorStyle:{
                    backgroundColor: colors["color_3"]
                }
            }}
        >
            {
                components.map(function(e, index){
                    return (
                        <Tab.Screen
                            key={index}
                            component={e["component"]}
                            name={e["name"]}
                            options={{
                                tabBarLabel: e["nome"],
                                tabBarLabelStyle:{ 
                                    fontWeight: "bold",
                                    fontSize:10
                                }
                            }}
                        />
                    );
                })
            }
        </Tab.Navigator>
    );
}

export default TabP;