import { StyleSheet } from "react-native";

import colors from "../../../../config/colors.json"

const style = StyleSheet.create({
    view: {
        maxWidth: "80%",
        backgroundColor: colors["color_1"],
        justifyContent: "space-around",
        alignSelf: "center",
        borderRadius: 10,
    },
    text: {
        fontSize: 40,
        color: "white",
        fontWeight:"bold",
        alignSelf: "center",
        padding: 10,
    }
});

export default style;