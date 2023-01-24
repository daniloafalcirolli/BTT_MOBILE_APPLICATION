import { StyleSheet } from "react-native";
import colors from "../../../../config/colors.json";

const style = StyleSheet.create({
    container:{
        backgroundColor: colors["background_color_1"],
        width: 170,
        height: 200,
        justifyContent: "space-around",
        alignItems: "center",
        padding: 20,
        borderRadius: 10,
        marginTop: 30,
    },
    icon: {
        color:colors["color_1"]
    },
    text: {
        color: colors["color_1"],
        fontSize: 20,
        fontWeight: "bold",
        maxWidth: 140,
        textAlign: "center"
    }
});

export default style;
