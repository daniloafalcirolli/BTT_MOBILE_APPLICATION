import { StyleSheet } from "react-native";
import colors from "../../../../../../config/colors.json";

const style = StyleSheet.create({
    container: {
        width: "80%",
        alignSelf: "center",
        backgroundColor: colors["background_color_1"],
        borderRadius: 10,
        overflow: "hidden",
        marginTop: 20
    },
    label: {
        fontSize: 30,
        backgroundColor: colors["color_1"],
        padding: 10,
        fontWeight: "bold"
    },
    input: {
        width: "100%",
        padding: 10,
        fontSize: 25,
        color: colors["color_2"]
    }
});

export default style;