import { StyleSheet } from "react-native";
import colors from "../../../../../../config/colors.json";

const style = StyleSheet.create({
    container: {
        alignSelf: "center",
        width: "60%",
        borderRadius: 10,
        backgroundColor: colors["color_3"],
        padding: 10,
        marginTop: 30
    },
    text: {
        color: colors["background_color_1"],
        fontSize: 25,
        fontWeight: "bold"
    }
})

export default style;