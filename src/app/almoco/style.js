import { StyleSheet } from "react-native";

import colors from "../../config/colors.json";

const style = StyleSheet.create({
    container:{
        width: "100%",
        height: "100%",
        backgroundColor: colors["background_color_1"],
        alignItems: "center",
        justifyContent: "center"
    },
    page: {
        backgroundColor: colors["background_color_2"],
        width: "80%",
        borderRadius: 10,
        overflow: "hidden",
        padding: 10,
        paddingBottom: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        color: colors["color_1"],
        fontSize: 25,
        width: "70%",
        textAlign: "center",
        fontWeight: "bold",

    }
});

export default style;