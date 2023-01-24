import { StyleSheet } from "react-native";

import colors from "../../../../config/colors.json"

const style = StyleSheet.create({
    view: {
        maxWidth: "80%",
        backgroundColor: colors["color_1"],
        justifyContent: "space-around",
        alignSelf: "center",
        borderRadius: 10,
        marginVertical: 10
    },
    text: {
        fontSize: 30,
        color: "white",
        alignSelf: "center",
        padding: 10,
        textAlign: "center"
    }
});

export default style;