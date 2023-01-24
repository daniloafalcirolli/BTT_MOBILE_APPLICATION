import { StyleSheet } from "react-native";
import colors from "../../../../config/colors.json"

const style = StyleSheet.create({
    component:{
        width: "100%",
        marginBottom: 20
    },
    input: {
        width: "100%",
        fontSize: 30,
        borderColor: "rgba(0,0,0,0)",
        borderWidth: 2,
        padding: 10,
        alignSelf:"center",
        backgroundColor: colors["background_color_1"],
        color: colors["color_2"],
    }
});

export default style;