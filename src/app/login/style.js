import { StyleSheet, Dimensions } from "react-native";
import colors from "../../config/colors.json"

const height = Dimensions.get('window').height;

function halfValue(value){
    return (value*75)/100;
}

const style = StyleSheet.create({
    backPage: {
        flex: 1,
        backgroundColor: colors["background_color_1"],
        justifyContent: "space-between",
        alignItems: "center",
    },
    viewLabel:{
        alignItems: "center",
        marginTop: 30
    },
    pageLabel: {
        color: colors["color_3"],
        fontSize: 40,
        fontWeight: "bold",
        fontFamily: "Source Sans Pro"
    },
    centerPage: {
        position: "relative",
        backgroundColor: colors["background_color_2"],
        height: halfValue(height),
        width: "90%",
        justifyContent: "space-around",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    }
});

export default style;