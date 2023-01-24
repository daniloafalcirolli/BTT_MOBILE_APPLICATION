import { StyleSheet } from "react-native";
import colors from "../../../../../../config/colors.json";

const style = StyleSheet.create({
    container: {
        alignSelf: "center",
        width: "80%",
        backgroundColor: colors["background_color_1"],
        borderRadius: 10,
        overflow: "hidden",
        borderColor: colors["color_3"],
        borderWidth: 3,
        marginTop: 20
    },
    label: {
        fontSize: 30,
        borderBottomColor: colors["color_3"],
        borderBottomWidth: 3,
        padding: 5,
        color: colors["color_3"],
        fontWeight: "bold",
        textAlign: "center"
    },
    iconView: {
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    icon: {
        backgroundColor: colors["color_3"],
        color: ["background_color_2"],
        padding: 10,
        fontSize: 40,
        borderRadius: 10,
    },
    active: {
        backgroundColor: "rgb(66, 245, 138)",
    },
    inactive: {
        backgroundColor: colors["color_2"],
    }
});

export default style;