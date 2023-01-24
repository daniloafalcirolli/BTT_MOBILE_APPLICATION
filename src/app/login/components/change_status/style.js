import { StyleSheet, Dimensions } from "react-native";
import colors from "../../../../config/colors.json";

const width = Dimensions.get('window').width;

function getSize(){
    return (width*30)/100;
}

const style = StyleSheet.create({
    container: {
        width:"100%",
        top: -20,
        position: "absolute",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent:"center"
    },
    containerText: {
        backgroundColor: colors["color_3"],
        width: getSize(),
        padding: 5
    },
    text:{
        fontSize: 25,
        textAlign: "center",
        fontWeight: "bold",
        color:"white",
    },
    left: {
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
    },
    right: {
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
    },
    active: {
        backgroundColor: colors["color_1"]
    }
});

export default style;