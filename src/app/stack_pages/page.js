import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar, SafeAreaView, PermissionsAndroid, Alert } from "react-native";
import Geolocation from '@react-native-community/geolocation';


const Stack = createStackNavigator();

//pages
import TabP from "../tab_top/page";
import Login from "../login/page";
import Hub from "../hub/page";
import UserRoutes from "../user_routes/page";
import Servico from "../servico/page";
import FinalizarServico from "../finalizar_servico/page";
import Bases from "../bases/page";
import GerenciamentoSenha from "../gerenciamento_senha/page";
import Almoco from "../almoco/page";

const StackN = function() {

    const requestMapPermission = async function(){
        try {
            await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );
        } catch (err) {
            Alert.alert("Permissão de mapa com problema, reinicie o aplicativo e tente novamente");
        }
    };
    const requestCameraPermission = async function(){
        try {
            await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA
            );
        } catch (err) {
            Alert.alert("Permissão de camera com problema, reinicie o aplicativo e tente novamente");
        }
    };

    Geolocation.setRNConfiguration({
        skipPermissionRequests: false,
        authorizationLevel: 'whenInUse',
        locationProvider: 'playServices',
    });

    React.useEffect(function(){
        requestCameraPermission();
        requestMapPermission();
    }, []);

    return (
        <SafeAreaView
            style={{flex: 1}}
        >
            <StatusBar
            />
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName={"Login"}
                >
                    <Stack.Screen
                        name={"TabP"}
                        component={TabP}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name={"Almoco"}
                        component={Almoco}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name={"GerenciamentoSenha"}
                        component={GerenciamentoSenha}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name={"Bases"}
                        component={Bases}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name={"FinalizarServico"}
                        component={FinalizarServico}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name={"Servico"}
                        component={Servico}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name={"UserRoutes"}
                        component={UserRoutes}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name={"Hub"}
                        component={Hub}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name={"Login"}
                        component={Login}
                        options={{headerShown: false}}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    );
}

export default StackN;