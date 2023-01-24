import { StyleSheet } from "react-native";
import colors from "../../../../config/colors.json";

const style = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: colors["low_color_background"],
        justifyContent: "center",
        alignItems: "center",
    },
    view: {
        height:"80%",
        width: "80%",
    },
    page: {
        height:"100%",
        width: "100%",
        backgroundColor: colors["background_color_1"],
        borderRadius: 20,
    },
    inputContainer: {
        width: "100%",
    }
});

export default style;