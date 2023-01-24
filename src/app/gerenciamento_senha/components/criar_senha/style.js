import { StyleSheet } from "react-native";
import colors from "../../../../config/colors.json";

const style = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    text:{
        fontSize: 30,
        color:colors["color_3"],
        fontWeight: "bold",
        marginBottom: 30
    }
});

export default style;