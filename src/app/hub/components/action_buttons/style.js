import { StyleSheet } from "react-native";

import colors from "../../../../config/colors.json";

const style = StyleSheet.create({
    component: {
        backgroundColor: colors["background_color_1"],
        width: 150,
        alignItems: "center",
        padding: 20,
        borderRadius: 10,
        marginVertical: 30,
    },
    icon: {
        color:colors["color_1"]
    },
    text: {
        color: colors["color_1"],
        fontSize: 20,
        marginTop: 10,
        maxWidth: 140,
        textAlign: "center",
    }
});

export default style;