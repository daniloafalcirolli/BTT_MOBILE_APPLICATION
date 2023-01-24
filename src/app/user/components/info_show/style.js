import { StyleSheet } from "react-native";

import colors from "../../../../config/colors.json"

const style = StyleSheet.create({
    component: {
        backgroundColor: colors["background_color_1"],
        width: "100%",
        alignSelf: "center",
        overflow: "hidden",
    },
    topView: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors["color_1"],
        padding: 5,
    },
    icon: {
        color: colors["background_color_1"],
        marginRight: 10,
    },
    label: {
        fontWeight: "bold",
        color: colors["background_color_1"],
        fontSize: 25,
        textAlign: "center",
    },
    info: {
        padding: 10,
        color: 'white',
        fontSize: 24
    }
});

export default style;