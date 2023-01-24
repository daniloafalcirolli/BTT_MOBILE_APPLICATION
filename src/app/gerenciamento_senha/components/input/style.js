import { StyleSheet } from "react-native";

import colors from "../../../../config/colors.json"

const style = StyleSheet.create({
    view: {
        alignSelf: "center",
        backgroundColor: colors["background_color_1"],
        width: "80%",
        borderRadius: 10,
    },
    label: {
        color: "white",
        fontSize: 20,
        padding: 5,
        marginLeft: 10,
    },
    input: {
        width: "100%",
        fontSize: 30,
        padding: 10,
        color: "white"
    }
});

export default style;