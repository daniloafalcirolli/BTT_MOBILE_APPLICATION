import {StyleSheet} from "react-native";
import colors from "../../../../config/colors.json";

const style = StyleSheet.create({
    container:{
        width:200,
        alignSelf:'center',
        alignItems:"center",
        backgroundColor: colors["color_1"],
        padding: 10,
        borderRadius: 10,
    },
    text: {
        color: "white",
        fontSize: 30,
        textAlign: "center",
        alignSelf: "center"
    }
});

export default style;