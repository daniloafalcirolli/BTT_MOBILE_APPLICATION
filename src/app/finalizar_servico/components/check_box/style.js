import { StyleSheet } from "react-native";
import colors from "../../../../config/colors.json";

const style = StyleSheet.create({
    container: {
        width: "80%",
        flexDirection: "row",
        alignSelf: "center",
        overflow: "hidden",
        alignItems: "center"
    },
    label: {
        flexShrink: 1,
        fontSize: 25,
        color: colors["color_2"],
        fontWeight: "bold"
    },
    containerIcon:{
        borderRadius: 10,
        marginRight: 30,
        backgroundColor: colors["background_color_1"],
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        color: colors["color_3"],
        fontSize: 50,
        padding: 10,
    }
});

export default style;